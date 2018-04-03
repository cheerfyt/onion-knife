const { expect } = require('chai')
const Onion = require('./onion')

describe('# Test suits', () => {
  it('@. test singleton', () => {
    const onion1 = Onion.singleton()
    const onion2 = Onion.singleton()

    expect(onion1).to.be.deep.eq(onion2)
  })
})
