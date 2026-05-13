import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";
import "./App.css";
import {
  calendarEntries,
  glossaryTerms,
  invoiceGuides,
  knowledgeEntries,
  lastVerifiedAt,
  reportGuides,
  spotlightCards,
  studyModules,
  taxPlanningPlays,
  taxRateCards,
  type InvoiceGuide,
  type KnowledgeEntry,
  type Region,
  type TaxPlanningPlay,
} from "./data/financeData";

type TabId =
  | "overview"
  | "academy"
  | "encyclopedia"
  | "tax-planning"
  | "invoices"
  | "calendar"
  | "glossary";

type SearchSuggestion = {
  id: string;
  kind: "term" | "content" | "module";
  label: string;
  helper: string;
  query: string;
  tab?: TabId;
  targetType?: "entry" | "plan" | "invoice" | "glossary";
  targetId?: string;
  score?: number;
};

const navItems: Array<{ id: TabId; order: string; label: string; detail: string }> = [
  { id: "overview", order: "01", label: "总览", detail: "先建立财务全局观" },
  { id: "academy", order: "02", label: "学习路径", detail: "像课程一样系统学习" },
  { id: "encyclopedia", order: "03", label: "财务百科", detail: "按主题深入查阅" },
  { id: "tax-planning", order: "04", label: "税务筹划", detail: "合法合规地优化税负" },
  { id: "invoices", order: "05", label: "发票与税率", detail: "理解票据、税率与抵扣" },
  { id: "calendar", order: "06", label: "经营日历", detail: "掌握合规与申报节奏" },
  { id: "glossary", order: "07", label: "术语表", detail: "把财务语言翻成人话" },
];

const regionOptions: Array<Extract<Region, "全部" | "中国" | "新加坡">> = ["全部", "中国", "新加坡"];

const searchGuides: SearchSuggestion[] = [
  {
    id: "guide-shudian",
    kind: "term",
    label: "数电发票",
    helper: "关联：电子发票、全电发票、发票归档、红字发票",
    query: "数电发票",
    tab: "invoices",
  },
  {
    id: "guide-invoice",
    kind: "term",
    label: "发票怎么理解",
    helper: "关联：专票、普票、tax invoice、credit note、进项抵扣",
    query: "发票",
    tab: "invoices",
  },
  {
    id: "guide-vat",
    kind: "term",
    label: "增值税与进项抵扣",
    helper: "关联：销项税、进项税、专票、含税报价、不含税毛利",
    query: "增值税 进项",
    tab: "invoices",
  },
  {
    id: "guide-tax-planning",
    kind: "term",
    label: "合法合规税务筹划",
    helper: "关联：税筹、合理避税、税负优化、优惠资格、风险边界",
    query: "税筹 税务筹划",
    tab: "tax-planning",
  },
  {
    id: "guide-tax-avoidance",
    kind: "term",
    label: "合理避税的边界",
    helper: "关联：业务实质、虚开发票、隐匿收入、空壳拆分",
    query: "合理避税 边界",
    tab: "tax-planning",
  },
  {
    id: "guide-rd",
    kind: "term",
    label: "研发费用加计扣除",
    helper: "关联：研发台账、项目归集、所得税优惠、留痕资料",
    query: "研发费用加计扣除",
    tab: "tax-planning",
  },
  {
    id: "guide-financial-statements",
    kind: "term",
    label: "三张财务报表",
    helper: "关联：利润表、资产负债表、现金流量表、报表阅读",
    query: "三大报表",
    tab: "encyclopedia",
  },
  {
    id: "guide-cashflow",
    kind: "term",
    label: "现金流与利润",
    helper: "关联：经营现金流、回款、营运资金、runway",
    query: "现金流 利润",
    tab: "encyclopedia",
  },
  {
    id: "guide-gst",
    kind: "term",
    label: "新加坡 GST",
    helper: "关联：GST 注册、tax invoice、input tax、9% 税率",
    query: "GST",
    tab: "invoices",
  },
  {
    id: "guide-eci",
    kind: "term",
    label: "新加坡 ECI 与 Form C",
    helper: "关联：FYE、Corporate Income Tax、年度申报",
    query: "ECI",
    tab: "encyclopedia",
  },
];

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase();
}

