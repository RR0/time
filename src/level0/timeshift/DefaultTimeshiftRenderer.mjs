import { TimeshiftRenderer } from "./TimeshiftRenderer.mjs"

export class DefaultTimeshiftRenderer extends TimeshiftRenderer {

  render (comp) {
    const value = comp.value
    const absValue = Math.abs(value)
    const hours = Math.floor(absValue / 60)
    const minutes = absValue % 60
    if (hours === 0 && minutes === 0) {
      return "Z"
    } else {
      const sign = value < 0 ? "-" : "+"
      const hoursStr = hours.toString().padStart(2, "0")
      const minutesStr = minutes > 0 ? ":" + minutes.toString().padEnd(2, "0") : ""
      return sign + hoursStr + minutesStr
    }
  }
}
