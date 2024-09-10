import Level1Component from "../component/Level1Component.mjs"
import Level1HourParser from "./Level1HourParser.mjs"
import GregorianCalendar from "../../calendar/GregorianCalendar.mjs"

export default class Level1Hour extends Level1Component {
  /**
   * @param {Level1ComponentSpec|number} spec
   */
  constructor (spec) {
    super(spec, GregorianCalendar.hour)
  }

  /**
   * If some digits are unspecified, an inferred hour interval will be returned.
   *
   * @param {string} str
   * @return {Level1Hour | {start: Level1Hour, end: Level1Hour}}
   */
  static fromString (str) {
    const parser = new Level1HourParser()
    const parseResult = parser.parse(str)
    const startValue = parseResult.value.start
    if (startValue !== undefined) {
      let unit = GregorianCalendar.hour
      const start = new Level1Hour(Object.assign({...parseResult}, { value: Math.max(startValue, unit.min) }))
      const end = new Level1Hour(Object.assign({...parseResult}, { value: Math.min(parseResult.value.end, unit.max) }))
      return { start, end }
    } else {
      return new Level1Hour(parseResult)
    }
  }
}
