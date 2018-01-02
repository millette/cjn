'use strict'

// npm
const Koa = require('koa')
const next = require('next')
const route = require('koa-route')
const compression = require('compression')
const koaConnect = require('koa-connect')
const AsyncLRU = require('async-lru')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

// core
const { promisify } = require('util')
const { URL } = require('url')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const write = promisify(fs.writeFile)
const renderToHTML = (key, o) => app.renderToHTML({}, {}, key, o)

const lru = new AsyncLRU({
  max: 20,
  maxAge: 1000 * (dev ? 15 : 3600), // 1 hour in prod, 15 seconds in dev
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

const page404Handler = async (ctx) => {
  ctx.req.url = '*'
  await handle(ctx.req, ctx.res)
  ctx.respond = false
}

const topPageHandler = async (ctx, lang) => {
  ctx.body = await getit('/' + (ctx.url.split('/')[2] || 'front') + '?lang=' + lang)
}

const staticAtRoot = (server, path) => {
  const thru = async (ctx) => {
    ctx.res.statusCode = 200
    await app.serveStatic(ctx.req, ctx.res, 'static/' + path)
    ctx.respond = false
  }

  const redir = (ctx) => {
    ctx.status = 301 // make it permanent (temporary by default)
    ctx.redirect('/' + path)
  }

  server.use(route.get('/' + path, thru))
  server.use(route.get('/static/' + path, redir))
}

const runner = () => {
  const server = new Koa()
  server.use(koaConnect(compression()))
  server.use(bodyParser())
  server.use(logger())

  staticAtRoot(server, 'favicon.ico')

  server.use(route.get('/data/**/*.json', (ctx) => {
    ctx.type = 'application/json'
    ctx.body = fs.createReadStream(ctx.url.slice(1).split('?')[0])
  }))

  server.use(route.post('/admin/premiere', async (ctx) => {
    await write('data/pages/premiere.json', ctx.request.rawBody)
    ctx.type = 'application/json'
    const nKeys = Object.keys(ctx.request.body).length
    ctx.body = {
      ok: true,
      nKeys,
      message: `Écrit ${nKeys} champs avec succès.`
    }
  }))

  server.use(route.get('/admin', async (ctx) => { ctx.body = await getit('/admin') }))
  server.use(route.get('/admin/premiere', async (ctx) => { ctx.body = await getit('/admin/premiere') }))
  server.use(route.get('/admin/b', async (ctx) => { ctx.body = await getit('/admin/b') }))
  server.use(route.get('/', async (ctx) => { ctx.body = await getit('/') }))

  const pages = ['', 'a', 'b', 'c', 'contact']
  pages.forEach((x) => server.use(route.get('/:lang(fr|en)/' + x, topPageHandler)))
  pages.concat(['front']).filter(Boolean).forEach((x) => server.use(route.get('/' + x, page404Handler)))

  server.use(route.get('/:lang(fr|en)/c/:id', async (ctx, lang, id) => {
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
