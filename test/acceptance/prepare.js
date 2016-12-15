/* globals browser */
'use strict'

const path = require('path')

const app = require(path.resolve('app'))
const http = require('http')
const server = http.createServer(app)

server.listen(0)
browser.baseUrl = 'http://localhost:' + server.address().port
browser.ignoreSynchronization = true