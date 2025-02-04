import { TimeUnit } from "../../unit/TimeUnit.mjs"

export class MillisecondUnit extends TimeUnit {

  constructor () {
    super("millisecond", 0, 999, undefined)
  }

  get duration () {
    return 1
  }

  create (value) {
    return { duration: this.duration }
  }
}

export const level0MillisecondUnit = new MillisecondUnit()
