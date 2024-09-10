import { EDTFValidator } from "../../validator/EDTFValidator.mjs"

export class Level0YearValidator extends EDTFValidator {

  constructor () {
    super("year", 0, 9999)
  }
}
