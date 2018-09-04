'use strict'

const path = require(`path`)
const fs = require(`fs`)
const https = require(`https`)
const Koa = require(`koa`)
const logger = require(`koa-logger`)
const serveStatic = require(`koa-static`)

const STATIC_PATH = path.join(__dirname, `./dist-preprod`)
const PORT = 8080
const HTTPS_OPTIONS = {
  key: fs.readFileSync(path.resolve(__dirname, `key.pem`), `utf8`).toString(),
  cert: fs.readFileSync(path.resolve(__dirname, `cert.pem`), `utf8`).toString(),
}

const app = new Koa()
app.use(logger())

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
  console.log(`listening to https://127.0.0.1:8080`)
})
