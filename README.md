# onion

parse your data use middleware, thanks koa team;

## api

* `onion.use(fn)` return `this`: add middleware to stack
* `onion.spicy(data)` return `Promise` : start parse data

## example

```javascript
// middleware
const md1 = async function(meta, next) {
  console.log(meta) // { data: { hello: 'cheerfyt' }, state: {} }
  meta.user = 'cheerfyt'
  const ret = await next()
  console.log('md1: %j, %s', meta, ret) //  md1: {"data":{"hello":"cheerfyt"},"state":{},"user":"cheerfyt"} enjoy onion
}

const md2 = async function(meta, next) {
  console.log('md2: %j', meta.user) // output: md2: "cheerfyt"
  return 'enjoy onion'
}

// instance
const onion = new Onion()
onion
  .use(md1)
  .use(md2)
  .spicy({ hello: 'cheerfyt' })
```

## TODO

* add test
* more options support
* ...
