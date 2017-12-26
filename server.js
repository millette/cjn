const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const compression = require('compression')
const koaConnect = require('koa-connect')
const AsyncLRU = require('async-lru')
const { promisify } = require('util')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const renderToHTML = (key) => app.renderToHTML(true, true, key) // {} instead of true also works

const lru = new AsyncLRU({
  max: 20,
  maxAge: 1000 * 60 * 60, // 1 hour
  load: (key, cb) => renderToHTML(key)
    .then((x) => cb(null, x))
    .catch(cb)
})

// lru.on('evict', ({ key, value }) => console.log('evicting', key, value.length))

const getit = promisify(lru.get.bind(lru))
const doit = async (ctx) => { ctx.body = await getit(ctx.url) }

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    const rootStatic = ['favicon.ico'] // static assets available at /
    rootStatic.forEach((r) => {
      // on /[X], read thru static/[X]
      router.get('/' + r, async (ctx) => {
        await app.serveStatic(ctx.req, ctx.res, 'static/' + r)
        ctx.respond = false
      })
      // on static/[X] redirect to /[X]
      router.get('/static/' + r, (ctx) => {
        ctx.status = 301 // make it permanent (temporary by default)
        ctx.redirect('/' + r)
      })
    })

    const routes = ['', 'a', 'b']
    routes.forEach((x) => router.get('/' + x, doit))

    router.get('*', async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(koaConnect(compression())) // before router.routes()
    server.use(router.routes())
    server.listen(port, (err) => {
      if (err) { throw err }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
