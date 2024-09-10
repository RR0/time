import { describe, test } from "node:test"
import assert from "node:assert"
import Level1Timeshift from "./Level1Timeshift.mjs"

describe("Level1Timeshift", () => {

  test("UTC", () => {
    const timeshift = Level1Timeshift.fromString("Z")
    assert.equal(timeshift.value, 0)
  })

  test("positive hour", () => {
    const timeshift = Level1Timeshift.fromString("+05")
    assert.equal(timeshift.value, 5 * 60)
  })

  test("negative hour", () => {
    const timeshift = Level1Timeshift.fromString("-05")
    assert.equal(timeshift.value, -5 * 60)
  })

  test("positive hour and minutes", () => {
    const timeshift = Level1Timeshift.fromString("+05:30")
    assert.equal(timeshift.value, 5 * 60 + 30)
  })

  test("negative hour and minutes", () => {
    const timeshift = Level1Timeshift.fromString("-05:30")
    assert.equal(timeshift.value, -5 * 60 + 30)
  })
})
