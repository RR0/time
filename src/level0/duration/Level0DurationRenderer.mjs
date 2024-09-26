import { GregorianCalendar } from "../../calendar/index.mjs"
import { Level0Second } from "../second/index.mjs"
import { Level0ComponentRenderer } from "../component/Level0ComponentRenderer.mjs"
import { Level0Minute } from "../minute/index.mjs"
import { Level0Hour } from "../hour/index.mjs"
import { Level0Day } from "../day/index.mjs"
import { Level0Month } from "../month/index.mjs"
import { Level0Year } from "../year/index.mjs"

export class Level0DurationRenderer {
  /**
   * @readonly
   * @type {Level0DurationRenderer}
   */
  static instance = new Level0DurationRenderer()
  /**
   * @param {Level0Duration} comp
   * @return {string}
   */
  render(comp) {
    let string = "P"
    let millis = comp.value
    const yearDuration = millis / GregorianCalendar.year.duration
    const years = Math.floor(yearDuration)
    if (years > 0) {
      string += new Level0Year(years).toString() + "Y"
      millis -= years * GregorianCalendar.year.duration
    }
    const monthDuration = millis / GregorianCalendar.month.duration
    const months = Math.floor(monthDuration)
    if (months > 0) {
      string += new Level0Month(months).toString(Level0ComponentRenderer.instance) + "MM"
      millis -= months * GregorianCalendar.month.duration
    }
    const dayDuration = millis / GregorianCalendar.day.duration
    const days = Math.floor(dayDuration)
    if (days > 0) {
      string += new Level0Day(days).toString(Level0ComponentRenderer.instance) + "D"
      millis -= days * GregorianCalendar.day.duration
    }
    const hourDuration = millis / GregorianCalendar.hour.duration
    const hours = Math.floor(hourDuration)
    if (hours > 0) {
      string += new Level0Hour(hours).toString(Level0ComponentRenderer.instance) + "H"
      millis -= hours * GregorianCalendar.hour.duration
    }
    const minuteDuration = millis / GregorianCalendar.minute.duration
    const minutes = Math.floor(minuteDuration)
    if (minutes > 0) {
      string += new Level0Minute(minutes).toString(Level0ComponentRenderer.instance) + "M"
      millis -= minutes * GregorianCalendar.minute.duration
    }
    const secondDuration = millis / GregorianCalendar.second.duration
    const seconds = Math.floor(secondDuration)
    if (seconds > 0) {
      string += new Level0Second(seconds).toString(Level0ComponentRenderer.instance) + "S"
    }
    return string
  }
}
