'use strict'

const path = require(`path`)
const https = require(`https`)
const fs = require(`fs`)
const ip = require(`ip`)
const chalk = require(`chalk`)
const Koa = require(`koa`)
const cors = require('@koa/cors')
const logger = require(`koa-logger`)
const serveStatic = require(`koa-static`)

const STATIC_PATH = path.join(__dirname, `./dist-preprod`)
const PORT = 8080
const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.resolve(__dirname, `key.pem`), `utf8`).toString(),
  cert: fs.readFileSync(path.resolve(__dirname, `cert.pem`), `utf8`).toString(),
}

const app = new Koa()
app.use(cors())
app.use(logger())

app.use(async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    if (ctx.status === 404) {
      ctx.type = `html`
      ctx.body = fs.createReadStream(path.join(STATIC_PATH, `index.html`))
    }
  }
})

app.use(
  serveStatic(STATIC_PATH, {
    setHeaders(res, filePath) {
      filePath = path.relative(STATIC_PATH, filePath)
      const isServiceWorker = filePath === `foobarz-service-worker.js`
      if (isServiceWorker) {
        console.log(`PATH`, filePath)
        res.setHeader(
          `Cache-Control`,
          `private, no-cache, no-store, must-revalidate`,
        )
        res.setHeader(`Expires`, `-1`)
        res.setHeader(`Pragma`, `no-cache`)
      }
    },
  }),
)

https.createServer(HTTPS_OPTIONS, app.callback()).listen(PORT, err => {
  if (err) return console.log(err)
  console.log(chalk.green(`https://localhost:${PORT}`))
  console.log(chalk.green(`https://127.0.0.1:${PORT}`))
  console.log(chalk.green(`https://${ip.address()}:${PORT}/`))
})
