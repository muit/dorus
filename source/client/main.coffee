window.Dollars or= {}

Dollars.log = (message)->
  if Dollars.Config.log_enabled == undefined or Dollars.Config.log_enabled == true
    console.log "Dollars: "+message

Dollars.load = ->
  Dollars.Chat.load()
