'use strict'

// npm
const Koa = require('koa')
const next = require('next')
const router = require('koa-route').get
const compression = require('compression')
const koaConnect = require('koa-connect')
const AsyncLRU = require('async-lru')
const logger = require('koa-logger')

// core
const { promisify } = require('util')
const { URL } = require('url')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const renderToHTML = (key, o) => app.renderToHTML({}, {}, key, o)

const lru = new AsyncLRU({
  max: 20,
  maxAge: 1000 * 60 * 60, // 1 hour
  load: (key, cb) => {
    const u = new URL(key, 'http://localhost/')
    const n = u.pathname
    const id = u.searchParams.get('id')
    const lang = u.searchParams.get('lang')
    return renderToHTML(n, { id, lang })
      .then((x) => cb(null, x))
      .catch(cb)
  }
})

// lru.on('evict', ({ key, value }) => console.log('evicting', key, value.length))

const getit = promisify(lru.get.bind(lru))

const topPageHandler = async (ctx, lang) => {
  ctx.body = await getit('/' + (ctx.url.split('/')[2] || 'index2') + '?lang=' + lang)
}

const staticAtRoot = (server, r) => {
  // on /[X], read thru static/[X]
  server.use(router('/' + r, async (ctx) => {
    await app.serveStatic(ctx.req, ctx.res, 'static/' + r)
    ctx.respond = false
  }))

  // on static/[X] redirect to /[X]
  server.use(router('/static/' + r, (ctx) => {
    ctx.status = 301 // make it permanent (temporary by default)
    ctx.redirect('/' + r)
  }))
}

const runner = () => {
  const server = new Koa()

  server.use(logger())
  server.use(koaConnect(compression()))

  staticAtRoot(server, 'favicon.ico')

  server.use(router('/', async (ctx) => { ctx.body = await getit('/') }))
  ;['', 'a', 'b', 'c'].forEach((x) => server.use(router('/:lang(fr|en)/' + x, topPageHandler)))
  server.use(router('/:lang(fr|en)/c/:id', async (ctx, lang, id) => {
    ctx.body = await getit('/c?id=' + id + '&lang=' + lang)
  }))

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.listen(port, (err) => {
    if (err) { throw err }
    console.log(`> Ready on http://localhost:${port}`)
  })
}

app.prepare()
  .then(runner)
  .catch(console.error)
