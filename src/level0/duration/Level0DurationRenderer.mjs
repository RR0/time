import { Level0ComponentRenderer } from "../component/Level0ComponentRenderer.mjs"
import { Level0Duration } from "./Level0Duration.mjs"

export class Level0DurationRenderer {
  /**
   * @readonly
   * @type Level0DurationRenderer
   */
  static instance = new Level0DurationRenderer()

  /**
   * @param {Level0Duration} comp
   * @return {string}
   */
  render (comp) {
    const spec = Level0Duration.toSpec(comp)
    let string = "P"
    const yearsSpec = spec.years
    if (yearsSpec) {
      string += yearsSpec.toString() + "Y"
    }
    const monthsSpec = spec.months
    if (monthsSpec) {
      string += monthsSpec.toString(Level0ComponentRenderer.instance) + "MM"
    }
    const daysSpec = spec.days
    if (daysSpec) {
      string += daysSpec.toString(Level0ComponentRenderer.instance) + "D"
    }
    const hoursSpec = spec.hours
    if (hoursSpec) {
      string += hoursSpec.toString(Level0ComponentRenderer.instance) + "H"
    }
    const minutesSpec = spec.minutes
    if (minutesSpec) {
      string += minutesSpec.toString(Level0ComponentRenderer.instance) + "M"
    }
    const secondsSpec = spec.seconds
    if (secondsSpec) {
      string += secondsSpec.toString(Level0ComponentRenderer.instance) + "S"
    }
    return string
  }
}
