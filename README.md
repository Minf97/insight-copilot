# Insight Copilot

Insight Copilot is a portfolio project for commerce analytics: ask a business question in plain language, resolve it against a semantic metric layer, generate guarded SQL, and explain the drivers behind the result.

The current version is a self-contained interaction demo. It does not pretend to connect to Shopify or an LLM: the sample answers are deterministic so the product flow can be reviewed without credentials. The screen exposes the production shape of the system:

1. question interpretation
2. metric resolution
3. read-only SQL guardrails
4. warehouse query
5. attribution explanation

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm test
npm run typecheck
npm run build
```

## Planned production layers

- Python ETL writes ODS / DWD / DWS / ADS tables idempotently.
- A YAML semantic layer owns metric definitions and SQL templates.
- Retrieval selects metrics and dimensions before generation.
- A read-only database role, SELECT allowlist, forced LIMIT and timeout protect execution.
- A 60-question evaluation set measures execution accuracy, result consistency and attribution quality.
