export type Region = "全部" | "全球通用" | "中国" | "新加坡" | "双地";

export interface SourceLink {
  authority: string;
  title: string;
  url: string;
  updatedAt: string;
}

export interface StudyModule {
  id: string;
  title: string;
  stage: string;
  duration: string;
  outcome: string;
  lessons: string[];
}

export interface ReportGuide {
  id: string;
  title: string;
  summary: string;
  questions: string[];
  sections: Array<{
    label: string;
    detail: string;
  }>;
}

export interface SpotlightCard {
  id: string;
  region: Region;
  eyebrow: string;
  title: string;
  detail: string;
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  region: Exclude<Region, "全部">;
  pillar: string;
  category: string;
  level: "CEO 入门" | "经营进阶" | "系统学习";
  urgency: "高" | "中";
  summary: string;
  ceoQuestion: string;
  concept: string[];
  whyItMatters: string[];
  howToRead: string[];
  ceoChecklist: string[];
  redFlags: string[];
  relatedTerms: string[];
  officialSources: SourceLink[];
}

export interface CalendarEntry {
  id: string;
  region: Exclude<Region, "全部" | "全球通用" | "双地">;
  cycle: "每月" | "每季" | "每年" | "触发即办";
  title: string;
  window: string;
  detail: string;
  risk: string;
}

export interface GlossaryTerm {
  term: string;
  alias?: string;
  region: Region;
  simple: string;
  whyItMatters: string;
}

export interface TaxPlanningPlay {
  id: string;
  title: string;
  region: Exclude<Region, "全部" | "全球通用" | "双地">;
  taxType: string;
  stage: "基础筹划" | "资格筹划" | "交易筹划" | "流程筹划";
  suitability: string;
  summary: string;
  logic: string[];
  howItWorks: string[];
  qualification: string[];
  documents: string[];
  risks: string[];
  boundaries: string[];
  ceoPrompts: string[];
  officialSources: SourceLink[];
}

export interface InvoiceGuide {
  id: string;
  title: string;
  region: Exclude<Region, "全部" | "全球通用" | "双地">;
  invoiceType: string;
  useCase: string;
  summary: string;
  legalMeaning: string[];
  mustContain: string[];
  taxRates: string[];
  deductibleImpact: string[];
  workflow: string[];
  riskFlags: string[];
  officialSources: SourceLink[];
}

export interface TaxRateCard {
  id: string;
  region: Exclude<Region, "全部" | "全球通用" | "双地">;
  title: string;
  scope: string;
  rates: string[];
  notes: string[];
  officialSources: SourceLink[];
}

export const lastVerifiedAt = "2026-05-13";

export const studyModules: StudyModule[] = [
  {
    id: "foundation",
    title: "财务基础总览",
    stage: "第一阶段",
    duration: "45 分钟",
    outcome: "知道三大报表怎么连接，理解利润、现金、资产不是一回事。",
    lessons: [
      "财务为什么不是会计部门的事情，而是 CEO 的经营语言",
      "利润表、资产负债表、现金流量表的关系",
      "收入、成本、费用、利润、现金五者如何区分",
      "为什么增长型公司最容易死在营运资金而不是死在账面亏损",
    ],
  },
  {
    id: "reports",
    title: "报表阅读训练",
    stage: "第二阶段",
    duration: "60 分钟",
    outcome: "可以独立看月报，知道先看哪里，再看哪里，问什么问题。",
    lessons: [
      "看利润表时，先抓收入质量、毛利率和费用结构",
      "看资产负债表时，先抓应收、存货、债务和净资产",
      "看现金流量表时，先抓经营现金流和资本开支",
      "把三张表串起来发现经营异常，而不是只看一个净利润数字",
    ],
  },
  {
    id: "company-operations",
    title: "经营财务系统",
    stage: "第三阶段",
    duration: "75 分钟",
    outcome: "理解预算、滚动预测、税务节奏、融资资料和董事会包怎么搭。",
    lessons: [
      "预算和滚动预测的区别",
      "现金 runway、回款、库存和付款审批如何进入经营会",
      "CEO 每月必须看的财务仪表盘长什么样",
      "融资、审计、税务检查之前要准备哪些财务底层能力",
    ],
  },
  {
    id: "regional-compliance",
    title: "中国与新加坡规则地图",
    stage: "第四阶段",
    duration: "90 分钟",
    outcome: "知道中国和新加坡各自有哪些必须做的财务、税务和秘书合规动作。",
    lessons: [
      "中国：会计准则、增值税、数电发票、汇算清缴、企业年报",
      "新加坡：FYE、ECI、Form C、GST、Annual Return、Financial Statements、CPF",
      "哪些义务属于税务线，哪些属于公司秘书或监管线",
      "如果有跨境集团，为什么一定要先统一口径和时间表",
    ],
  },
];

export const reportGuides: ReportGuide[] = [
  {
    id: "income-statement",
    title: "利润表怎么读",
    summary: "利润表不是只看赚了多少钱，而是看公司赚钱的方式是否健康、可复制、可扩张。",
    questions: [
      "收入是在增长，还是只是提前确认？",
      "毛利率变化来自涨价、成本失控，还是产品结构变了？",
      "费用增长是投未来，还是低效膨胀？",
      "净利润改善是否只是因为一次性项目？",
    ],
    sections: [
      { label: "先看收入", detail: "关注收入增速、复购、客单价、取消率和确认口径，不要只看合同额。" },
      { label: "再看毛利", detail: "毛利率是商业模式体温计。毛利长期不稳，通常意味着产品、定价或交付体系有问题。" },
      { label: "再看费用", detail: "销售、管理、研发费用不是越低越好，而是要和阶段、增长效率、现金能力匹配。" },
      { label: "最后看净利润", detail: "净利润是结果，不是起点。一定要回到现金和资产结构验证它是否真实。" },
    ],
  },
  {
    id: "balance-sheet",
    title: "资产负债表怎么读",
    summary: "资产负债表反映的是公司今天的家底、压力和结构。它常常比利润表更早暴露问题。",
    questions: [
      "应收账款为什么涨得比收入快？",
      "存货是否在积压，还是在为增长做前置准备？",
      "短期债务和长期债务是否匹配现金流？",
      "净资产在增强，还是靠外部输血维持？",
    ],
    sections: [
      { label: "先看流动资产", detail: "重点看现金、应收账款、存货。它们共同决定营运资金压力。" },
      { label: "再看负债", detail: "把应付、借款、税费和其他应付款分开看，判断谁最先要公司出钱。" },
      { label: "再看净资产", detail: "净资产连续变薄，说明公司在消耗资本缓冲。" },
      { label: "最后做结构判断", detail: "收入增长如果建立在应收和库存暴涨上，通常不是高质量增长。" },
    ],
  },
  {
    id: "cashflow-statement",
    title: "现金流量表怎么读",
    summary: "现金流量表的核心问题只有一个：公司是否能靠经营本身产生现金并活下去。",
    questions: [
      "经营现金流为什么为负？",
      "资本开支是不是超出公司阶段能力？",
      "融资现金流是在支撑健康扩张，还是在堵经营漏水？",
      "现金流和利润偏离最大的原因是什么？",
    ],
    sections: [
      { label: "经营活动", detail: "这是判断商业模式自我造血能力的第一指标。" },
      { label: "投资活动", detail: "资本开支、长期投资和设备采购会影响未来产能，但会立即占用现金。" },
      { label: "融资活动", detail: "融资能救急，但不能长期替代经营现金流。" },
      { label: "联合判断", detail: "利润为正但经营现金流差，常见原因是回款、库存、预付款或一次性确认。" },
    ],
  },
];

export const spotlightCards: SpotlightCard[] = [
  {
    id: "cash",
    region: "双地",
    eyebrow: "经营底层逻辑",
    title: "利润不等于现金",
    detail: "现金流先决定公司能不能活，利润表再解释公司为什么赚或亏。",
  },
  {
    id: "reports",
    region: "全球通用",
    eyebrow: "系统学习",
    title: "先学会读三张表，再去谈税筹和融资",
    detail: "不懂报表之间的连接关系，后面的税务优化、预算和融资沟通都会很虚。",
  },
  {
    id: "china",
    region: "中国",
    eyebrow: "中国重点",
    title: "发票、增值税、汇算、年报缺一不可",
    detail: "在中国，经营动作和税务留痕强绑定，很多风险不是年底才出现，而是月度就埋下。",
  },
  {
    id: "singapore",
    region: "新加坡",
    eyebrow: "新加坡重点",
    title: "FYE、ECI、AR、FS、CPF 是管理节奏的骨架",
    detail: "在新加坡，董事责任和文件时点非常明确，延迟往往是治理问题而不是技术问题。",
  },
];

