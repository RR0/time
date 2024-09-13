import { Level0Timeshift } from "./Level0Timeshift.mjs"

/**
 * @abstract
 */
export class TimeshiftRenderer {
  /**
   * @param {Level0Timeshift} comp
   * @return {string}
   */
  render (comp) {
    return comp.toString()
  }
}
