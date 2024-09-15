import { describe, test } from "node:test"
import assert from "node:assert"
import { Level0Timeshift } from "./Level0Timeshift.mjs"

describe("Level0Timeshift", () => {

  test("Timezones", () => {
    const utc = Level0Timeshift.fromString("Z")
    assert.equal(utc.value, 0)
    const edt = Level0Timeshift.fromString("EDT")
    assert.equal(edt.value, -4 * 60)
    const cet = Level0Timeshift.fromString("CET")
    assert.equal(cet.value, +1 * 60)
  })

  test("toString", () => {
    assert.equal(new Level0Timeshift(0).toString(), "Z")
    assert.equal(new Level0Timeshift(44).toString(), "+00:44")
    assert.equal(new Level0Timeshift(-44).toString(), "-00:44")
    assert.equal(new Level0Timeshift(120).toString(), "+02")
    assert.equal(new Level0Timeshift(-120).toString(), "-02")
    assert.equal(new Level0Timeshift(130).toString(), "+02:10")
    assert.equal(new Level0Timeshift(-130).toString(), "-02:10")
  })

  test("positive hour", () => {
    const timeshift = Level0Timeshift.fromString("+05")
    assert.equal(timeshift.value, 5 * 60)
  })

  test("negative hour", () => {
    const timeshift = Level0Timeshift.fromString("-05")
    assert.equal(timeshift.value, -5 * 60)
  })

  test("positive hour and minutes", () => {
    const timeshift = Level0Timeshift.fromString("+05:30")
    assert.equal(timeshift.value, 5 * 60 + 30)
    const timeshift2 = Level0Timeshift.fromString("+0530")
    assert.equal(timeshift2.value, 5 * 60 + 30)
  })

  test("negative hour and minutes", () => {
    const timeshift = Level0Timeshift.fromString("-05:30")
    assert.equal(timeshift.value, -5 * 60 + 30)
    const timeshift2 = Level0Timeshift.fromString("-0530")
    assert.equal(timeshift2.value, -5 * 60 + 30)
  })
})
