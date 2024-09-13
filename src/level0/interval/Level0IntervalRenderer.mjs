export class Level0IntervalRenderer {
  /**
   * @readonly
   * @type {Level0IntervalRenderer}
   */
  static instance = new Level0IntervalRenderer()

  /**
   * @param {Level0Interval} interval
   * @return {string}
   */
  render (interval) {
    return (interval.start ? interval.start.toString() : "") + "/" + (interval.end ? interval.end.toString() : "")
  }
}