export const knowledgeEntries: KnowledgeEntry[] = [
  {
    id: "why-finance-matters",
    title: "为什么 CEO 不能把财务完全外包给会计或代账",
    region: "全球通用",
    pillar: "认知基础",
    category: "财务思维",
    level: "系统学习",
    urgency: "高",
    summary: "CEO 不需要亲自做账，但必须掌握财务语言，否则无法真正管理增长、现金、融资和风险。",
    ceoQuestion: "一个不懂财务的 CEO，最容易在哪些地方做错决策？",
    concept: [
      "财务不是记账动作，而是经营信息系统。",
      "老板最常见的误区，是把签单当收入、把利润当现金、把融资当安全感。",
      "财务团队负责记录和解释，CEO 负责用这些数字做资源分配和风险判断。",
    ],
    whyItMatters: [
      "不懂财务，CEO 就无法判断增长质量，只会被表面增速带着跑。",
      "预算、定价、回款、库存、税负、融资和股权安排都需要财务视角。",
      "越是早期公司，越不能把财务当后台行政，因为每一笔现金都更重要。",
    ],
    howToRead: [
      "先掌握三张报表和几个核心指标，不追求术语全懂。",
      "把经营会、董事会和财务月报里的口径统一成一套。",
      "把每次重大决策都落到收入、现金、毛利、营运资金和税负上。",
    ],
    ceoChecklist: [
      "每月固定看一版管理报表。",
      "财务汇报必须能回答‘为什么变了’而不是只报数字。",
      "所有扩张计划都要配现金预测和风险假设。",
    ],
    redFlags: [
      "CEO 只能讲愿景，讲不清收入、毛利、现金和 burn。",
      "财务团队只能出报表，不能解释业务动作。",
      "关键决策依赖感觉，不依赖滚动财务视图。",
    ],
    relatedTerms: ["管理报表", "Runway", "毛利率", "营运资金"],
    officialSources: [
      {
        authority: "学习入口",
        title: "打开三大报表阅读指南",
        url: "https://www.investopedia.com/terms/f/financial-statements.asp",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "three-statements",
    title: "三大报表怎么一起看",
    region: "全球通用",
    pillar: "报表阅读",
    category: "财务报表",
    level: "CEO 入门",
    urgency: "高",
    summary: "利润表讲结果，资产负债表讲结构，现金流量表讲生存能力。三张表必须联动理解。",
    ceoQuestion: "公司看起来赚钱，为什么银行账户却越来越紧？",
    concept: [
      "利润表关注一个期间赚了多少。",
      "资产负债表关注某个时点拥有什么、欠什么。",
      "现金流量表关注现金从哪里来、流到哪里去。",
    ],
    whyItMatters: [
      "只看利润表，很容易把确认收入当成真实回款。",
      "只看资产负债表，看不出当期经营效率。",
      "只看现金流，会漏掉背后的利润质量和资产结构问题。",
    ],
    howToRead: [
      "从利润表看到净利润后，去资产负债表确认应收和存货是否同步恶化。",
      "再去现金流量表确认经营现金流是否与利润方向一致。",
      "如果利润改善但现金变差，优先排查回款、库存、预付和资本开支。",
    ],
    ceoChecklist: [
      "每月先看经营活动现金流净额，再看净利润。",
      "对比应收账款、存货、应付账款的变化方向是否和收入增速一致。",
      "要求财务把利润、现金和营运资金一起解释。",
    ],
    redFlags: [
      "收入增长很快，但经营现金流持续为负。",
      "应收账款和存货增速长期高于收入增速。",
      "利润为正，但经常依赖股东借款或短债续命。",
    ],
    relatedTerms: ["经营现金流", "应收账款", "存货周转", "EBITDA"],
    officialSources: [
      {
        authority: "学习入口",
        title: "打开利润表、资产负债表、现金流量表学习页",
        url: "https://www.accountingcoach.com/financial-statements/explanation",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "cash-vs-profit",
    title: "现金流比利润更早暴露风险",
    region: "全球通用",
    pillar: "现金管理",
    category: "资金与现金",
    level: "CEO 入门",
    urgency: "高",
    summary: "多数经营危机不是先死于亏损，而是先死于回款、备货和付款节奏失衡。",
    ceoQuestion: "什么时候该把‘增长优先’切换为‘现金优先’？",
    concept: [
      "利润是按会计规则确认，现金是按真实收付发生。",
      "增长越快，营运资金消耗越可能加速。",
      "现金 runway 是 CEO 的生存线。",
    ],
    whyItMatters: [
      "税、工资、供应商和银行，最终都只认现金。",
      "如果经营现金流恶化，增长策略需要重新排序。",
      "现金比利润更早提醒你什么时候要收缩、提价或融资。",
    ],
    howToRead: [
      "按周看银行余额和未来 13 周现金预测。",
      "把客户回款和主要付款节点接到同一张现金视图上。",
      "判断问题是销售回款、存货积压、费用扩张还是资本开支造成。",
    ],
    ceoChecklist: [
      "建立 13 周滚动现金预测。",
      "把前 20 大客户回款计划和前 20 大付款节点绑定到预测。",
      "每周复盘一次 runway 变化原因。",
    ],
    redFlags: [
      "市场投放、研发、备货都在加速，但没有对应的现金方案。",
      "回款周期延长，销售继续按签单额报喜不报忧。",
      "财务只能给历史数字，无法给未来 4 到 13 周现金视图。",
    ],
    relatedTerms: ["Runway", "营运资金", "回款周期", "资本开支"],
    officialSources: [
      {
        authority: "学习入口",
        title: "打开现金流管理基础学习页",
        url: "https://corporatefinanceinstitute.com/resources/accounting/cash-flow-guide-ebitda-cf-fcf-fcff/",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "budget-forecast",
    title: "预算、滚动预测和董事会包",
    region: "全球通用",
    pillar: "经营系统",
    category: "预算与经营分析",
    level: "经营进阶",
    urgency: "中",
    summary: "预算给方向，滚动预测给纠偏，董事会包给行动依据。三者缺一不可。",
    ceoQuestion: "哪些数字必须每个月固定进董事会包？",
    concept: [
      "预算是静态目标，滚动预测是动态修正。",
      "董事会包不是报喜工具，而是资源再分配工具。",
      "差异分析比结果本身更重要。",
    ],
    whyItMatters: [
      "如果没有滚动预测，问题通常会在太晚才被发现。",
      "管理层使用不同数字口径，会把执行问题伪装成沟通问题。",
      "融资、裁员、提价、扩招都应该基于同一套经营模型。",
    ],
    howToRead: [
      "把收入、毛利、费用、现金、应收、存货、税务节奏放在同一版月包。",
      "对所有偏差都拆成量、价、结构、时点和执行效率。",
      "强制要求每个业务负责人解释未来 90 天而不只是回顾过去 30 天。",
    ],
    ceoChecklist: [
      "董事会包至少包含收入、毛利、费用、现金、应收、存货和税务节点。",
      "同时维护滚动 3 个月和滚动 12 个月预测。",
      "对重大偏差设置负责人和修正动作。",
    ],
    redFlags: [
      "预算只在年初做一次，之后没人维护。",
      "经营会和财务会数字口径不同。",
      "管理层只看结果，不看偏差和行动。",
    ],
    relatedTerms: ["预算", "滚动预测", "Board Pack", "差异分析"],
    officialSources: [
      {
        authority: "学习入口",
        title: "打开预算与预测实践指南",
        url: "https://www.cfoselections.com/perspective/how-to-create-a-financial-forecast/",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "cn-accounting-standards",
    title: "中国公司该用哪套会计准则",
    region: "中国",
    pillar: "中国规则",
    category: "会计与准则",
    level: "系统学习",
    urgency: "高",
    summary: "中国要先分清企业会计准则与小企业会计准则，不能边记账边换口径。",
    ceoQuestion: "我的公司适用企业会计准则，还是小企业会计准则？",
    concept: [
      "会计准则决定收入、成本、折旧、研发、报表披露的基本规则。",
      "准则一旦选定，就会影响融资、审计、税会差异和集团并表。",
      "准则不只是会计问题，也是经营信息一致性问题。",
    ],
    whyItMatters: [
      "错误准则会导致重做账套和重编报表。",
      "融资、审计、并购时，口径不统一会严重拖慢进程。",
      "税会差异识别建立在稳定会计口径上。",
    ],
    howToRead: [
      "先确认企业是否满足小企业准则适用条件。",
      "再看未来是否需要审计、融资、并表或股权交易。",
      "对收入确认、研发费用、固定资产和存货形成书面会计政策。",
    ],
    ceoChecklist: [
      "在成立早期就确定准则口径。",
      "代账或财务团队必须能书面解释准则适用理由。",
      "新业务上线前，要先评估会计口径影响。",
    ],
    redFlags: [
      "账务完全依赖代账经验，没有会计政策文件。",
      "同类业务记账方式每月不同。",
      "准备融资或审计时才发现准则和科目体系不匹配。",
    ],
    relatedTerms: ["企业会计准则", "小企业会计准则", "会计政策", "税会差异"],
    officialSources: [
      {
        authority: "财政部",
        title: "关于印发《小企业会计准则》的通知",
        url: "https://kjs.mof.gov.cn/zhengcefabu/201111/t20111107_605525.htm",
        updatedAt: "2011-11-18",
      },
      {
        authority: "中国政府网",
        title: "企业会计准则---基本准则",
        url: "https://www.gov.cn/zhengce/2006-02/15/content_5717170.htm",
        updatedAt: "2006-02-15",
      },
    ],
  },
  {
    id: "cn-vat-invoice",
    title: "中国增值税与数电发票",
    region: "中国",
    pillar: "中国规则",
    category: "税务合规",
    level: "系统学习",
    urgency: "高",
    summary: "中国公司的收入、开票、申报和进项抵扣是一条链，不是四件分开的事。",
    ceoQuestion: "为什么业务已经成交，财务还在追发票、税率和进项？",
    concept: [
      "增值税决定销项税、进项税和合同含税口径。",
      "数电发票让留痕更实时，也让异常更容易被识别。",
      "税率、开票时点、回款和收入确认虽然不同，但必须协同。",
    ],
    whyItMatters: [
      "开票错误、进项缺失和申报口径错误会直接改变税负。",
      "含税报价和不含税毛利如果没人解释，CEO 会误判利润。",
      "月末补票和异常红冲，通常暴露业务流程而不只是财务动作问题。",
    ],
    howToRead: [
      "先确认纳税人身份和业务适用税率。",
      "再看合同、发货、开票、回款四个时点是否一致。",
      "最后检查进项票取得、认证和抵扣逻辑是否形成闭环。",
    ],
    ceoChecklist: [
      "确认公司是一般纳税人还是小规模纳税人。",
      "把销售签约、开票、回款、采购收票和申报节点连成闭环。",
      "重点采购和费用必须检查可抵扣凭证。",
    ],
    redFlags: [
      "销售按含税价签单，但没人核对税负和毛利。",
      "月末集中补开发票，业务和财务口径不一致。",
      "进项票缺失、异常票、长期留抵或频繁红冲没人解释。",
    ],
    relatedTerms: ["增值税", "一般纳税人", "进项税额", "数电发票"],
    officialSources: [
      {
        authority: "国家税务总局纳税服务平台",
        title: "增值税及附加税费申报表（一般纳税人适用）",
        url: "https://12366.chinatax.gov.cn/bzds/009/009.html",
        updatedAt: "2026-05-13",
      },
      {
        authority: "国家税务总局",
        title: "“数电发票”12月起全国推行！一文了解它有哪些优点",
        url: "https://www.chinatax.gov.cn/chinatax/n810356/n3010387/c5236173/content.html",
        updatedAt: "2024-11-27",
      },
    ],
  },
  {
    id: "cn-cit-settlement",
    title: "中国企业所得税汇算清缴",
    region: "中国",
    pillar: "中国规则",
    category: "税务合规",
    level: "系统学习",
    urgency: "高",
    summary: "企业所得税汇算清缴，本质是在把会计利润校正成税法口径下的应纳税所得额。",
    ceoQuestion: "公司年底账上有利润，企业所得税到底按什么算？",
    concept: [
      "会计利润不等于应纳税所得额。",
      "税前扣除、优惠政策、折旧摊销和关联交易都会影响税负。",
      "汇算清缴不是走流程，而是一次税会逻辑复盘。",
    ],
    whyItMatters: [
      "真正税负通常在汇算清缴时被校正。",
      "研发加计扣除、招待费、广告费、股权激励等都可能形成差异。",
      "CEO 必须知道哪些优惠需要提前留痕，而不是年底临时补。",
    ],
    howToRead: [
      "从会计利润出发，列出不可扣、限额扣除、递延和优惠项目。",
      "再看预缴与年度最终税负偏差。",
      "对高风险费用和关联交易单独做底稿。",
    ],
    ceoChecklist: [
      "提前准备税会差异清单。",
      "高风险项目单独复核。",
      "确保底稿、合同、发票、台账和批准文件能串起来。",
    ],
    redFlags: [
      "直到 5 月底才临时开始整理资料。",
      "费用真实性、业务实质和凭证留痕说不清。",
      "长期只看代账给出的应交税额，管理层没有做税负复盘。",
    ],
    relatedTerms: ["汇算清缴", "应纳税所得额", "税前扣除", "研发加计扣除"],
    officialSources: [
      {
        authority: "中国政府网",
        title: "中华人民共和国企业所得税法（主席令第六十三号）",
        url: "https://www.gov.cn/zhengce/2007-03/19/content_2602200.htm?isappinstalled=0",
        updatedAt: "2007-03-19",
      },
      {
        authority: "国家税务总局浙江省税务局",
        title: "2024年度企业所得税汇算清缴期截止时间是什么时候？",
        url: "https://zhejiang.chinatax.gov.cn/art/2025/7/25/art_13314_640400.html",
        updatedAt: "2025-07-25",
      },
    ],
  },
  {
    id: "cn-annual-report",
    title: "中国企业年报公示",
    region: "中国",
    pillar: "中国规则",
    category: "治理与备案",
    level: "系统学习",
    urgency: "高",
    summary: "市场监管年报和税务申报是两套义务。只报税，不等于年报完成。",
    ceoQuestion: "为什么公司没有经营异常，却因为年报被列异常？",
    concept: [
      "企业年报属于市场监管线，不是税务线。",
      "年报逾期会带来经营异常、公示风险和尽调障碍。",
      "股东、地址、联系方式和经营状态都要对外公示。",
    ],
    whyItMatters: [
      "漏报年报是很多公司最常见、也最低级的治理风险。",
      "异常名录会影响银行、客户、平台和投资人信心。",
      "年报信息失真，说明组织连最基础的公司资料都没有维护好。",
    ],
    howToRead: [
      "把每年 1 月到 6 月固定为企业年报窗口。",
      "提交前核对联系人、地址、出资信息和经营状态。",
      "提交后确认不是保存草稿，而是完成公示。",
    ],
    ceoChecklist: [
      "企业年报列入固定节点。",
      "联络员信息保持有效。",
      "历史年报记录至少每年抽查一次。",
    ],
    redFlags: [
      "公司多年由不同代理处理，没人确认是否公示成功。",
      "联络员手机号失效。",
      "股东信息与实际工商状态不同步。",
    ],
    relatedTerms: ["企业年报", "经营异常名录", "国家企业信用信息公示系统", "联络员"],
    officialSources: [
      {
        authority: "中国政府网",
        title: "企业信息公示暂行条例",
        url: "https://www.gov.cn/zhengce/zhengceku/2014-08/23/content_9038.htm",
        updatedAt: "2014-08-23",
      },
      {
        authority: "广东政务服务网",
        title: "企业年度报告公示",
        url: "https://www.gdzwfw.gov.cn/portal/simple-guide/11440100MB2C91891K3442025036000",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "sg-cit-eci",
    title: "新加坡 Corporate Income Tax、ECI 与 Form C",
    region: "新加坡",
    pillar: "新加坡规则",
    category: "税务合规",
    level: "系统学习",
    urgency: "高",
    summary: "新加坡公司每年通常要处理两次企业所得税动作：ECI 和 Form C 系列表单。",
    ceoQuestion: "为什么年结后 3 个月内就要处理 ECI，而不是等全年税表？",
    concept: [
      "ECI 是预估应税利润，Form C 系列表单是年度正式申报。",
      "每个实体的 FYE 都会单独决定时点。",
      "税务节奏和现金付款节奏不能分开管理。",
    ],
    whyItMatters: [
      "ECI 影响评税和付款安排。",
      "如果 FYE 和税务节奏没人管理，组织会很容易错过截止日。",
      "集团汇报、审计和本地税务需要统一一套时间表。",
    ],
    howToRead: [
      "先确认 FYE。",
      "再倒推出 ECI 和 Form C 截止时间。",
      "提前整理税前扣除、董事费用、关联交易和一次性项目。",
    ],
    ceoChecklist: [
      "每个实体建立自己的 FYE 和 ECI 截止日。",
      "确认是否满足 ECI waiver 条件。",
      "年结完成前先整理关键税务差异。",
    ],
    redFlags: [
      "没人能说清楚当前 FYE 和下一次 ECI 截止日。",
      "ECI 长期靠拍脑袋估，后续差异很大。",
      "收到 estimated assessment 才发现没按时申报。",
    ],
    relatedTerms: ["ECI", "Form C-S", "Year of Assessment", "Chargeable Income"],
    officialSources: [
      {
        authority: "IRAS",
        title: "Basic Guide to Corporate Income Tax for Companies",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/basics-of-corporate-income-tax/basic-guide-to-corporate-income-tax-for-companies/",
        updatedAt: "2026-01-22",
      },
      {
        authority: "IRAS",
        title: "Estimated Chargeable Income (ECI) Filing",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/estimated-chargeable-income-%28eci%29-filing",
        updatedAt: "2026-04-07",
      },
    ],
  },
  {
    id: "sg-gst",
    title: "新加坡 GST 注册与合规",
    region: "新加坡",
    pillar: "新加坡规则",
    category: "税务合规",
    level: "系统学习",
    urgency: "高",
    summary: "新加坡 GST 的关键不是只知道税率，而是知道何时必须注册、何时开始收费、何时开始留档。",
    ceoQuestion: "我的业务快到 100 万新元门槛了，什么时候必须注册 GST？",
    concept: [
      "GST 注册判断要看 retrospective 和 prospective 两种视角。",
      "注册后要承担 tax invoice、return、records 和价格展示义务。",
      "税务动作会反向改变销售、系统和开票流程。",
    ],
    whyItMatters: [
      "晚注册不仅是补税，还可能补历史交易税额。",
      "价格体系、系统字段和合同模板都可能受影响。",
      "如果管理层不监控 taxable turnover，风险通常是事后才暴露。",
    ],
    howToRead: [
      "每月监控 taxable turnover。",
      "未来 12 个月预测超过门槛时，立即评估并申请。",
      "确认 tax invoice、报价、POS/ERP 和申报流程同步生效。",
    ],
    ceoChecklist: [
      "每月监控 taxable turnover。",
      "触发时 30 天内评估并提交注册。",
      "系统从生效日起能正确显示 GST 信息。",
    ],
    redFlags: [
      "把总收入、免税收入和资本性出售混在一起看。",
      "已申请 GST 但业务提前向客户收取 GST。",
      "注册后没有准备好 records 和 return 流程。",
    ],
    relatedTerms: ["GST", "Taxable Turnover", "Tax Invoice", "Prospective View"],
    officialSources: [
      {
        authority: "IRAS",
        title: "Do I Need to Register for GST",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/gst-registration-deregistration/do-i-need-to-register-for-gst",
        updatedAt: "2026-01-26",
      },
      {
        authority: "IRAS",
        title: "Responsibilities of GST-registered businesses",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/basics-of-gst/responsibilities-of-a-gst-registered-business/3",
        updatedAt: "2026-04-15",
      },
    ],
  },
  {
    id: "sg-annual-return-fs",
    title: "新加坡 Annual Return、Financial Statements 与会计准则",
    region: "新加坡",
    pillar: "新加坡规则",
    category: "治理与备案",
    level: "系统学习",
    urgency: "高",
    summary: "在新加坡，报税不等于公司秘书合规。Annual Return、financial statements 和适用会计准则必须独立管理。",
    ceoQuestion: "为什么公司已经报了税，还是会因为 ACRA 事项出问题？",
    concept: [
      "ACRA annual return 和 IRAS tax filing 是两条独立义务线。",
      "Financial statements 是否要提交，以及提交 PDF 还是 XBRL，取决于公司类型与规模。",
      "董事必须确保财务报表符合适用会计框架。",
    ],
    whyItMatters: [
      "税务做完，不代表公司秘书和监管义务完成。",
      "董事对文件质量和时点负有明确责任。",
      "融资、审计和银行尽调都非常看重 ACRA 合规记录。",
    ],
    howToRead: [
      "先确认 FYE、公司类型和是否属于 EPC。",
      "再确认 annual return deadline。",
      "最后确认采用的会计准则与提交格式。",
    ],
    ceoChecklist: [
      "先确定 FYE 和公司类型。",
      "提前确认 annual return deadline。",
      "统一秘书、审计和税务团队口径。",
    ],
    redFlags: [
      "公司秘书、财务、税务代理三方各自做事。",
      "管理层不知道是否需要向 ACRA 提交 financial statements。",
      "会计准则选择与集团或融资要求不一致。",
    ],
    relatedTerms: ["Annual Return", "FYE", "XBRL", "SFRS for Small Entities"],
    officialSources: [
      {
        authority: "ACRA",
        title: "Deadline & requirements for annual returns",
        url: "https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/filing-annual-returns-companies/deadline-requirements/",
        updatedAt: "2026-03-09",
      },
      {
        authority: "ACRA",
        title: "Financial statements: Filing requirements & exemptions",
        url: "https://www.acra.gov.sg/manage/companies/legal-requirements-common-offences/filing-financial-statements-in-xbrl-format/requirements-exemptions/",
        updatedAt: "2026-03-10",
      },
      {
        authority: "ACRA",
        title: "Guide to accounting standards",
        url: "https://www.acra.gov.sg/regulations/accounting-standards-financial-reporting-surveillance/accounting-standards/",
        updatedAt: "2026-02-07",
      },
    ],
  },
  {
    id: "sg-payroll-cpf",
    title: "新加坡工资、Itemised Payslips 与 CPF",
    region: "新加坡",
    pillar: "新加坡规则",
    category: "薪酬与人事",
    level: "系统学习",
    urgency: "高",
    summary: "薪资支付、工资单和 CPF 不是 HR 小事，而是法定义务和现金流节点。",
    ceoQuestion: "工资已经发了，为什么还要特别盯 payslip、salary records 和 CPF？",
    concept: [
      "工资支付、记录留存和 CPF 缴纳都是法定义务。",
      "薪酬不是单一付款动作，而是一套记录与申报系统。",
      "员工体验和合规风险会在离职、佣金和清算时集中暴露。",
    ],
    whyItMatters: [
      "晚缴 CPF 会带来利息和执法风险。",
      "没有完整 salary records，很多劳资争议无法自证。",
      "工资节奏直接影响月度现金流和用工体验。",
    ],
    howToRead: [
      "把 payroll、payslip、salary records 和 CPF 当成一个流程管理。",
      "确认系统能覆盖外籍员工、佣金、加班和离职场景。",
      "固定 payroll close 日，而不是每月临时处理。",
    ],
    ceoChecklist: [
      "建立固定工资支付日、审批日和 CPF 提交流程。",
      "确认 payroll 系统能输出 payslip、records 和 CPF 数据。",
      "对离职、佣金和税务清算做单独检查。",
    ],
    redFlags: [
      "工资在 Excel 手工算，缺少可追溯记录。",
      "员工离职时才发现 final salary 或 clearance 没准备。",
      "CPF 经常在次月中旬以后才补缴。",
    ],
    relatedTerms: ["CPF", "Itemised Payslip", "Salary Record", "Tax Clearance"],
    officialSources: [
      {
        authority: "CPF Board",
        title: "Making CPF contributions",
        url: "https://www.cpf.gov.sg/employer/making-cpf-contributions",
        updatedAt: "2025-07-07",
      },
      {
        authority: "Ministry of Manpower",
        title: "Paying salary",
        url: "https://www.mom.gov.sg/employment-practices/salary/paying-salary",
        updatedAt: "2026-01-30",
      },
    ],
  },
];

export const calendarEntries: CalendarEntry[] = [
  {
    id: "cn-vat-cycle",
    region: "中国",
    cycle: "每月",
    title: "增值税及附加税费申报",
    window: "按税务机关核定的纳税期限执行",
    detail: "即使没有销售额，也要按核定周期判断是否需要申报。开票、收票、回款与申报准备应在月结前收拢。",
    risk: "错申、漏申、进项抵扣资料缺失，会直接带来税负和异常处理成本。",
  },
  {
    id: "cn-cit-prepay",
    region: "中国",
    cycle: "每季",
    title: "企业所得税预缴",
    window: "按月或按季预缴，以主管税务机关核定为准",
    detail: "不要只在年末看企业所得税。预缴节奏决定全年现金流与汇算差异。",
    risk: "长期预缴偏差过大，会把问题推迟到汇算清缴集中爆发。",
  },
  {
    id: "cn-cit-annual",
    region: "中国",
    cycle: "每年",
    title: "企业所得税汇算清缴",
    window: "年度终了之日起 5 个月内",
    detail: "建议从次年 1 月开始整理台账与税会差异，而不是拖到 5 月底。",
    risk: "资料临时拼凑会放大税前扣除、优惠适用和关联交易解释风险。",
  },
  {
    id: "cn-annual-report",
    region: "中国",
    cycle: "每年",
    title: "企业年报公示",
    window: "每年 1 月 1 日至 6 月 30 日",
    detail: "通过国家企业信用信息公示系统报送上一年度年报并向社会公示。",
    risk: "逾期可能被列入经营异常名录，影响对外合作与融资尽调。",
  },
  {
    id: "sg-eci",
    region: "新加坡",
    cycle: "每年",
    title: "Estimated Chargeable Income (ECI)",
    window: "FYE 后 3 个月内",
    detail: "每个实体按自己的 FYE 计时，不是统一等到 11 月才处理。",
    risk: "晚报可能收到 estimated assessment，并失去更平滑的付款安排。",
  },
  {
    id: "sg-form-c",
    region: "新加坡",
    cycle: "每年",
    title: "Form C-S / Form C-S (Lite) / Form C",
    window: "每年 11 月 30 日",
    detail: "这是年度实际所得税申报，与 ECI 是两步，不可互相替代。",
    risk: "漏报或晚报会影响 assessment、罚款和后续合规记录。",
  },
  {
    id: "sg-ar",
    region: "新加坡",
    cycle: "每年",
    title: "ACRA Annual Return",
    window: "按公司类型和 FYE，一般为 FYE 后 5 到 8 个月",
    detail: "非上市公司通常在 FYE 后 7 或 8 个月内申报，具体看是否有 share capital / overseas branch register。",
    risk: "逾期会产生 late filing penalty，并可能影响董事记录。",
  },
  {
    id: "sg-cpf",
    region: "新加坡",
    cycle: "每月",
    title: "CPF 缴纳",
    window: "当月最后一天到期，逾期至次月 14 日后会触发执法与利息",
    detail: "工资发放、payslip 出具和 CPF 提交最好在同一个 payroll close 流程里完成。",
    risk: "晚缴会有 1.5% 月利息并带来执法风险。",
  },
  {
    id: "sg-gst-threshold",
    region: "新加坡",
    cycle: "触发即办",
    title: "GST 注册门槛监控",
    window: "持续监控；触发后 30 天内申请",
    detail: "若未来 12 个月预计 taxable turnover 超过 100 万新元，需要在预测日后 30 天内处理注册。",
    risk: "晚注册会产生 backdated GST 和潜在罚则。",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "收入确认",
    alias: "Revenue Recognition",
    region: "全球通用",
    simple: "决定公司什么时候可以把一笔业务真正算成收入。",
    whyItMatters: "签约不等于收入，发货不一定等于收入，收款也不一定等于收入。",
  },
  {
    term: "经营现金流",
    alias: "Operating Cash Flow",
    region: "双地",
    simple: "公司主营业务真实产生或消耗的现金净额。",
    whyItMatters: "它最直接回答公司是否靠业务本身在养活自己。",
  },
  {
    term: "应收账款",
    alias: "Accounts Receivable",
    region: "双地",
    simple: "已经确认收入但还没收到的钱。",
    whyItMatters: "它涨得太快，通常意味着增长质量在下降。",
  },
  {
    term: "毛利率",
    alias: "Gross Margin",
    region: "双地",
    simple: "收入扣掉直接成本后的剩余比例。",
    whyItMatters: "CEO 判断商业模式是否可扩张，先看毛利率是否稳定。",
  },
  {
    term: "营运资金",
    alias: "Working Capital",
    region: "双地",
    simple: "日常经营里被应收、存货和应付占住的资金。",
    whyItMatters: "营运资金管理不好，增长越快越缺钱。",
  },
  {
    term: "税会差异",
    region: "中国",
    simple: "会计利润和税法口径下应税所得之间的差别。",
    whyItMatters: "汇算清缴、税负解释和审计沟通都依赖这张桥接表。",
  },
  {
    term: "数电发票",
    alias: "全面数字化电子发票",
    region: "中国",
    simple: "由税务系统统一赋码、数字化流转的电子发票。",
    whyItMatters: "它改变的是发票取得、交付、归档和核对效率，不只是票面形态。",
  },
  {
    term: "汇算清缴",
    region: "中国",
    simple: "纳税年度结束后，对企业所得税做年度最终清算。",
    whyItMatters: "真正税负通常在这里被校正，而不是只看平时预缴。",
  },
  {
    term: "ECI",
    alias: "Estimated Chargeable Income",
    region: "新加坡",
    simple: "新加坡公司对本年度应税利润的预估申报。",
    whyItMatters: "它会影响预估税额、付款节奏和 IRAS 后续 assessment。",
  },
  {
    term: "FYE",
    alias: "Financial Year End",
    region: "新加坡",
    simple: "公司选择的财务年度结束日。",
    whyItMatters: "ECI、AR、审计、集团结账都围绕它安排。",
  },
  {
    term: "GST",
    alias: "Goods and Services Tax",
    region: "新加坡",
    simple: "新加坡的商品与服务税。",
    whyItMatters: "是否需要注册、何时起收取、如何开票和留档，都会影响报价和流程。",
  },
  {
    term: "CPF",
    alias: "Central Provident Fund",
    region: "新加坡",
    simple: "新加坡雇主和员工都要参与的法定公积金体系。",
    whyItMatters: "它直接影响 payroll、现金流和用工合规。",
  },
];

export const taxPlanningPlays: TaxPlanningPlay[] = [
  {
    id: "cn-small-low-profit",
    title: "中国：小型微利企业优惠",
    region: "中国",
    taxType: "企业所得税",
    stage: "资格筹划",
    suitability: "适合利润规模不大、组织较轻、符合小型微利企业条件的公司。",
    summary:
      "这类筹划不是把利润藏起来，而是在业务真实、资格真实的前提下，依法享受较低的实际企业所得税负担。",
    logic: [
      "企业所得税不是所有公司都按同样实际税负承担，符合政策条件的小型微利企业可享受更低的应纳税所得额计算口径。",
      "其核心逻辑是国家对小微主体给予扶持，因此税负优化来源于资格本身，而不是凭空制造费用。",
      "真正有价值的动作，是让公司的主体结构、收入规模、人员配置和账务规范保持在合规可享受状态。",
    ],
    howItWorks: [
      "先确认公司是否满足小型微利企业的资产、从业人数、应纳税所得额等条件。",
      "按预缴和汇算口径持续跟踪，不要等年底才判断是否符合。",
      "如果公司接近资格边界，提前评估新增业务、招聘、资产投入是否会改变适用结果。",
    ],
    qualification: [
      "资格判断要基于真实经营数据，而不是形式拆分。",
      "需要持续关注年度累计口径，而不只是单月利润。",
      "政策适用通常要和企业所得税申报、台账和汇算清缴逻辑一致。",
    ],
    documents: [
      "完整账簿、纳税申报记录、人员与资产台账。",
      "能证明业务真实性的合同、发票、资金流和交付记录。",
      "年度优惠测算底稿，说明为何满足资格条件。",
    ],
    risks: [
      "业务量上来后没有持续监控资格边界，导致预缴判断和最终汇算偏差很大。",
      "名义上分拆主体、实质上人员、业务、客户和管理完全混同，可能被质疑为规避税负的安排。",
      "账务基础弱，无法证明资格数据来源真实可靠。",
    ],
    boundaries: [
      "不能为了留在优惠区间而虚构成本、延后确认收入或做假账。",
      "不能用空壳主体、人为拆单、虚假独立经营去制造多个小微资格。",
      "一旦实际不再符合条件，应按真实口径申报，而不是继续套用优惠。",
    ],
    ceoPrompts: [
      "这家公司为什么符合小型微利企业条件，证据在哪？",
      "如果未来 6 到 12 个月收入和人员增长，资格是否会变化？",
      "如果失去资格，利润率和现金流会受到什么影响？",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "支持小微企业和个体工商户发展税费优惠政策指引（节选）",
        url: "https://www.chinatax.gov.cn/chinatax/n810341/n810755/c5186595/content.html",
        updatedAt: "2023-08-02",
      },
      {
        authority: "中国政府网",
        title: "中华人民共和国企业所得税法",
        url: "https://www.gov.cn/zhengce/2007-03/19/content_2602200.htm?isappinstalled=0",
        updatedAt: "2007-03-19",
      },
    ],
  },
  {
    id: "cn-rd-super-deduction",
    title: "中国：研发费用加计扣除",
    region: "中国",
    taxType: "企业所得税",
    stage: "资格筹划",
    suitability: "适合存在真实研发活动、研发人员、研发项目与归集能力的科技、制造、软件及创新型企业。",
    summary:
      "研发加计扣除的关键不是会做申报表，而是公司能否证明研发活动真实发生、费用归集准确、成果路径清晰。",
    logic: [
      "税法允许符合条件的研发费用在税前按更高比例扣除，从而降低应纳税所得额。",
      "它本质上是在鼓励企业投入创新，因此节税逻辑来自‘多确认合规研发投入’，不是把普通经营费用硬改名成研发。",
      "如果研发台账做得好，这类政策既能降税，也能反向提升融资和审计材料质量。",
    ],
    howItWorks: [
      "把研发项目立项、人员、工时、物料、外包、设备使用等形成项目制归集。",
      "区分研发费用和日常运营费用，避免混用。",
      "在预缴、汇算或相关申报节点按政策口径享受加计扣除。",
    ],
    qualification: [
      "要有真实研发活动与可识别项目。",
      "费用归集方法应稳定、可复核、可留痕。",
      "合同研发、委托研发、自主研发的处理口径需要分别判断。",
    ],
    documents: [
      "研发立项资料、项目计划、阶段成果、会议纪要。",
      "人员名单、工时记录、工资分摊依据、物料领用与测试记录。",
      "委外研发合同、发票、付款记录和成果交付资料。",
    ],
    risks: [
      "研发与产品迭代、售前定制、日常维护界限不清，导致归集口径被挑战。",
      "没有项目级台账，只在年底一次性按比例估算。",
      "研发外包没有真实成果验收，只有合同和发票。",
    ],
    boundaries: [
      "不能把普通销售、实施、运维或管理费用包装成研发费用。",
      "不能补造项目文件去倒推费用归集。",
      "没有研发实质的‘政策型命名’不能形成合法税收利益。",
    ],
    ceoPrompts: [
      "研发费用的归集规则是谁制定的，能否每月复核？",
      "哪些项目是真研发，哪些只是交付或维护？",
      "如果税局问成果和人员投入，团队能否拿出链路证据？",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "研发费用加计扣除政策执行指引（1.0版）",
        url: "https://www.chinatax.gov.cn/chinatax/n810341/n810755/c5179504/content.html",
        updatedAt: "2023-07-13",
      },
      {
        authority: "中国政府网",
        title: "国务院关于优化完善研发费用加计扣除政策的公告信息入口",
        url: "https://www.gov.cn/zhengce/zhengceku/2023-03/27/content_5748690.htm",
        updatedAt: "2023-03-27",
      },
    ],
  },
  {
    id: "cn-high-tech-rate",
    title: "中国：高新技术企业 15% 所得税率",
    region: "中国",
    taxType: "企业所得税",
    stage: "资格筹划",
    suitability: "适合研发投入稳定、知识产权清晰、技术收入占比高且愿意长期维护资格体系的企业。",
    summary:
      "高新技术企业税率优惠是长期制度型筹划，价值很大，但要求也高，不能只在申报年份冲刺材料。",
    logic: [
      "符合高新技术企业条件的主体可以适用较低企业所得税税率，从而显著影响利润留存和估值逻辑。",
      "它背后的逻辑是技术创新导向，因此真正决定成败的是研发、知识产权、收入结构、人员结构和内控是否匹配。",
      "对成长公司而言，这既是税务工程，也是组织能力工程。",
    ],
    howItWorks: [
      "从知识产权、研发组织、科技人员、研发费用占比和高新收入占比等维度准备资格。",
      "资格取得后，持续维护而不是一次性拿证。",
      "把研发、财务、法务和人事口径统一，否则年审与复核风险高。",
    ],
    qualification: [
      "需要满足高新技术企业认定规则中的多项实质性要求。",
      "知识产权归属、研发活动真实性和收入归类是常见难点。",
      "集团内研发成果和收入如果跨实体使用，需要提前设计归属与授权逻辑。",
    ],
    documents: [
      "知识产权证书、授权文件、研发项目资料、科技人员台账。",
      "收入分类底稿、研发费用辅助账、专项审计或鉴证材料。",
      "组织制度、成果转化资料和相关支持性证明。",
    ],
    risks: [
      "证书拿到了，但后续年度真实经营已不再匹配。",
      "研发和知识产权集中在别的主体，本公司只是开票平台。",
      "收入分类口径过于激进，导致高新收入占比站不住。",
    ],
    boundaries: [
      "不能借壳资格或将无研发实质的销售主体包装成高新企业。",
      "不能通过临时调人、临时做账或挂名知识产权制造资格。",
      "享受优惠应以真实技术能力和真实经营安排为前提。",
    ],
    ceoPrompts: [
      "这家公司享受 15% 税率的实质基础是什么？",
      "核心知识产权、研发人员和收入到底在哪个主体？",
      "如果接受融资或并购尽调，这套资格解释是否经得起穿透？",
    ],
    officialSources: [
      {
        authority: "中国政府网",
        title: "中华人民共和国企业所得税法",
        url: "https://www.gov.cn/zhengce/2007-03/19/content_2602200.htm?isappinstalled=0",
        updatedAt: "2007-03-19",
      },
      {
        authority: "科技部火炬中心",
        title: "高新技术企业认定管理工作网",
        url: "https://www.innocom.gov.cn/",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "cn-vat-input-management",
    title: "中国：进项税额管理与发票链路优化",
    region: "中国",
    taxType: "增值税",
    stage: "流程筹划",
    suitability: "适合采购金额较大、供应商分散、费用类发票多、税率结构复杂的企业。",
    summary:
      "很多中国公司的‘节税’并不是靠神奇结构，而是靠把采购、收票、认证、抵扣和合同口径管理好，减少本可避免的税负流失。",
    logic: [
      "增值税在一般纳税人场景下，本质是销项税减进项税。",
      "如果该取得的可抵扣进项发票没有取得，或者票货款不一致、用途不合规，税负就会直接变重。",
      "因此这是最典型的‘流程型税筹’：通过业务流程和单据质量优化税负，而不是通过虚构交易。",
    ],
    howItWorks: [
      "把采购准入、合同税率、收货验收、发票取得、票面校验和入账抵扣放在同一流程里。",
      "对不可抵扣项目和可抵扣项目做前置区分，避免事后争议。",
      "重点监控长期未收票、异常票、税率错配和红冲频繁的供应商。",
    ],
    qualification: [
      "通常适用于一般纳税人。",
      "需要真实采购、真实业务用途和完整票货款链条。",
      "要结合行业和成本结构判断哪些进项最值得重点管理。",
    ],
    documents: [
      "采购合同、入库/验收记录、发票、付款流水、对账单。",
      "供应商准入材料和税务信息。",
      "进项税额台账、异常票跟踪表和红字处理记录。",
    ],
    risks: [
      "采购部门只谈价格不谈税率和发票类型，导致含税成本判断失真。",
      "业务真实但留痕不全，抵扣时证据不足。",
      "为追求抵扣而接受不合规票源，反而引入更大风险。",
    ],
    boundaries: [
      "不能购买虚开发票、接受无真实交易支撑的票据。",
      "不能为了抵扣而改变业务实质或虚构采购。",
      "不能把个人消费、集体福利等依法不得抵扣的项目强行抵扣。",
    ],
    ceoPrompts: [
      "公司最大的进项税流失点在哪些采购类别？",
      "业务、采购、财务是否对含税与不含税成本有统一理解？",
      "异常票和长期未收票是否被当成经营问题处理，而不只是财务追票？",
    ],
    officialSources: [
      {
        authority: "国家税务总局纳税服务平台",
        title: "增值税及附加税费申报表（一般纳税人适用）",
        url: "https://12366.chinatax.gov.cn/bzds/009/009.html",
        updatedAt: "2026-05-13",
      },
      {
        authority: "国家税务总局",
        title: "“数电发票”12月起全国推行！一文了解它有哪些优点",
        url: "https://www.chinatax.gov.cn/chinatax/n810356/n3010387/c5236173/content.html",
        updatedAt: "2024-11-27",
      },
    ],
  },
  {
    id: "sg-startup-exemption",
    title: "新加坡：Start-Up Tax Exemption 与 Partial Tax Exemption",
    region: "新加坡",
    taxType: "Corporate Income Tax",
    stage: "资格筹划",
    suitability: "适合新设或利润仍在早期阶段的本地公司，尤其是创始团队希望保留更多税后现金时。",
    summary:
      "新加坡税筹最常见也最实用的一层，是先正确理解公司天然可适用的免税与部分免税框架，而不是一上来做复杂架构。",
    logic: [
      "新加坡法定企业所得税率为 17%，但合资格公司可通过 start-up tax exemption 或 partial tax exemption 在前几档应税收入上享受减免。",
      "节税逻辑来自制度内的利润分层减免，而不是隐藏利润。",
      "对早期公司来说，这种筹划最有价值的前提是 FYE、税务申报和利润归属清晰。",
    ],
    howItWorks: [
      "判断公司是否满足 start-up tax exemption 条件；若不满足，再看是否适用 partial tax exemption。",
      "在年度利润预测时把免税层级纳入现金流模型，而不是到 assessment 时才看结果。",
      "如果集团内有多实体，先评估利润和实质是否一致，再考虑主体分工。",
    ],
    qualification: [
      "是否为合资格新创公司要看股权、业务性质等法定条件。",
      "不同年度和不同实体的适用要分开判断。",
      "如果属于特定行业或持股结构不符，可能不能适用 start-up tax exemption。",
    ],
    documents: [
      "公司股权结构、设立文件、年度管理账和税务申报底稿。",
      "FYE、利润预测和董事会审批记录。",
      "如涉及集团安排，还需保留功能分工和商业理由说明。",
    ],
    risks: [
      "误把所有新公司都当成自动享受 start-up tax exemption。",
      "利润、成本和功能放错主体，导致税务结果与商业实质脱节。",
      "没有结合董事会和融资口径做利润规划，导致税负预测失真。",
    ],
    boundaries: [
      "不能设立无商业实质的壳公司去人为分散利润。",
      "不能让合同、人员、管理和收入确认长期与实际经营主体不一致。",
      "税务减免应建立在真实实体、真实经营和真实利润归属上。",
    ],
    ceoPrompts: [
      "我们适用的是 start-up exemption 还是 partial exemption，依据是什么？",
      "利润为什么留在这个实体，而不是别的集团公司？",
      "如果未来融资或重组，这种利润归属是否还能站得住？",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Corporate Income Tax Rates, Rebates and Tax Exemption Schemes",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/basics-of-corporate-income-tax/corporate-income-tax-rate-rebates-and-tax-exemption-schemes",
        updatedAt: "2026-02-12",
      },
    ],
  },
  {
    id: "sg-capital-allowances-losses",
    title: "新加坡：Capital Allowances、Loss Carry-Forward 与 Group Relief",
    region: "新加坡",
    taxType: "Corporate Income Tax",
    stage: "基础筹划",
    suitability: "适合有设备投入、前期亏损、或集团内多家本地公司盈利亏损不均的企业。",
    summary:
      "这类筹划属于标准合规型税务优化，重点是把资产投入、亏损利用和集团内税项转移规则按制度用好。",
    logic: [
      "资本性支出通常不能像普通费用那样一次性扣除，但可通过 capital allowances 在税务上逐步扣除。",
      "未利用的亏损、资本抵免和捐赠在满足条件时可结转或在集团内做 relief，从而减少整体税负。",
      "这不是创造税盾，而是更高效地使用法律已经允许的税盾。",
    ],
    howItWorks: [
      "识别哪些资产支出属于可申报 capital allowances 的设备器具等项目。",
      "跟踪未利用亏损和资本抵免，并检查 shareholding test 等条件。",
      "若存在新加坡集团结构，评估是否满足 group relief 条件以及会计年度一致性要求。",
    ],
    qualification: [
      "不同税项的结转和利用有各自条件。",
      "Group relief 只适用于符合条件的公司之间，并且通常需要同一会计年度。",
      "亏损利用常与持股连续性、业务延续性等规则相关。",
    ],
    documents: [
      "固定资产清单、采购合同、发票、启用日期记录。",
      "税务计算底稿、未利用项目台账、股权变动记录。",
      "集团结构图、会计年度信息和董事会批准材料。",
    ],
    risks: [
      "财务把所有设备投入都当普通费用处理，或反过来把不符合条件的资产计入 capital allowances。",
      "股权变动后仍沿用旧亏损计划，没有重新核查条件。",
      "集团内公司会计年度不一致，仍尝试做 group relief。",
    ],
    boundaries: [
      "不能通过空转资产或无商业意义交易制造 capital allowances。",
      "不能忽略 shareholding test 或资格条件，强行承接历史亏损。",
      "不能把 group relief 当作跨境或跨不合资格实体自由调利润的工具。",
    ],
    ceoPrompts: [
      "我们有哪些税务资产还没被用好？",
      "股权变化后，历史亏损还能不能用？",
      "集团内是否真的满足 group relief 的条件，而不是想当然？",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Unutilised Items (Capital Allowances, Trade Losses and Donations)",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/income-deductions-for-companies/unutilised-items-%28capital-allowances-trade-losses-donations%29",
        updatedAt: "2026-03-13",
      },
      {
        authority: "IRAS",
        title: "Group Relief",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/income-deductions-for-companies/claiming-reliefs/group-relief",
        updatedAt: "2026-02-20",
      },
    ],
  },
  {
    id: "sg-gst-timing",
    title: "新加坡：GST 注册时点与 Input Tax Recovery 规划",
    region: "新加坡",
    taxType: "GST",
    stage: "流程筹划",
    suitability: "适合接近强制注册门槛、供应链含税成本高、B2B 客户较多或计划主动注册的企业。",
    summary:
      "GST 筹划在新加坡最核心的不是寻找漏洞，而是管理注册时点、报价逻辑、input tax recovery 和合规成本之间的平衡。",
    logic: [
      "注册 GST 后，公司可以向客户收 GST，并在规则允许下回收 input tax，但也会承担 tax invoice、return、records 和 price display 义务。",
      "因此最优解取决于客户类型、供应商结构、现金流和系统能力，而不是单纯看税率。",
      "对 B2B 为主的公司，适当时点注册可能提升 input tax recovery；对 B2C 敏感行业，过早注册可能压缩价格竞争力。",
    ],
    howItWorks: [
      "持续监控 taxable turnover 和未来 12 个月预测。",
      "评估如果注册，客户是否能接受 GST 加价、公司是否具备开 tax invoice 和 filing 能力。",
      "在 voluntary registration 场景下，把回收 input tax 的好处与两年合规承诺等成本一起测算。",
    ],
    qualification: [
      "强制注册与自愿注册规则不同。",
      "不是所有进项税都可完全回收，要结合业务性质判断。",
      "必须确保系统、报价、合同和票据流程准备好再生效。",
    ],
    documents: [
      "销售额监控表、未来 12 个月预测、客户和供应商结构分析。",
      "报价模板、发票模板、ERP/POS 配置记录。",
      "GST 注册与内部流程审批文件。",
    ],
    risks: [
      "快达到门槛才临时处理，系统和合同没有同步改。",
      "为了回收 input tax 自愿注册，但客户结构并不支持，反而损害毛利。",
      "注册后 tax invoice 要素不全、record 不完整，形成合规风险。",
    ],
    boundaries: [
      "不能在未生效注册前向客户收取 GST。",
      "不能把不符合条件的 input tax 当成可回收税额。",
      "不能以虚构商业理由做 GST 注册或交易安排。",
    ],
    ceoPrompts: [
      "如果现在注册 GST，毛利、价格和现金流分别怎么变？",
      "客户是 B2B 还是 B2C，谁真正承担 GST 成本？",
      "团队是否已经具备 tax invoice 和 return 的执行能力？",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Factors to Consider Before Registering Voluntarily for GST",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/gst-registration-deregistration/factors-to-consider-before-registering-voluntarily-for-gst",
        updatedAt: "2026-03-31",
      },
      {
        authority: "IRAS",
        title: "Do I Need to Register for GST",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/gst-registration-deregistration/do-i-need-to-register-for-gst",
        updatedAt: "2026-01-26",
      },
    ],
  },
];

export const invoiceGuides: InvoiceGuide[] = [
  {
    id: "cn-vat-special-invoice",
    title: "中国：增值税专用发票",
    region: "中国",
    invoiceType: "专票",
    useCase: "主要用于一般纳税人之间的 B2B 交易，购买方在符合条件时可据此抵扣进项税额。",
    summary:
      "专票最重要的意义，不是它长得不同，而是它同时承载交易留痕、税额列示和潜在抵扣资格。",
    legalMeaning: [
      "它是增值税链条中最关键的票据类型之一。",
      "票面通常会列示不含税金额、税率/征收率和税额，便于购买方判断抵扣。",
      "不是拿到专票就当然可抵扣，仍要看业务真实性、用途和抵扣规则。",
    ],
    mustContain: [
      "销售方和购买方识别信息。",
      "货物或服务名称、数量、金额、税率/征收率、税额。",
      "开票日期、发票号码及系统生成信息。",
    ],
    taxRates: [
      "中国增值税常见税率结构包括 13%、9%、6% 和 0%，具体取决于货物或服务类型。",
      "部分情形适用征收率而不是税率，不能混用。",
      "票面税率必须与实际业务适用口径一致，不能为满足客户要求随意变更。",
    ],
    deductibleImpact: [
      "对一般纳税人购买方而言，专票在符合条件时是最常见的进项税额抵扣凭证之一。",
      "如果业务用于不得抵扣项目，即使拿到专票也不能当然抵扣。",
      "票货款不一致、异常票、红冲链条混乱都会影响抵扣安全性。",
    ],
    workflow: [
      "签约时先确认含税/不含税口径和税率。",
      "交付、验收、开票、付款、入账和抵扣要能串成一条链。",
      "对大额采购建立专票收取与异常处理台账。",
    ],
    riskFlags: [
      "客户临时要求改税率或改品名。",
      "票面信息和合同、物流、验收、付款记录对不上。",
      "把专票当成‘有票就安全’而忽略真实业务和用途限制。",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "增值税发票综合服务平台等事项说明入口",
        url: "https://inv-veri.chinatax.gov.cn/",
        updatedAt: "2026-05-13",
      },
      {
        authority: "国家税务总局纳税服务平台",
        title: "增值税及附加税费申报表（一般纳税人适用）",
        url: "https://12366.chinatax.gov.cn/bzds/009/009.html",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "cn-vat-ordinary-invoice",
    title: "中国：增值税普通发票与电子普通发票",
    region: "中国",
    invoiceType: "普票",
    useCase: "常见于零售、生活服务、部分 B2B 场景或不需要取得专票抵扣的交易。",
    summary:
      "普票的核心作用是证明交易和入账，但它通常不承担与专票相同的进项抵扣功能。",
    legalMeaning: [
      "普通发票同样是合法有效的交易与入账凭证。",
      "纸质与电子形式在合规使用上应结合政策理解，电子发票强调数字化归档与流转。",
      "对很多小企业和费用类场景，普票是最常见票据。",
    ],
    mustContain: [
      "开票方信息、购买方信息（视场景而定）、开票日期和发票号码。",
      "项目名称、金额及相关税收要素。",
      "电子发票还应保留其原始电子载体和归档链路。",
    ],
    taxRates: [
      "票面可能反映适用税率或征收率，不能只看票种判断税负。",
      "若销售方为小规模纳税人，还要结合小规模适用规则看征收率和优惠。",
      "普票开具并不等于购买方当然可做进项抵扣。",
    ],
    deductibleImpact: [
      "在多数增值税抵扣场景下，普通发票通常不具备与专票相同的抵扣功能。",
      "但它仍可能是企业所得税税前扣除、成本费用入账的重要凭证之一。",
      "是否能税前扣除，还要看真实性、相关性和凭证完整性。",
    ],
    workflow: [
      "先判断业务是否需要专票还是普票。",
      "对费用类场景同步检查公司报销制度、入账要求和税前扣除留痕。",
      "电子普票要做好下载、验真和归档，不要只截屏保存。",
    ],
    riskFlags: [
      "业务方误以为‘只要有普票就都能抵税’。",
      "电子普票只保留打印件，没有原始电子档。",
      "票据品名笼统、与实际费用性质不匹配。",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "“数电发票”12月起全国推行！一文了解它有哪些优点",
        url: "https://www.chinatax.gov.cn/chinatax/n810356/n3010387/c5236173/content.html",
        updatedAt: "2024-11-27",
      },
    ],
  },
  {
    id: "cn-digital-e-invoice",
    title: "中国：全面数字化电子发票（数电发票）",
    region: "中国",
    invoiceType: "数电发票",
    useCase: "适用于电子化开票、交付、归档与查验，正逐步成为中国发票管理的主流形态。",
    summary:
      "数电发票不只是‘电子版发票’，它意味着发票从开具、交付、入账到归档的整条链都进入更实时、更可穿透的状态。",
    legalMeaning: [
      "由税务系统统一赋码、数字化流转，是发票管理数字化的重要形态。",
      "它强化了系统留痕、查验便利性和全流程数据联动。",
      "对企业而言，数电发票是流程能力问题，不只是打印样式变化。",
    ],
    mustContain: [
      "税务系统要求的基础交易信息与税收信息。",
      "可用于交付、查验和归档的电子数据形态。",
      "企业内部需能保存原始电子文件和流转记录。",
    ],
    taxRates: [
      "税率并不因为‘数电’而变化，仍取决于基础交易适用的增值税规则。",
      "数电发票可能覆盖普通发票、专用发票等不同功能场景。",
      "判断税负时要回到业务实质，而不是票面呈现形式。",
    ],
    deductibleImpact: [
      "如果属于可抵扣票据类型，仍要按真实业务和抵扣条件判断。",
      "数电形态提升了校验和留痕效率，但不降低合规要求。",
      "企业归档不规范，仍会影响后续审计、税务检查和内部控制。",
    ],
    workflow: [
      "打通销售系统、财务系统和电子归档流程。",
      "明确谁负责下载、归档、校验、对账和异常处理。",
      "教育业务团队区分‘开票完成’与‘收入确认完成’、‘回款完成’并非同一概念。",
    ],
    riskFlags: [
      "认为电子化后可以弱化审批和凭证管理。",
      "企业只保留截图或纸质打印件，没有电子原件。",
      "红冲、作废、重开链路缺少版本管理。",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "“数电发票”12月起全国推行！一文了解它有哪些优点",
        url: "https://www.chinatax.gov.cn/chinatax/n810356/n3010387/c5236173/content.html",
        updatedAt: "2024-11-27",
      },
    ],
  },
  {
    id: "cn-red-invoice",
    title: "中国：红字发票与红冲",
    region: "中国",
    invoiceType: "红字发票",
    useCase: "用于销售退回、开票有误、服务中止等需冲减原发票金额或税额的场景。",
    summary:
      "红字发票不是纠错按钮，而是对原交易或原开票错误进行有依据调整的正式税务动作。",
    legalMeaning: [
      "它用于冲减原蓝字发票对应的金额、税额或交易记录。",
      "红冲会影响销售方销项、购买方进项以及账务记录。",
      "频繁红冲往往意味着合同、交付、开票或审批流程本身有问题。",
    ],
    mustContain: [
      "与原蓝字发票关联的信息。",
      "冲减原因、金额及税额等必要信息。",
      "内部审批与留痕记录，确保为什么冲、谁批准、影响什么都清楚。",
    ],
    taxRates: [
      "红字发票所反映的税率通常应与原始交易适用规则一致。",
      "不能借红冲去变相改税率、改收入性质或重塑交易实质。",
      "红冲后重新开票时，必须重新核对合同与业务条件。",
    ],
    deductibleImpact: [
      "购买方若已做进项处理，红冲后应同步评估进项转出或调整。",
      "销售方销项和收入记录也要配套调整。",
      "如果税务、账务和业务三边不同步，最容易留下异常痕迹。",
    ],
    workflow: [
      "先判断是退货、折让、作废还是开票错误。",
      "确认原票状态、对方处理状态和后续是否重开。",
      "同步调整账务、税务申报和客户沟通记录。",
    ],
    riskFlags: [
      "月末或季末集中大量红冲。",
      "红冲原因写不清，审批链缺失。",
      "业务把红冲当成调收入或调税负的工具。",
    ],
    officialSources: [
      {
        authority: "国家税务总局",
        title: "全面数字化电子发票红字发票试点相关问答入口",
        url: "https://www.chinatax.gov.cn/",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "sg-tax-invoice",
    title: "新加坡：GST Tax Invoice",
    region: "新加坡",
    invoiceType: "Tax Invoice",
    useCase: "GST registered business 向客户开具标准应税交易发票时使用。",
    summary:
      "Tax invoice 的核心不是‘收据’，而是 GST 注册企业证明已就应税供应正确列示 GST 的正式文件。",
    legalMeaning: [
      "它是 GST registered business 在标准应税供应场景下的关键票据。",
      "客户如需按规则申索 input tax，通常要依赖合规 tax invoice。",
      "票据要素不全，可能影响对方申索，也会暴露自身合规问题。",
    ],
    mustContain: [
      "供应商名称、地址、GST registration number。",
      "Invoice date、发票编号、客户信息、货物或服务描述。",
      "应税金额、GST 金额、总金额，以及适用时的说明信息。",
    ],
    taxRates: [
      "新加坡当前 GST 标准税率为 9%。",
      "还要区分 standard-rated、zero-rated 和 exempt supplies，不能一概按 9% 理解。",
      "票据呈现方式必须与实际供应性质一致。",
    ],
    deductibleImpact: [
      "对 GST registered 购买方而言，tax invoice 通常是 input tax claim 的关键凭证之一。",
      "没有合规 tax invoice，客户可能无法顺利申索 input tax。",
      "但是否能申索，仍要看支出用途和 GST 规则。",
    ],
    workflow: [
      "先确认公司已 GST 注册且供应性质为应税供应。",
      "开票模板应固化 GST 编号、税额显示方式和编号规则。",
      "与报价、合同、ERP 和 GST return 口径保持一致。",
    ],
    riskFlags: [
      "未 GST 注册却向客户出具带 GST 的发票。",
      "模板缺 GST 编号或税额列示。",
      "把 zero-rated、exempt 和 standard-rated 混用。",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Invoicing Customers",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers",
        updatedAt: "2026-02-10",
      },
    ],
  },
  {
    id: "sg-simplified-tax-invoice",
    title: "新加坡：Simplified Tax Invoice",
    region: "新加坡",
    invoiceType: "Simplified Tax Invoice",
    useCase: "金额较小等允许简化信息展示的零售或简化交易场景。",
    summary:
      "简化税票不是随便简化，而是在 IRAS 允许的范围内减少展示要素，但仍需满足基本税务识别要求。",
    legalMeaning: [
      "它是 tax invoice 的简化版本，适用于特定条件下的较小金额交易等场景。",
      "虽然信息较少，但仍是 GST 体系内正式票据。",
      "业务规模扩大后，仍要判断是否继续满足简化条件。",
    ],
    mustContain: [
      "供应商名称、地址、GST registration number。",
      "开票日期、货物或服务描述。",
      "总应付金额含 GST，或足以识别 GST 处理的信息。",
    ],
    taxRates: [
      "适用税率仍由基础交易决定，标准税率情形下当前 GST 为 9%。",
      "不能因为使用 simplified invoice 就忽略供应性质判断。",
      "金额门槛和展示规则要以 IRAS 当前要求为准。",
    ],
    deductibleImpact: [
      "某些客户在申索 input tax 时仍会关注票据是否满足申索要求。",
      "B2B 场景下，如果客户有完整申索需求，往往更适合标准 tax invoice。",
      "因此票据设计要结合客户类型，而不是只图方便。",
    ],
    workflow: [
      "先判断交易场景是否适用 simplified invoice。",
      "在 POS 或收银系统中固化票据字段。",
      "定期复核是否仍符合简化条件与客户需求。",
    ],
    riskFlags: [
      "把所有发票都简化处理。",
      "金额超出适用范围仍使用 simplified invoice。",
      "客户需要 input tax claim 却拿不到足够信息。",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Invoicing Customers",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers",
        updatedAt: "2026-02-10",
      },
    ],
  },
  {
    id: "sg-credit-note",
    title: "新加坡：Credit Note",
    region: "新加坡",
    invoiceType: "Credit Note",
    useCase: "用于退货、折让、价格调整或纠正原发票金额时的负向调整凭证。",
    summary:
      "Credit note 在新加坡 GST 体系里承担的角色，类似于对既有应税交易进行正式负向修正，不能把它当成普通内部备忘录。",
    legalMeaning: [
      "用于减少原先已开具发票对应的金额或 GST。",
      "它影响销售记录、客户应付和 GST 处理。",
      "如果企业频繁开 credit note，往往说明销售和计费流程需要重新审视。",
    ],
    mustContain: [
      "与原发票关联的信息。",
      "credit note 编号、日期、客户信息和调整原因。",
      "减少的金额、相应 GST 影响及其他必要识别信息。",
    ],
    taxRates: [
      "调整税率逻辑应与原交易供应性质一致。",
      "不能借 credit note 去改变原交易的真实税务属性。",
      "涉及跨期调整时，要同步考虑 GST return 的处理影响。",
    ],
    deductibleImpact: [
      "如果客户曾据原 tax invoice 申索 input tax，credit note 可能触发对应调整。",
      "销售方也要同步调整 output tax。",
      "税务和 AR/AP 台账需要同步更新。",
    ],
    workflow: [
      "确认调整原因和原票信息。",
      "出具 credit note 并通知客户，必要时配套重开发票。",
      "把调整同步反映到 GST return 和财务记录。",
    ],
    riskFlags: [
      "大量期末 credit note 用来平滑收入。",
      "找不到原发票或调整原因。",
      "财务系统、客户台账和 GST 处理不同步。",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Invoicing Customers",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers",
        updatedAt: "2026-02-10",
      },
    ],
  },
];

export const taxRateCards: TaxRateCard[] = [
  {
    id: "cn-vat-rates",
    region: "中国",
    title: "中国常见增值税税率与征收率观察卡",
    scope: "用于帮助 CEO 先建立税率地图，具体适用必须回到真实业务类型、纳税人身份和当期政策。",
    rates: [
      "常见税率结构包括 13%、9%、6% 和 0%。",
      "部分交易适用征收率而非税率，小规模纳税人场景尤其要单独判断。",
      "出口、现代服务、租赁、货物销售等业务口径不同，不能只凭行业直觉判断。",
    ],
    notes: [
      "税率并不决定收入确认时点，也不自动决定企业所得税处理。",
      "票种、税率、业务品名和合同条款必须一致。",
      "对中国公司而言，含税报价和不含税毛利必须同步管理。",
    ],
    officialSources: [
      {
        authority: "国家税务总局纳税服务平台",
        title: "增值税及附加税费申报表（一般纳税人适用）",
        url: "https://12366.chinatax.gov.cn/bzds/009/009.html",
        updatedAt: "2026-05-13",
      },
    ],
  },
  {
    id: "cn-cit-rates",
    region: "中国",
    title: "中国企业所得税常见税率与优惠口径观察卡",
    scope: "用于理解法定税率与优惠税率不是一回事，实际税负往往受资格与优惠叠加影响。",
    rates: [
      "一般法定企业所得税税率通常为 25%。",
      "符合条件的高新技术企业可适用 15% 税率。",
      "符合条件的小型微利企业可能通过优惠计算方式形成更低实际税负。",
    ],
    notes: [
      "不能把优惠税率当作默认税率使用。",
      "资格失效、口径变化或证据不足都会改变最终税负。",
      "CEO 应关注的是‘实际税负为什么是这个数’，而不是只记住一个百分比。",
    ],
    officialSources: [
      {
        authority: "中国政府网",
        title: "中华人民共和国企业所得税法",
        url: "https://www.gov.cn/zhengce/2007-03/19/content_2602200.htm?isappinstalled=0",
        updatedAt: "2007-03-19",
      },
    ],
  },
  {
    id: "sg-gst-rates",
    region: "新加坡",
    title: "新加坡 GST 速览卡",
    scope: "用于理解 GST 税率与供应性质的关系，帮助判断报价、开票和 input tax recovery。",
    rates: [
      "当前新加坡标准 GST 税率为 9%。",
      "除 standard-rated supplies 外，还存在 zero-rated supplies 和 exempt supplies。",
      "是否可回收 input tax，不能只看是否有 GST，还要看用途和规则。",
    ],
    notes: [
      "GST 是交易税，不等同于公司利润税。",
      "GST 注册时点会改变开票和价格展示义务。",
      "B2B 与 B2C 模式下，GST 对毛利和客户感知的影响不同。",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Invoicing Customers",
        url: "https://www.iras.gov.sg/taxes/goods-services-tax-%28gst%29/basics-of-gst/invoicing-price-display-and-record-keeping/invoicing-customers",
        updatedAt: "2026-02-10",
      },
    ],
  },
  {
    id: "sg-cit-rates",
    region: "新加坡",
    title: "新加坡 Corporate Income Tax 速览卡",
    scope: "用于帮助 CEO 区分法定税率、初创免税和部分免税三层概念。",
    rates: [
      "新加坡法定企业所得税税率为 17%。",
      "合资格公司可适用 start-up tax exemption 或 partial tax exemption。",
      "实际税负还会受到 capital allowances、losses、group relief 等规则影响。",
    ],
    notes: [
      "17% 不是所有公司都直接按此比例缴税。",
      "税务结果要和实体实质、利润归属和年度申报一起看。",
      "越早把税负模型接入预算，管理层越不容易误判可分配现金。",
    ],
    officialSources: [
      {
        authority: "IRAS",
        title: "Corporate Income Tax Rates, Rebates and Tax Exemption Schemes",
        url: "https://www.iras.gov.sg/taxes/corporate-income-tax/basics-of-corporate-income-tax/corporate-income-tax-rate-rebates-and-tax-exemption-schemes",
        updatedAt: "2026-02-12",
      },
    ],
  },
];
