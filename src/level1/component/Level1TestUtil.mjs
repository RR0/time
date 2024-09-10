import assert from "node:assert"

/**
 *
 * @param {Level1Component} component
 * @param {number} value
 * @param {boolean} uncertain
 * @param {boolean} approximate
 */
export function level1Assert (component, value, uncertain = false, approximate = false) {
  assert.equal(component?.value, value)
  assert.equal(component?.uncertain || false, uncertain)
  assert.equal(component?.approximate || false, approximate)
}
