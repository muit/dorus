class Dollars.Login
  @login: (username, password, success, error)->
    $.get "./login/", {username: username, password: password}, (data)=>
      if data == "logged in"
        success()
      else
        error()


  @hide: (name, callback)->
    $(@ids[name]).hide 400,callback

  @show: (name)->
    $(@ids[name]).fadeIn 'slow'

  @ids =
    username: "#username_container",
    password: "#password_container",
    registry: "#registry_container"
