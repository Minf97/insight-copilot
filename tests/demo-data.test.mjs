import test from "node:test"
import assert from "node:assert/strict"
import { answerQuestion, defaultResult } from "../lib/demo-data.ts"

test("default answer includes governed SQL and attribution drivers", () => {
  assert.equal(defaultResult.metric, "Paid conversion")
  assert.match(defaultResult.sql, /LIMIT 20/)
  assert.equal(defaultResult.drivers.length, 3)
})

test("question routing returns the relevant commerce metric", () => {
  assert.equal(answerQuestion("Compare AOV by channel").metric, "Average order value")
  assert.equal(answerQuestion("Which category drove revenue?").metric, "Revenue contribution")
})
