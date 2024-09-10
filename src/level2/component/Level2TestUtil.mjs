import assert from "node:assert"

import { level1Assert } from "../../level1/component/Level1TestUtil.mjs"

/**
 * @param {Level2Component} component
 * @param {number} value
 * @param {boolean} [uncertain]
 * @param {boolean} [approximate]
 * @param {boolean} [uncertainComponent]
 * @param {boolean} [approximateComponent]
 */
export function level2Assert (component, value, uncertain = false, approximate = false, uncertainComponent = false, approximateComponent = false) {
  level1Assert(component, value, uncertain, approximate)
  assert.equal(component?.uncertainComponent || false, uncertainComponent)
  assert.equal(component?.approximateComponent || false, approximateComponent)
}
