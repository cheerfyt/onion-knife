const Onion = require('../onion')
const { create } = Onion

const md1 = async function(meta, next) {
  meta.user = 'cheerfyt'
  const ret = await next()

  return ret
}

const md2 = async function(meta, next) {
  return meta
}



let onion
describe('# Test suits', () => {
  beforeAll(() => {
    onion = new Onion()
  })

  it('@. there are no middleware to parse the data', () => {
    const fn = () => {
       onion.spicy({ hello: 'cheerfyt'})
    }
  
    expect(fn).toThrowError('there are no middleware to parse the data');
  })

  it('@. middleware must be a function, this md will be not work', async () => {
    onion.use('notFunction')

    expect(onion.stack.length).toBe(0)
  })
  
  it('@. test singleton', () => {
    const onion1 = Onion.singleton()
    const onion2 = Onion.singleton()
    
    expect(onion1).toEqual(onion2)
  })
  
  it('@. use create shortcut', () => {
    const onion3 = create()
    expect(onion3).toBeInstanceOf(Onion)
  })
  
  it('@. test use', async () =>  {
    const compare = {data: {hello: "cheerfyt"}, state: {}, user: "cheerfyt"}
    
    const ret = await onion.use(md1).use(md2).spicy({ hello: 'cheerfyt' })
    
    expect(ret).toHaveProperty('data')
    expect(ret).toHaveProperty('state')
    expect(ret).toHaveProperty('user')
    expect(ret).toMatchObject(compare)
  })

  it('@. there are no data to parse', () => {
    const fn = () => {
       onion.spicy()
    }
  
    expect(fn).toThrowError('there are no data to parse');
  })



})
