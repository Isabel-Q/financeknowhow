use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
struct AiMessage {
    role: String,
    content: String,
}

#[derive(Debug, Deserialize)]
struct AskAiRequest {
    api_key: String,
    model: String,
    system_prompt: String,
    messages: Vec<AiMessage>,
}

#[derive(Debug, Serialize)]
struct AskAiResponse {
    answer: String,
}

#[derive(Debug, Deserialize)]
struct OpenAiResponse {
    output_text: Option<String>,
    output: Option<Vec<OpenAiOutputItem>>,
}

#[derive(Debug, Deserialize)]
struct OpenAiOutputItem {
    content: Option<Vec<OpenAiContentItem>>,
}

#[derive(Debug, Deserialize)]
struct OpenAiContentItem {
    text: Option<String>,
}

#[tauri::command]
async fn ask_ai(request: AskAiRequest) -> Result<AskAiResponse, String> {
    if request.api_key.trim().is_empty() {
        return Err("请先在设置里填写 OpenAI API Key。".into());
    }

    if request.messages.is_empty() {
        return Err("请输入你想问的问题。".into());
    }

    let input: Vec<serde_json::Value> = request
        .messages
        .iter()
        .map(|message| {
            serde_json::json!({
                "role": message.role,
                "content": message.content,
            })
        })
        .collect();

    let payload = serde_json::json!({
        "model": request.model,
        "instructions": request.system_prompt,
        "input": input,
    });

    let client = reqwest::Client::new();
    let response = client
        .post("https://api.openai.com/v1/responses")
        .bearer_auth(request.api_key.trim())
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("无法连接 OpenAI API：{error}"))?;

    let status = response.status();
    let body = response
        .text()
        .await
        .map_err(|error| format!("读取 AI 响应失败：{error}"))?;

    if !status.is_success() {
        return Err(format!("OpenAI API 返回错误 {status}：{body}"));
    }

    let parsed: OpenAiResponse =
        serde_json::from_str(&body).map_err(|error| format!("解析 AI 响应失败：{error}"))?;
    let answer = parsed
        .output_text
        .or_else(|| {
            parsed.output.map(|items| {
                items
                    .into_iter()
                    .flat_map(|item| item.content.unwrap_or_default())
                    .filter_map(|content| content.text)
                    .collect::<Vec<_>>()
                    .join("\n")
            })
        })
        .filter(|text| !text.trim().is_empty())
        .ok_or_else(|| "AI 没有返回可显示的文本。".to_string())?;

    Ok(AskAiResponse { answer })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![ask_ai])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
