import { Level1MonthValidator } from "../../level1/month/Level1MonthValidator.mjs"

export class Level2MonthValidator extends Level1MonthValidator {

  validate (value) {
    switch (value) {
      case 25:
      case 26:
      case 27:
      case 28:
      case 29:
      case 30:
      case 31:
      case 32:
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
        return true
      default:
        return super.validate(value)
    }
  }
}
