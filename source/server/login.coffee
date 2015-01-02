class Core.Login
  constructor: (@core)->
    @core.http_server.on "new_session", (new_session)=>
      return "logged in"
