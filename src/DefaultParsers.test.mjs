import { describe, test } from "node:test"
import assert from "node:assert"
import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { DefaultParsers } from "./DefaultParsers.mjs"
import { Level2Duration } from "./level2/duration/index.mjs"
import { Level2DurationParser } from "./level2/duration/Level2DurationParser.mjs"
import { EDTFError } from "./EDTFError.mjs"

/**
 * Runs some code in a fresh process, where no default parser was installed (the test runner preloads them).
 *
 * @param {string} code
 * @return {string} What the code printed.
 */
function runLean(code) {
  const src = new URL(".", import.meta.url)
  const core = fileURLToPath(new URL("core.mjs", src))
  const parsers = fileURLToPath(new URL("parsers.mjs", src))
  return execFileSync(process.execPath, ["--input-type=module", "-e", `
    import * as core from ${JSON.stringify(core)}
    import * as parsers from ${JSON.stringify(parsers)}
    ${code}
  `], { encoding: "utf8" }).trim()
}

describe("DefaultParsers", () => {

  test("get() throws a helpful error for an unregistered class", () => {
    class Unregistered {
    }

    assert.throws(() => DefaultParsers.get(Unregistered), error => error instanceof EDTFError && error.message.includes("@rr0/time/defaults"))
  })

  test("register() replaces the parser used by fromString()", () => {
    const original = DefaultParsers.get(Level2Duration)
    try {
      let created = 0
      DefaultParsers.register(Level2Duration, () => {
        created++
        return new Level2DurationParser()
      })
      assert.equal(Level2Duration.fromString("P1Y").toString(), "P1Y")
      assert.equal(created, 1)
    } finally {
      DefaultParsers.register(Level2Duration, () => original)
    }
  })

  describe("without defaults (@rr0/time/core)", () => {

    test("data classes can be built and rendered without any parser", () => {
      assert.equal(runLean(`console.log(String(new core.Level2Duration({years: 1})))`), "P1Y")
    })

    test("fromString() fails without a parser", () => {
      assert.equal(runLean(`try { core.Level2Duration.fromString("P1Y") } catch (e) { console.log(e.constructor.name) }`), "EDTFError")
    })

    test("fromString() works with an explicit parser", () => {
      assert.equal(runLean(`console.log(String(core.Level2Duration.fromString("P1Y", new parsers.Level2DurationParser())))`), "P1Y")
    })

    test("a date parser parses its components without defaults", () => {
      assert.equal(runLean(`console.log(core.Level2Date.fromString("2024-08-25T10:30", new parsers.Level2DateParser()).year.value)`), "2024")
    })
  })
})
