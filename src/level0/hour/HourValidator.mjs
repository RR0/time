import MinMaxValidator from "../../validator/MinMaxValidator.mjs"

export class HourValidator extends MinMaxValidator {

  constructor () {
    super("hour", 0, 23)
  }
}
