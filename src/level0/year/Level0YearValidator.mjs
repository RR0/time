import { EDTFValidator } from "../../calendar/unit/validator/EDTFValidator.mjs"

export class Level0YearValidator extends EDTFValidator {

  constructor () {
    super("year", 0, 9999)
  }
}
