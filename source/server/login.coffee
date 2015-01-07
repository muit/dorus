class Core.Login
  constructor: (@core)->
    @core.http_server.on "new_session", (evt)=>
      return "logged in"

    @core.http_server.on "session", (evt)=>
      return "logged again"
