import { describe, test } from "node:test"
import assert from "node:assert"

import MinMaxValidator from "./MinMaxValidator.mjs"

describe("MinMaxValidator", () => {

  test("valid", () => {
    const validator = new MinMaxValidator("field", 1, 100)
    assert.equal(validator.validate(50), true)
  })

  test("too low", () => {
    try {
      const validator = new MinMaxValidator("field", 1, 100)
      validator.validate(-1)
      assert.fail("Should not validate value below minimum")
    } catch (e) {
      assert.equal(e.message, "field value must be >= 1 and <= 100")
    }
  })

  test("too hight", () => {
    try {
      const validator = new MinMaxValidator("field", 1, 100)
      validator.validate(101)
      assert.fail("Should not validate value above maximum")
    } catch (e) {
      assert.equal(e.message, "field value must be >= 1 and <= 100")
    }
  })
})
