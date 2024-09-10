import level0Api from "./level0/index.mjs"
import level1Api from "./level1/index.mjs"
import level2Api from "./level2/index.mjs"

export default {
  /**
   * @readonly
   */
  level0: level0Api,

  /**
   * @readonly
   */
  level1: level1Api,

  /**
   * @readonly
   */
  level2: level2Api
}
