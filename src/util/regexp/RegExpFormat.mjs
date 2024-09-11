export default class RegExpFormat {
  /**
   * Produces a valid groupName.
   *
   * @param {string[]} words
   * @return {string}
   */
  static groupName (...words) {
    return words.reduce((str, word) => str ? str + word.charAt(0).toUpperCase() + word.substring(1) : word, "")
  }

  /**
   * @param {string} name
   * @param {string[]} contents
   * @return {string}
   */
  static group (name, ...contents) {
    return `(?<${name}>${contents.join("")})`
  }

  /**
   * @param {string[]} contents
   * @return {string}
   */
  static optional (contents) {
    return contents + "?"
  }

  /**
   * @param {string[]} contents
   * @return {string}
   */
  static nonCapturingGroup (...contents) {
    return `(?:${contents.join("")})`
  }

  /**
   * @param {string} name The group name
   * @param {string[]} contents
   * @return {string}
   */
  static optionalGroup (name, ...contents) {
    return RegExpFormat.optional(RegExpFormat.group(name, ...contents))
  }

  /**
   * @param {string[]} contents
   * @return {string}
   */
  static optionalNonCapturingGroup (...contents) {
    return RegExpFormat.optional(RegExpFormat.nonCapturingGroup(...contents))
  }

  /**
   * @param {string} name The group name
   * @param {string} count The digits repetition spec, like "{2}" or "+"
   * @param {string | undefined} prefix Can be used to specify allowed signs or "Y"
   * @param {string} digit
   * @return {string} The relevant regex format.
   */
  static numberGroup (name, count, prefix, digit = "\\d") {
    return RegExpFormat.group(name, `${prefix ? prefix : ""}[${digit}]${count}`)
  }
}
