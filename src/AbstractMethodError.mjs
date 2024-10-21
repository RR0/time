import { EDTFError } from "./EDTFError.mjs"

export class AbstractMethodError extends EDTFError {
  /**
   * @param {string} message
   */
  constructor (message = "method is abstract") {
    super(message)
  }
}
