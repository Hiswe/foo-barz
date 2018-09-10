'use strict'

const firebaseConfig = require(`./firebase.json`)
const name = firebaseConfig.hosting.headers[0].source

module.exports = {
  name,
}
