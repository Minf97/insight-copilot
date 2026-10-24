"use client"

import { useState } from "react"
import { answerQuestion, defaultResult, examples, type QueryResult } from "@/lib/demo-data"

const stages = ["Interpret question", "Resolve metric", "Guard SQL", "Run query", "Explain drivers"]

export function Copilot() {
  const [question, setQuestion] = useState(defaultResult.question)
  const [result, setResult] = useState<QueryResult>(defaultResult)
  const [running, setRunning] = useState(false)
  const [activeStage, setActiveStage] = useState(4)

  function runQuery(nextQuestion = question) {
    setQuestion(nextQuestion)
    setRunning(true)
    setActiveStage(0)
    window.setTimeout(() => setActiveStage(1), 260)
    window.setTimeout(() => setActiveStage(2), 520)
    window.setTimeout(() => setActiveStage(3), 780)
    window.setTimeout(() => { setResult(answerQuestion(nextQuestion)); setActiveStage(4); setRunning(false) }, 1120)
  }

  return <main className="shell">
    <header className="topbar"><a className="wordmark" href="/">INSIGHT<span>/</span>COPILOT</a><div className="top-meta"><span className="status-dot" />Connected to demo warehouse <button className="ghost-button" type="button">Docs ↗</button></div></header>
    <div className="layout">
      <aside className="sidebar">
        <div className="side-label">Workspace</div>
        <button className="side-item active" type="button"><span>◒</span>Ask data</button>
        <button className="side-item" type="button"><span>⌁</span>Saved views</button>
        <button className="side-item" type="button"><span>◌</span>Metric catalog</button>
        <div className="side-spacer" />
        <div className="side-label">Semantic layer</div>
        <div className="schema"><span className="schema-mark">YAML</span><div><strong>18 metrics</strong><small>v1.4 · synced 2m ago</small></div></div>
        <div className="schema"><span className="schema-mark green">DB</span><div><strong>Shopify events</strong><small>4.8m rows · read only</small></div></div>
        <div className="profile"><span className="avatar">M</span><div><strong>Minf</strong><small>Owner</small></div><span>···</span></div>
      </aside>
      <section className="content">
        <div className="intro"><div><p className="eyebrow">COMMERCE ANALYTICS / 01</p><h1>Ask a question.<br /><em>Find the reason.</em></h1><p className="lede">A metric-aware copilot for ecommerce teams. It turns natural language into governed SQL, then traces the change back to its drivers.</p></div><div className="intro-note"><span>Built for the gap</span><strong>between a dashboard<br />and a decision.</strong></div></div>
        <div className="query-card"><div className="query-head"><span className="query-icon">⌕</span><span className="query-caption">Ask your data</span><span className="shortcut">⌘ ↵</span></div><textarea value={question} onChange={event => setQuestion(event.target.value)} onKeyDown={event => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") runQuery() }} /><div className="query-foot"><span>Powered by your semantic layer</span><button className="run-button" type="button" onClick={() => runQuery()} disabled={running}>{running ? "Running…" : "Run analysis  →"}</button></div></div>
        <div className="suggestions"><span>Try asking</span>{examples.map(item => <button key={item} type="button" onClick={() => runQuery(item)}>{item}</button>)}</div>
        <div className="workspace-grid">
          <div className="trace-panel"><div className="panel-heading"><div><p className="eyebrow">RUN TRACE</p><h2>From question to answer</h2></div><span className="run-time">{running ? "working" : "1.12s"}</span></div><div className="trace-line">{stages.map((stage, index) => <div className={`trace-stage ${index <= activeStage ? "done" : ""} ${index === activeStage && running ? "current" : ""}`} key={stage}><span className="stage-index">{index < activeStage || (!running && index <= activeStage) ? "✓" : String(index + 1).padStart(2, "0")}</span><div><strong>{stage}</strong><small>{index === 0 ? "Intent + time range" : index === 1 ? "YAML metric: paid_conversion" : index === 2 ? "Read-only · LIMIT 20" : index === 3 ? "dws_daily_channel_metrics" : "3 contributing drivers"}</small></div></div>)}</div></div>
          <div className="answer-panel"><div className="panel-heading"><div><p className="eyebrow">ANSWER / {result.metric.toUpperCase()}</p><h2>{result.value} <span className={result.direction}>{result.delta}</span></h2></div><button className="icon-button" type="button" aria-label="Save view">＋</button></div><p className="answer-copy">{result.explanation}</p><div className="drivers">{result.drivers.map(driver => <div className="driver" key={driver.label}><div><span>{driver.label}</span><strong>{driver.value}</strong></div><div className="bar"><i className={driver.tone} style={{ width: `${driver.width}%` }} /></div></div>)}</div><div className="answer-footer"><span>Compared with previous period</span><button type="button">View in explorer ↗</button></div></div>
        </div>
        <div className="lower-grid"><div className="sql-panel"><div className="panel-heading"><div><p className="eyebrow">GENERATED SQL</p><h2>Auditable by default</h2></div><button className="copy-button" type="button">Copy</button></div><pre><code>{result.sql}</code></pre></div><div className="model-panel"><p className="eyebrow">MODEL CONTRACT</p><h2>Why this answer is safe</h2><ul><li><b>01</b><span>Metric definition resolved from the semantic layer.</span></li><li><b>02</b><span>Read-only query with an enforced row limit.</span></li><li><b>03</b><span>Every claim maps back to an event or metric.</span></li></ul></div></div>
        <footer className="footer"><span>Insight Copilot · A portfolio project by Minf</span><span>NL2SQL / attribution / evaluation</span></footer>
      </section>
    </div>
  </main>
}
