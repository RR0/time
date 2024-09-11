import { EDTFValidator } from "../../calendar/unit/validator/EDTFValidator.mjs"

export class Level1YearValidator extends EDTFValidator {

  constructor () {
    super("year", Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
  }
}
