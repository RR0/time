import { EDTFError } from "./EDTFError.mjs"

export class AbstractMethodError extends EDTFError {
  /**
   * @param {string} message
   */
  constructor (thi, method) {
    super(`${thi.constructor.name} is abstract` + (method ? ` and does not implement ${method}` : ""))
  }
}
