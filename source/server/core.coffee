require "../source/utyl/utyl.js" if typeof Utyl == "undefined"
SM = require "serve-me"
Redis = require "redis"

class Core
  constructor: (attr)->
    if !Config
      throw new Error "Need to provide a config file ('source/server/config.coffee')"

    if attr.env == "production"
      port = process.env.PORT or 8080
    else
      port = 3000
    Config.server.debug = if attr.env == "production" then false else true

    @http_server = SM Config.server

    @login = new Core.Login this

    @http_server.start port

    ###Redis Connection
    @redisdb = Redis.createClient Config.redis.port, Config.redis.url
    @redisdb.auth Config.redis.auth, (err) =>
      if err
        throw err
        return
      #You are now connected to your redis.
    ###



module.exports = Core
