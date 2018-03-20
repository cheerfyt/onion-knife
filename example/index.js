const Onion = require('../onion')

const md1 = async function(meta, next) {
  console.log(meta)
  meta.user = 'cheerfyt'
  const ret = await next()
  console.log('md1: %j', meta, ret)
}

const md2 = async function(meta, next) {
  console.log('md2: %j', meta.user)
  return 'enjoy onion'
}

const onion = new Onion()

onion
  .use(md1)
  .use(md2)
  .spicy({ hello: 'cheerfyt' })
