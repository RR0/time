import { describe, test } from "node:test"
import assert from "node:assert"

import { MinMaxValidator } from "./MinMaxValidator.mjs"

describe("MinMaxValidator", () => {
  const validator= new MinMaxValidator("field", 1, 100)

  test("valid", () => {
    assert.equal(validator.validate(50), true)
  })

  test("too low", () => {
    assert.throws(() => validator.validate(-1), { message: "field value must be >= 1 and <= 100, but was -1" })
  })

  test("too high", () => {
    assert.throws(() => validator.validate(101), { message: "field value must be >= 1 and <= 100, but was 101" })
  })
})
