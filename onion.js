/*
 * module dependencies
 */
const compose = require('koa-compose')
const debug = require('debug')('onion:main')

const warn = console.warn.bind(console)

class Onion {
  // TODO: add options support
  constructor() {
    this.stack = []
  }

  use(fn) {
    if (typeof fn !== 'function') {
      warn('middleware must be a function, this md will be not work')
      return this
    }

    this.stack.push(fn)
    return this
  }

  // TODO: add opts support
  spicy(data) {
    if (!data) {
      throw new Error('there are no data to parse')
    }

    if (this.stack.length === 0) {
      throw new Error('there are no middleware to parse the data')
    }

    const meta = Object.create(null)
    meta.data = data
    meta.state = {}

    const fn = compose(this.stack)

    return fn(meta)
  }
}

module.exports = Onion
