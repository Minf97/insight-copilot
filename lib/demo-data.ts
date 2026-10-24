export type QueryResult = {
  question: string
  metric: string
  value: string
  delta: string
  direction: "up" | "down"
  sql: string
  explanation: string
  drivers: { label: string; value: string; width: number; tone: "accent" | "muted" }[]
}

export const examples = [
  "Why did paid conversion drop last week?",
  "Compare AOV by channel for the last 30 days",
  "Which category contributed most to the revenue change?",
]

export const defaultResult: QueryResult = {
  question: examples[0], metric: "Paid conversion", value: "3.84%", delta: "−0.62 pp", direction: "down",
  sql: "SELECT channel,\n  SUM(paid_orders) / NULLIF(SUM(checkouts), 0) AS conversion\nFROM dws_daily_channel_metrics\nWHERE event_date BETWEEN '2026-09-01' AND '2026-09-07'\nGROUP BY channel\nORDER BY conversion ASC\nLIMIT 20;",
  explanation: "Conversion fell mainly in Paid Social. The drop is concentrated in mobile checkout sessions, while Email and Organic stayed within their normal range.",
  drivers: [{ label: "Paid Social", value: "−1.34 pp", width: 82, tone: "accent" }, { label: "Mobile checkout", value: "−0.91 pp", width: 58, tone: "muted" }, { label: "Email", value: "+0.18 pp", width: 18, tone: "muted" }],
}

export function answerQuestion(question: string): QueryResult {
  const lower = question.toLowerCase()
  if (lower.includes("aov") || lower.includes("average order")) return { ...defaultResult, question, metric: "Average order value", value: "$86.40", delta: "+$8.10", direction: "up", explanation: "AOV is highest in Email, driven by larger bundles and a higher share of returning customers.", drivers: [{ label: "Email", value: "+$14.20", width: 86, tone: "accent" }, { label: "Organic", value: "+$5.80", width: 43, tone: "muted" }, { label: "Paid Social", value: "−$2.10", width: 15, tone: "muted" }] }
  if (lower.includes("category") || lower.includes("revenue")) return { ...defaultResult, question, metric: "Revenue contribution", value: "$42.8k", delta: "+12.6%", direction: "up", explanation: "Skincare contributed most of the change. Its returning-customer mix improved while paid traffic remained flat.", drivers: [{ label: "Skincare", value: "+$18.4k", width: 88, tone: "accent" }, { label: "Body care", value: "+$9.2k", width: 54, tone: "muted" }, { label: "Supplements", value: "−$3.1k", width: 20, tone: "muted" }] }
  return { ...defaultResult, question }
}
