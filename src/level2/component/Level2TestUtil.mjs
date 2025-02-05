import assert from "node:assert"

import { level1Assert } from "../../level1/component/Level1TestUtil.mjs"

class Level2ApproximationAssertion {
  /**
   * @param {Level2Assertion} parent
   */
  constructor(parent) {
    this.parent = parent
  }

  /**
   * @param {boolean} value Approximate or not
   * @return {Level2ApproximationAssertion}
   */
  toBe(value) {
    const component = this.parent.component
    if (this.parent.negated) {
      assert.equal(!component.approximate, value, `Expected ${component.unit.name} ${component.value} to be ${value ? "precise" : "approximate"}`)
    } else {
      assert.equal(component.approximate, value, `Expected ${component.unit.name} ${component.value} to be ${value ? "approximate" : "precise"}`)
    }
    return this
  }

  toHaveComponentApproximation(value) {
    const component = this.parent.component
    if (this.parent.negated) {
      assert.equal(!component.approximateComponent, value, `Expected ${component.unit.name} ${component.value} to be ${value ? "precise" : "approximate"} at the component level`)
    } else {
      assert.equal(component.approximateComponent, value, `Expected ${component.unit.name} ${component.value} to be ${value ? "approximate" : "precise"} at the component level`)
    }
    return this.parent
  }

  atTheComponentLevel() {
    return this.toHaveComponentApproximation(true)
  }

  atTheGroupLevel() {
    return this.toHaveComponentApproximation(false)
  }
}

class Level2UncertaintyAssertion {
  /**
   * @param {Level2Assertion} parent
   */
  constructor(parent) {
    this.parent = parent
  }

  toBe(value) {
    const component = this.parent.component
    if (this.parent.negated) {
      assert.equal(!component.uncertain, value, `Expected ${component.unit.name} to be ${value ? "certain" : "uncertain"}`)
    } else {
      assert.equal(component.uncertain, value, `Expected ${component.unit.name} to be ${value ? "uncertain" : "certain"}`)
    }
    return this
  }

  toHaveComponentUncertainty(value) {
    assert.equal(this.parent.component.uncertainComponent, value)
    return this.parent
  }

  atTheComponentLevel() {
    return this.toHaveComponentUncertainty(true)
  }

  atTheGroupLevel() {
    return this.toHaveComponentUncertainty(false)
  }
}

export class Level2Assertion {
  /**
   * @type {Level2Component}
   */
  component

  /**
   * @param {Level2Component} component
   */
  constructor(component) {
    this.component = component
  }

  get to() {
    return this
  }

  get and() {
    return this
  }

  get but() {
    return this
  }

  get not() {
    this.negated = true
    return this
  }

  equal(value) {
    assert.equal(this.component.value, value)
    return this
  }

  haveUncertainty(value) {
    return new Level2UncertaintyAssertion(this).toBe(value)
  }

  beCertain() {
    return this.haveUncertainty(false)
  }

  beUncertain() {
    return this.haveUncertainty(true)
  }

  /**
   * @param value
   * @return {Level2ApproximationAssertion}
   */
  haveApproximation(value) {
    return new Level2ApproximationAssertion(this).toBe(value)
  }

  beApproximate() {
    return this.haveApproximation(true)
  }

  bePrecise() {
    return this.haveApproximation(false)
  }
}

export function assertLevel2(component) {
  return new Level2Assertion(component)
}

/**
 * @param {Level2Component} component
 * @param {number} value
 * @param {boolean} [uncertain]
 * @param {boolean} [approximate]
 * @param {boolean} [uncertainComponent]
 * @param {boolean} [approximateComponent]
 */
export function level2Assert(component, value, uncertain = false, approximate = false, uncertainComponent = false, approximateComponent = false) {
  level1Assert(component, value, uncertain, approximate)
  assert.equal(component?.uncertainComponent || false, uncertainComponent)
  assert.equal(component?.approximateComponent || false, approximateComponent)
}
