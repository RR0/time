import { describe, test } from "node:test"
import assert from "node:assert"

import { RegExpFormat } from "./RegExpFormat.mjs"

describe("RegExpUtil", () => {

  test("groupName", () => {
    assert.equal(RegExpFormat.groupName("some", "word"), "someWord")
  })
})