function scoreSearchCandidate(query: string, parts: string[]) {
  if (query.length === 0) {
    return 0;
  }

  const normalizedParts = parts.map((part) => normalizeSearchText(part));
  const exactLabel = normalizedParts[0] === query ? 120 : 0;
  const labelContains = normalizedParts[0]?.includes(query) ? 80 : 0;
  const bodyContains = normalizedParts.some((part) => part.includes(query)) ? 42 : 0;
  const splitScore = query
    .split(/\s+/)
    .filter(Boolean)
    .reduce((score, token) => {
      return score + (normalizedParts.some((part) => part.includes(token)) ? 16 : 0);
    }, 0);

  return exactLabel + labelContains + bodyContains + splitScore;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [selectedRegion, setSelectedRegion] = useState<Extract<Region, "全部" | "中国" | "新加坡">>("全部");
  const [selectedPillar, setSelectedPillar] = useState("全部");
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(knowledgeEntries[0]?.id ?? "");
  const [selectedModuleId, setSelectedModuleId] = useState(studyModules[0]?.id ?? "");
  const [selectedGuideId, setSelectedGuideId] = useState(reportGuides[0]?.id ?? "");
  const [selectedPlanId, setSelectedPlanId] = useState(taxPlanningPlays[0]?.id ?? "");
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoiceGuides[0]?.id ?? "");

  const deferredSearch = useDeferredValue(normalizeSearchText(searchText));

  const pillars = ["全部", ...new Set(knowledgeEntries.map((entry) => entry.pillar))];
  const categories = [
    "全部",
    ...new Set(
      knowledgeEntries
        .filter((entry) => selectedPillar === "全部" || entry.pillar === selectedPillar)
        .map((entry) => entry.category),
    ),
  ];

  function matchesRegion(region: Region) {
    if (selectedRegion === "全部") {
      return true;
    }

    return region === selectedRegion || region === "双地" || region === "全球通用";
  }

  function matchesExactRegion(region: Extract<Region, "中国" | "新加坡">) {
    return selectedRegion === "全部" || selectedRegion === region;
  }

  function matchesSearch(haystackParts: string[]) {
    const haystack = haystackParts.join(" ").toLowerCase();
    return deferredSearch.length === 0 || haystack.includes(deferredSearch);
  }

  const filteredEntries = knowledgeEntries.filter((entry) => {
    const matchesPillar = selectedPillar === "全部" || entry.pillar === selectedPillar;
    const matchesCategory = selectedCategory === "全部" || entry.category === selectedCategory;
    const matchesEntrySearch = matchesSearch([
      entry.title,
      entry.summary,
      entry.ceoQuestion,
      entry.pillar,
      entry.category,
      entry.region,
      entry.relatedTerms.join(" "),
      entry.concept.join(" "),
      entry.howToRead.join(" "),
    ]);

    return matchesRegion(entry.region) && matchesPillar && matchesCategory && matchesEntrySearch;
  });

  const selectedEntry =
    filteredEntries.find((entry) => entry.id === selectedEntryId) ??
    filteredEntries[0] ??
    knowledgeEntries[0];

  const visibleSpotlights = spotlightCards.filter((card) => matchesRegion(card.region));

  const visibleCalendar = calendarEntries.filter((item) => {
    return selectedRegion === "全部" || item.region === selectedRegion;
  });

  const filteredGlossary = glossaryTerms.filter((term) => {
    const matchesGlossarySearch = matchesSearch([
      term.term,
      term.alias ?? "",
      term.simple,
      term.whyItMatters,
      term.region,
    ]);

    return matchesRegion(term.region) && matchesGlossarySearch;
  });

  const filteredPlans = taxPlanningPlays.filter((plan) => {
    return (
      matchesExactRegion(plan.region) &&
      matchesSearch([
        plan.title,
        plan.taxType,
        plan.stage,
        plan.suitability,
        plan.summary,
        plan.logic.join(" "),
        plan.qualification.join(" "),
        plan.boundaries.join(" "),
      ])
    );
  });

  const filteredInvoices = invoiceGuides.filter((guide) => {
    return (
      matchesExactRegion(guide.region) &&
      matchesSearch([
        guide.title,
        guide.invoiceType,
        guide.useCase,
        guide.summary,
        guide.legalMeaning.join(" "),
        guide.taxRates.join(" "),
        guide.deductibleImpact.join(" "),
      ])
    );
  });

  const visibleTaxRateCards = taxRateCards.filter((card) => matchesExactRegion(card.region));
  const searchSuggestions: SearchSuggestion[] =
    deferredSearch.length === 0
      ? []
      : [
          ...searchGuides
            .map((suggestion) => ({
              ...suggestion,
              score: scoreSearchCandidate(deferredSearch, [suggestion.label, suggestion.helper, suggestion.query]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
          ...knowledgeEntries
            .filter((entry) => matchesRegion(entry.region))
            .map((entry) => ({
              id: `entry-${entry.id}`,
              kind: "content" as const,
              label: entry.title,
              helper: `${entry.region} · ${entry.pillar} · ${entry.summary}`,
              query: entry.title,
              tab: "encyclopedia" as const,
              targetType: "entry" as const,
              targetId: entry.id,
              score: scoreSearchCandidate(deferredSearch, [
                entry.title,
                entry.summary,
                entry.ceoQuestion,
                entry.pillar,
                entry.category,
                entry.relatedTerms.join(" "),
                entry.concept.join(" "),
              ]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
          ...taxPlanningPlays
            .filter((plan) => matchesExactRegion(plan.region))
            .map((plan) => ({
              id: `plan-${plan.id}`,
              kind: "content" as const,
              label: plan.title,
              helper: `${plan.region} · ${plan.taxType} · ${plan.summary}`,
              query: plan.title,
              tab: "tax-planning" as const,
              targetType: "plan" as const,
              targetId: plan.id,
              score: scoreSearchCandidate(deferredSearch, [
                plan.title,
                plan.taxType,
                plan.stage,
                plan.suitability,
                plan.summary,
                plan.logic.join(" "),
                plan.boundaries.join(" "),
              ]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
          ...invoiceGuides
            .filter((guide) => matchesExactRegion(guide.region))
            .map((guide) => ({
              id: `invoice-${guide.id}`,
              kind: "content" as const,
              label: guide.title,
              helper: `${guide.region} · ${guide.invoiceType} · ${guide.summary}`,
              query: guide.title,
              tab: "invoices" as const,
              targetType: "invoice" as const,
              targetId: guide.id,
              score: scoreSearchCandidate(deferredSearch, [
                guide.title,
                guide.invoiceType,
                guide.useCase,
                guide.summary,
                guide.legalMeaning.join(" "),
                guide.taxRates.join(" "),
              ]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
          ...glossaryTerms
            .filter((term) => matchesRegion(term.region))
            .map((term) => ({
              id: `glossary-${term.term}`,
              kind: "content" as const,
              label: term.term,
              helper: `${term.region} · ${term.alias ? `${term.alias} · ` : ""}${term.simple}`,
              query: term.term,
              tab: "glossary" as const,
              targetType: "glossary" as const,
              score: scoreSearchCandidate(deferredSearch, [
                term.term,
                term.alias ?? "",
                term.simple,
                term.whyItMatters,
              ]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
          ...navItems
            .map((item) => ({
              id: `module-${item.id}`,
              kind: "module" as const,
              label: item.label,
              helper: item.detail,
              query: item.label,
              tab: item.id,
              score: scoreSearchCandidate(deferredSearch, [item.label, item.detail]),
            }))
            .filter((suggestion) => (suggestion.score ?? 0) > 0),
        ]
          .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
          .slice(0, 8);
  const shouldShowSearchSuggestions = isSearchFocused && searchText.trim().length > 0;

  const selectedModule = studyModules.find((module) => module.id === selectedModuleId) ?? studyModules[0];
  const selectedGuide = reportGuides.find((guide) => guide.id === selectedGuideId) ?? reportGuides[0];
  const selectedPlan =
    filteredPlans.find((plan) => plan.id === selectedPlanId) ?? filteredPlans[0] ?? taxPlanningPlays[0];
  const selectedInvoice =
    filteredInvoices.find((guide) => guide.id === selectedInvoiceId) ?? filteredInvoices[0] ?? invoiceGuides[0];

  useEffect(() => {
    if (!filteredEntries.some((entry) => entry.id === selectedEntryId) && filteredEntries[0]) {
      setSelectedEntryId(filteredEntries[0].id);
    }
  }, [filteredEntries, selectedEntryId]);

  useEffect(() => {
    if (!filteredPlans.some((plan) => plan.id === selectedPlanId) && filteredPlans[0]) {
      setSelectedPlanId(filteredPlans[0].id);
    }
  }, [filteredPlans, selectedPlanId]);

  useEffect(() => {
    if (!filteredInvoices.some((guide) => guide.id === selectedInvoiceId) && filteredInvoices[0]) {
      setSelectedInvoiceId(filteredInvoices[0].id);
    }
  }, [filteredInvoices, selectedInvoiceId]);

  async function handleOpenExternal(url: string) {
    try {
      await openUrl(url);
    } catch (error) {
      console.error("Failed to open external link", error);
    }
  }

  function openEntry(entry: KnowledgeEntry) {
    startTransition(() => {
      setActiveTab("encyclopedia");
      setSelectedEntryId(entry.id);
    });
  }

  function openPlan(plan: TaxPlanningPlay) {
    startTransition(() => {
      setActiveTab("tax-planning");
      setSelectedPlanId(plan.id);
    });
  }

  function openInvoice(guide: InvoiceGuide) {
    startTransition(() => {
      setActiveTab("invoices");
      setSelectedInvoiceId(guide.id);
    });
  }

  function applySearchSuggestion(suggestion: SearchSuggestion) {
    setSearchText(suggestion.query);
    setIsSearchFocused(false);

    startTransition(() => {
      if (suggestion.tab) {
        setActiveTab(suggestion.tab);
      }

      if (suggestion.targetType === "entry" && suggestion.targetId) {
        setSelectedEntryId(suggestion.targetId);
      }

      if (suggestion.targetType === "plan" && suggestion.targetId) {
        setSelectedPlanId(suggestion.targetId);
      }

      if (suggestion.targetType === "invoice" && suggestion.targetId) {
        setSelectedInvoiceId(suggestion.targetId);
      }
    });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar glass-surface">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <span>FKH</span>
          </div>
          <div>
            <p className="eyebrow">FinanceKnowHow</p>
            <h1>CEO 财务百科全书</h1>
          </div>
        </div>

        <nav className="nav-list" aria-label="主导航">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  startTransition(() => setActiveTab(item.id));
                }}
              >
                <span className="nav-order">{item.order}</span>
                <span className="nav-copy">
                  <strong>{item.label}</strong>
                  <small>{item.detail}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <section className="progress-card card-panel">
          <p className="eyebrow">这套产品现在覆盖什么</p>
          <div className="progress-grid">
            <div>
            <strong>{studyModules.length}</strong>
              <span>学习阶段</span>
            </div>
            <div>
              <strong>{reportGuides.length}</strong>
              <span>报表阅读指南</span>
            </div>
            <div>
              <strong>{knowledgeEntries.length}</strong>
              <span>百科条目</span>
            </div>
            <div>
              <strong>{taxPlanningPlays.length}</strong>
              <span>税筹策略</span>
            </div>
            <div>
              <strong>{invoiceGuides.length}</strong>
              <span>发票主题</span>
            </div>
            <div>
              <strong>{calendarEntries.length}</strong>
              <span>关键节点</span>
            </div>
          </div>
        </section>

        <section className="sidebar-note card-panel">
          <p className="eyebrow">产品原则</p>
          <ul className="detail-list compact-list">
            <li>先教认知框架，再给地区规则，最后才是条文和表单。</li>
            <li>让小白可以按路径系统学习，而不是只会碎片查询。</li>
            <li>高风险主题保留官方来源入口，方便继续核对原文。</li>
            <li>税务筹划只覆盖合法合规安排，明确风险边界，不提供逃税做法。</li>
          </ul>
        </section>
      </aside>

      <main className="workspace">
        <header className="topbar glass-surface">
          <div className="topbar-copy">
            <p className="eyebrow">Last verified</p>
            <strong>{lastVerifiedAt}</strong>
          </div>

          <div className="topbar-controls">
            <div className="segmented-group" aria-label="地区筛选">
              {regionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`segmented-pill ${selectedRegion === option ? "is-active" : ""}`}
                  onClick={() => {
                    startTransition(() => setSelectedRegion(option));
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="search-box">
              <label className="sr-only" htmlFor="global-search">
                搜索百科、术语与学习内容
              </label>
              <input
                id="global-search"
                type="search"
                placeholder="搜索：现金流、ECI、数电发票、毛利率、企业年报..."
                value={searchText}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  window.setTimeout(() => setIsSearchFocused(false), 140);
                }}
                onChange={(event) => {
                  setSearchText(event.currentTarget.value);
                }}
              />
              {shouldShowSearchSuggestions ? (
                <div className="search-suggestions" role="listbox" aria-label="搜索联想">
                  {searchSuggestions.length > 0 ? (
                    <>
                      <div className="suggestion-head">
                        <span>相关引导</span>
                        <small>{searchSuggestions.length} 个建议</small>
                      </div>
                      {searchSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          type="button"
                          className="suggestion-item"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => applySearchSuggestion(suggestion)}
                        >
                          <span className={`suggestion-kind suggestion-kind-${suggestion.kind}`}>
                            {suggestion.kind === "term" ? "词" : suggestion.kind === "module" ? "模块" : "内容"}
                          </span>
                          <span className="suggestion-copy">
                            <strong>{suggestion.label}</strong>
                            <small>{suggestion.helper}</small>
                          </span>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="suggestion-empty">
                      <strong>没有直接命中</strong>
                      <small>试试搜索：发票、税率、现金流、GST、ECI、研发费用、汇算清缴。</small>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="content-scroll">
          {activeTab === "overview" ? (
            <section className="page-grid">
              <section className="hero-panel card-panel">
                <div className="hero-layout">
                  <div className="hero-copy">
                    <p className="eyebrow">Apple-inspired finance encyclopedia</p>
                    <h2>把财务从“难懂的后台职能”变成 CEO 可以系统掌握的经营学科。</h2>
                    <p className="hero-description">
                      这版产品不再只是一个速查工具，而是一套面向经营者的桌面财务教材。
                      你可以从学习路径入门、沿着三张报表建立判断框架，再进入中国和新加坡的规则地图、
                      合规税务筹划与发票系统。
                    </p>
                    <div className="hero-actions">
                      <button
                        type="button"
                        className="primary-action"
                        onClick={() => {
                          startTransition(() => setActiveTab("academy"));
                        }}
                      >
                        从学习路径开始
                      </button>
                      <button
                        type="button"
                        className="secondary-action"
                        onClick={() => {
                          startTransition(() => setActiveTab("encyclopedia"));
                        }}
                      >
                        打开财务百科
                      </button>
                    </div>
                  </div>

                  <div className="hero-stats">
                    <article className="metric-card">
                      <span>认知层</span>
                      <strong>财务思维</strong>
                      <small>先建立判断框架，再学习规则细节。</small>
                    </article>
                    <article className="metric-card">
                      <span>工具层</span>
                      <strong>报表阅读</strong>
                      <small>知道看利润、现金、资产时分别要问什么。</small>
                    </article>
                    <article className="metric-card">
                      <span>执行层</span>
                      <strong>地区规则</strong>
                      <small>掌握中国与新加坡高频财务与合规动作。</small>
                    </article>
                    <article className="metric-card">
                      <span>专项层</span>
                      <strong>税筹与发票</strong>
                      <small>理解税负优化、票据链路、税率与红线边界。</small>
                    </article>
                  </div>
                </div>
              </section>

              <section className="overview-grid">
                {visibleSpotlights.map((card) => (
                  <article key={card.id} className="spotlight-card card-panel">
                    <p className="eyebrow">{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                    <p>{card.detail}</p>
                  </article>
                ))}
              </section>

              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">系统学习</p>
                    <h3>四个阶段，把小白带到能独立看经营财务</h3>
                  </div>
                </div>

                <div className="module-grid">
                  {studyModules.map((module) => (
                    <button
                      key={module.id}
                      type="button"
                      className="module-card"
                      onClick={() => {
                        setSelectedModuleId(module.id);
                        startTransition(() => setActiveTab("academy"));
                      }}
                    >
                      <span>{module.stage}</span>
                      <h4>{module.title}</h4>
                      <p>{module.outcome}</p>
                      <small>{module.duration}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">报表训练</p>
                    <h3>先学会看三张表，后面所有判断才有抓手</h3>
                  </div>
                </div>

                <div className="guide-grid">
                  {reportGuides.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      className="guide-card"
                      onClick={() => {
                        setSelectedGuideId(guide.id);
                        startTransition(() => setActiveTab("academy"));
                      }}
                    >
                      <h4>{guide.title}</h4>
                      <p>{guide.summary}</p>
                      <small>{guide.questions[0]}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">百科入口</p>
                    <h3>围绕经营、报表、税务、治理、人事，深入查阅每个主题</h3>
                  </div>
                </div>

                <div className="topic-grid">
                  {knowledgeEntries.slice(0, 8).map((entry) => (
                    <button key={entry.id} type="button" className="topic-card" onClick={() => openEntry(entry)}>
                      <span className="topic-meta">
                        <em>{entry.region}</em>
                        <strong>{entry.pillar}</strong>
                      </span>
                      <h4>{entry.title}</h4>
                      <p>{entry.summary}</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">税务与票据</p>
                    <h3>把“合理避税”和“发票怎么管”拆成两门能独立学透的专题</h3>
                  </div>
                </div>

                <div className="topic-grid">
                  {taxPlanningPlays.slice(0, 4).map((plan) => (
                    <button key={plan.id} type="button" className="topic-card" onClick={() => openPlan(plan)}>
                      <span className="topic-meta">
                        <em>{plan.region}</em>
                        <strong>{plan.taxType}</strong>
                      </span>
                      <h4>{plan.title}</h4>
                      <p>{plan.summary}</p>
                    </button>
                  ))}
                </div>

                <div className="topic-grid topic-grid-compact">
                  {invoiceGuides.slice(0, 4).map((guide) => (
                    <button key={guide.id} type="button" className="topic-card" onClick={() => openInvoice(guide)}>
                      <span className="topic-meta">
                        <em>{guide.region}</em>
                        <strong>{guide.invoiceType}</strong>
                      </span>
                      <h4>{guide.title}</h4>
                      <p>{guide.summary}</p>
                    </button>
                  ))}
                </div>
              </section>
            </section>
          ) : null}

          {activeTab === "academy" ? (
            <section className="page-grid">
              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">学习路径</p>
                    <h3>像课程一样走完财务基础、报表阅读、经营系统和地区规则</h3>
                  </div>
                </div>

                <div className="module-grid module-grid-dense">
                  {studyModules.map((module) => (
                    <button
                      key={module.id}
                      type="button"
                      className={`module-card ${selectedModule.id === module.id ? "is-active" : ""}`}
                      onClick={() => setSelectedModuleId(module.id)}
                    >
                      <span>{module.stage}</span>
                      <h4>{module.title}</h4>
                      <p>{module.outcome}</p>
                      <small>{module.duration}</small>
                    </button>
                  ))}
                </div>

                <article className="learning-detail">
                  <div className="learning-head">
                    <div>
                      <p className="eyebrow">{selectedModule.stage}</p>
                      <h4>{selectedModule.title}</h4>
                    </div>
                    <span className="time-pill">{selectedModule.duration}</span>
                  </div>
                  <p className="learning-outcome">{selectedModule.outcome}</p>
                  <ol className="lesson-list">
                    {selectedModule.lessons.map((lesson) => (
                      <li key={lesson}>{lesson}</li>
                    ))}
                  </ol>
                </article>
              </section>

              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">报表阅读训练</p>
                    <h3>每张表该怎么读、该问什么、该如何和其他表交叉验证</h3>
                  </div>
                </div>

                <div className="guide-grid">
                  {reportGuides.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      className={`guide-card ${selectedGuide.id === guide.id ? "is-active" : ""}`}
                      onClick={() => setSelectedGuideId(guide.id)}
                    >
                      <h4>{guide.title}</h4>
                      <p>{guide.summary}</p>
                    </button>
                  ))}
                </div>

                <article className="guide-detail">
                  <div className="guide-detail-head">
                    <div>
                      <p className="eyebrow">当前专题</p>
                      <h4>{selectedGuide.title}</h4>
                    </div>
                    <button
                      type="button"
                      className="secondary-action"
                      onClick={() => {
                        const guideTarget =
                          selectedGuide.id === "income-statement"
                            ? knowledgeEntries.find((entry) => entry.id === "three-statements")
                            : knowledgeEntries.find((entry) => entry.id === "cash-vs-profit");

                        if (guideTarget) {
                          openEntry(guideTarget);
                        }
                      }}
                    >
                      打开相关百科条目
                    </button>
                  </div>

                  <p className="guide-summary">{selectedGuide.summary}</p>

                  <div className="guide-columns">
                    <section className="detail-section">
                      <p className="eyebrow">先问这些问题</p>
                      <ul className="detail-list">
                        {selectedGuide.questions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">阅读步骤</p>
                      <div className="guide-section-list">
                        {selectedGuide.sections.map((section) => (
                          <article key={section.label} className="guide-step">
                            <strong>{section.label}</strong>
                            <p>{section.detail}</p>
                          </article>
                        ))}
                      </div>
                    </section>
                  </div>
                </article>
              </section>
            </section>
          ) : null}

          {activeTab === "encyclopedia" ? (
            <section className="encyclopedia-layout">
              <aside className="encyclopedia-sidebar card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">财务百科</p>
                    <h3>{filteredEntries.length} 个主题</h3>
                  </div>
                </div>

                <div className="filter-block">
                  <p className="filter-title">知识支柱</p>
                  <div className="chip-row">
                    {pillars.map((pillar) => (
                      <button
                        key={pillar}
                        type="button"
                        className={`filter-chip ${selectedPillar === pillar ? "is-active" : ""}`}
                        onClick={() => {
                          setSelectedPillar(pillar);
                          setSelectedCategory("全部");
                        }}
                      >
                        {pillar}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-block">
                  <p className="filter-title">主题分类</p>
                  <div className="chip-row">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        className={`filter-chip ${selectedCategory === category ? "is-active" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="entry-list" role="list">
                  {filteredEntries.map((entry) => {
                    const isActive = selectedEntry?.id === entry.id;

                    return (
                      <button
                        key={entry.id}
                        type="button"
                        className={`entry-card ${isActive ? "is-active" : ""}`}
                        onClick={() => setSelectedEntryId(entry.id)}
                      >
                        <div className="entry-meta">
                          <span>{entry.region}</span>
                          <span>{entry.level}</span>
                        </div>
                        <h4>{entry.title}</h4>
                        <p>{entry.summary}</p>
                      </button>
                    );
                  })}

                  {filteredEntries.length === 0 ? (
                    <div className="empty-state">
                      <h4>没有找到匹配主题</h4>
                      <p>尝试减少筛选条件，或直接搜索报表、毛利、ECI、GST、数电发票等关键词。</p>
                    </div>
                  ) : null}
                </div>
              </aside>

              {selectedEntry ? (
                <article className="encyclopedia-detail card-panel">
                  <div className="detail-header">
                    <div className="detail-tags">
                      <span>{selectedEntry.region}</span>
                      <span>{selectedEntry.pillar}</span>
                      <span>{selectedEntry.category}</span>
                      <span>{selectedEntry.level}</span>
                    </div>
                    <h3>{selectedEntry.title}</h3>
                    <p>{selectedEntry.summary}</p>
                  </div>

                  <section className="question-block">
                    <p className="eyebrow">CEO 最该问的问题</p>
                    <h4>{selectedEntry.ceoQuestion}</h4>
                  </section>

                  <div className="detail-grid">
                    <section className="detail-section">
                      <p className="eyebrow">核心概念</p>
                      <ul className="detail-list">
                        {selectedEntry.concept.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">为什么重要</p>
                      <ul className="detail-list">
                        {selectedEntry.whyItMatters.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">应该怎么读</p>
                      <ul className="detail-list">
                        {selectedEntry.howToRead.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">老板检查清单</p>
                      <ul className="detail-list">
                        {selectedEntry.ceoChecklist.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="warning-block">
                    <p className="eyebrow">红旗信号</p>
                    <ul className="detail-list warning-list">
                      {selectedEntry.redFlags.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="related-terms">
                    <p className="eyebrow">相关术语</p>
                    <div className="chip-row">
                      {selectedEntry.relatedTerms.map((term) => (
                        <span key={term} className="term-chip">
                          {term}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="sources-block">
                    <div className="section-header">
                      <div>
                        <p className="eyebrow">学习资源与官方来源</p>
                        <h4>点击即可继续打开原始规则、学习页或监管说明</h4>
                      </div>
                    </div>

                    <div className="source-grid">
                      {selectedEntry.officialSources.map((source) => (
                        <button
                          key={`${source.url}-${source.updatedAt}`}
                          type="button"
                          className="source-card"
                          onClick={() => handleOpenExternal(source.url)}
                        >
                          <span>{source.authority}</span>
                          <strong>{source.title}</strong>
                          <small>更新日期：{source.updatedAt}</small>
                          <div className="source-footer">
                            <b>打开来源</b>
                            <em>Source link</em>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                </article>
              ) : null}
            </section>
          ) : null}

          {activeTab === "calendar" ? (
            <section className="page-grid">
              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">经营日历</p>
                    <h3>把申报、备案、秘书动作和工资节奏写进公司固定运营节拍</h3>
                  </div>
                </div>

                <div className="calendar-grid">
                  {visibleCalendar.map((item) => (
                    <article key={item.id} className="calendar-card">
                      <div className="calendar-meta">
                        <span>{item.region}</span>
                        <span>{item.cycle}</span>
                      </div>
                      <h4>{item.title}</h4>
                      <strong>{item.window}</strong>
                      <p>{item.detail}</p>
                      <small>不做会怎样：{item.risk}</small>
                    </article>
                  ))}
                </div>
              </section>
            </section>
          ) : null}

          {activeTab === "tax-planning" ? (
            <section className="encyclopedia-layout">
              <aside className="encyclopedia-sidebar card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">税务筹划</p>
                    <h3>{filteredPlans.length} 个合规策略</h3>
                  </div>
                </div>

                <div className="policy-note">
                  <p className="eyebrow">边界说明</p>
                  <p>
                    这里讨论的是合法合规税务筹划，不包含虚开发票、隐匿收入、假成本、空壳拆分、虚假交易、
                    转移定价滥用等逃税行为。
                  </p>
                </div>

                <div className="entry-list" role="list">
                  {filteredPlans.map((plan) => {
                    const isActive = selectedPlan?.id === plan.id;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        className={`entry-card ${isActive ? "is-active" : ""}`}
                        onClick={() => setSelectedPlanId(plan.id)}
                      >
                        <div className="entry-meta">
                          <span>{plan.region}</span>
                          <span>{plan.taxType}</span>
                          <span>{plan.stage}</span>
                        </div>
                        <h4>{plan.title}</h4>
                        <p>{plan.summary}</p>
                      </button>
                    );
                  })}

                  {filteredPlans.length === 0 ? (
                    <div className="empty-state">
                      <h4>没有找到匹配筹划主题</h4>
                      <p>试试搜索小型微利企业、研发加计扣除、GST、group relief、进项税等关键词。</p>
                    </div>
                  ) : null}
                </div>
              </aside>

              {selectedPlan ? (
                <article className="encyclopedia-detail card-panel">
                  <div className="detail-header">
                    <div className="detail-tags">
                      <span>{selectedPlan.region}</span>
                      <span>{selectedPlan.taxType}</span>
                      <span>{selectedPlan.stage}</span>
                    </div>
                    <h3>{selectedPlan.title}</h3>
                    <p>{selectedPlan.summary}</p>
                  </div>

                  <section className="question-block">
                    <p className="eyebrow">适用场景</p>
                    <h4>{selectedPlan.suitability}</h4>
                  </section>

                  <div className="detail-grid">
                    <section className="detail-section">
                      <p className="eyebrow">底层逻辑</p>
                      <ul className="detail-list">
                        {selectedPlan.logic.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">具体怎么做</p>
                      <ul className="detail-list">
                        {selectedPlan.howItWorks.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">适用条件</p>
                      <ul className="detail-list">
                        {selectedPlan.qualification.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="detail-section">
                      <p className="eyebrow">必须留存的资料</p>
                      <ul className="detail-list">
                        {selectedPlan.documents.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="warning-block">
                    <p className="eyebrow">主要风险</p>
                    <ul className="detail-list warning-list">
                      {selectedPlan.risks.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="warning-block boundary-block">
                    <p className="eyebrow">红线与边界</p>
                    <ul className="detail-list boundary-list">
                      {selectedPlan.boundaries.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="related-terms">
                    <p className="eyebrow">CEO 应该继续追问</p>
                    <div className="chip-row">
                      {selectedPlan.ceoPrompts.map((prompt) => (
                        <span key={prompt} className="term-chip term-chip-wide">
                          {prompt}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section className="sources-block">
                    <div className="section-header">
                      <div>
                        <p className="eyebrow">官方来源</p>
                        <h4>继续打开政策原文和监管说明</h4>
                      </div>
                    </div>

                    <div className="source-grid">
                      {selectedPlan.officialSources.map((source) => (
                        <button
                          key={`${source.url}-${source.updatedAt}`}
                          type="button"
                          className="source-card"
                          onClick={() => handleOpenExternal(source.url)}
                        >
                          <span>{source.authority}</span>
                          <strong>{source.title}</strong>
                          <small>更新日期：{source.updatedAt}</small>
                          <div className="source-footer">
                            <b>打开来源</b>
                            <em>Source link</em>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                </article>
              ) : null}
            </section>
          ) : null}

          {activeTab === "invoices" ? (
            <section className="page-grid">
              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">发票与税率</p>
                    <h3>先懂票据的法律含义，再去看税率、抵扣和流程设计</h3>
                  </div>
                </div>

                <div className="rate-grid">
                  {visibleTaxRateCards.map((card) => (
                    <article key={card.id} className="rate-card">
                      <p className="eyebrow">{card.region}</p>
                      <h4>{card.title}</h4>
                      <p>{card.scope}</p>
                      <ul className="detail-list compact-list">
                        {card.rates.map((rate) => (
                          <li key={rate}>{rate}</li>
                        ))}
                      </ul>
                      <div className="note-strip">
                        {card.notes.map((note) => (
                          <span key={note}>{note}</span>
                        ))}
                      </div>
                      <div className="mini-source-list">
                        {card.officialSources.map((source) => (
                          <button
                            key={`${card.id}-${source.url}`}
                            type="button"
                            className="mini-source"
                            onClick={() => handleOpenExternal(source.url)}
                          >
                            {source.authority}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="encyclopedia-layout">
                <aside className="encyclopedia-sidebar card-panel">
                  <div className="section-header">
                    <div>
                      <p className="eyebrow">票据地图</p>
                      <h3>{filteredInvoices.length} 个票据主题</h3>
                    </div>
                  </div>

                  <div className="policy-note">
                    <p className="eyebrow">模块定位</p>
                    <p>
                      发票建议单独成模块，因为它同时牵涉收入确认、增值税/GST、成本入账、进项抵扣、报销制度、
                      电子归档和税务检查。
                    </p>
                  </div>

                  <div className="entry-list" role="list">
                    {filteredInvoices.map((guide) => {
                      const isActive = selectedInvoice?.id === guide.id;

                      return (
                        <button
                          key={guide.id}
                          type="button"
                          className={`entry-card ${isActive ? "is-active" : ""}`}
                          onClick={() => setSelectedInvoiceId(guide.id)}
                        >
                          <div className="entry-meta">
                            <span>{guide.region}</span>
                            <span>{guide.invoiceType}</span>
                          </div>
                          <h4>{guide.title}</h4>
                          <p>{guide.summary}</p>
                        </button>
                      );
                    })}

                    {filteredInvoices.length === 0 ? (
                      <div className="empty-state">
                        <h4>没有找到匹配票据主题</h4>
                        <p>试试搜索专票、普票、数电发票、tax invoice、credit note、GST 9%。</p>
                      </div>
                    ) : null}
                  </div>
                </aside>

                {selectedInvoice ? (
                  <article className="encyclopedia-detail card-panel">
                    <div className="detail-header">
                      <div className="detail-tags">
                        <span>{selectedInvoice.region}</span>
                        <span>{selectedInvoice.invoiceType}</span>
                        <span>{selectedInvoice.useCase}</span>
                      </div>
                      <h3>{selectedInvoice.title}</h3>
                      <p>{selectedInvoice.summary}</p>
                    </div>

                    <section className="question-block">
                      <p className="eyebrow">常见场景</p>
                      <h4>{selectedInvoice.useCase}</h4>
                    </section>

                    <div className="detail-grid">
                      <section className="detail-section">
                        <p className="eyebrow">法律含义</p>
                        <ul className="detail-list">
                          {selectedInvoice.legalMeaning.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="detail-section">
                        <p className="eyebrow">票面应关注什么</p>
                        <ul className="detail-list">
                          {selectedInvoice.mustContain.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="detail-section">
                        <p className="eyebrow">税率与政策理解</p>
                        <ul className="detail-list">
                          {selectedInvoice.taxRates.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>

                      <section className="detail-section">
                        <p className="eyebrow">抵扣与入账影响</p>
                        <ul className="detail-list">
                          {selectedInvoice.deductibleImpact.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    <section className="warning-block">
                      <p className="eyebrow">流程建议</p>
                      <ul className="detail-list">
                        {selectedInvoice.workflow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="warning-block">
                      <p className="eyebrow">高风险信号</p>
                      <ul className="detail-list warning-list">
                        {selectedInvoice.riskFlags.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>

                    <section className="sources-block">
                      <div className="section-header">
                        <div>
                          <p className="eyebrow">官方来源</p>
                          <h4>点击打开监管说明、规则页面和政策入口</h4>
                        </div>
                      </div>

                      <div className="source-grid">
                        {selectedInvoice.officialSources.map((source) => (
                          <button
                            key={`${source.url}-${source.updatedAt}`}
                            type="button"
                            className="source-card"
                            onClick={() => handleOpenExternal(source.url)}
                          >
                            <span>{source.authority}</span>
                            <strong>{source.title}</strong>
                            <small>更新日期：{source.updatedAt}</small>
                            <div className="source-footer">
                              <b>打开来源</b>
                              <em>Source link</em>
                            </div>
                          </button>
                        ))}
                      </div>
                    </section>
                  </article>
                ) : null}
              </section>
            </section>
          ) : null}

          {activeTab === "glossary" ? (
            <section className="page-grid">
              <section className="section-block card-panel">
                <div className="section-header">
                  <div>
                    <p className="eyebrow">术语表</p>
                    <h3>把财务语言翻译成经营语言</h3>
                  </div>
                </div>

                <div className="glossary-grid">
                  {filteredGlossary.map((item) => (
                    <article key={item.term} className="glossary-card">
                      <div className="glossary-header">
                        <h4>{item.term}</h4>
                        <span>{item.region}</span>
                      </div>
                      {item.alias ? <small>{item.alias}</small> : null}
                      <p>{item.simple}</p>
                      <strong>{item.whyItMatters}</strong>
                    </article>
                  ))}
                </div>

                {filteredGlossary.length === 0 ? (
                  <div className="empty-state">
                    <h4>没有找到匹配术语</h4>
                    <p>试试搜索毛利率、营运资金、ECI、GST、CPF、收入确认等关键词。</p>
                  </div>
                ) : null}
              </section>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default App;
