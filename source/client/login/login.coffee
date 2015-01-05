class Dollars.Login
  @load: ->
    self = this
    $("#username").focus()
    $("#username").keydown (e)=>
      if e.keyCode == 13
        self.next()
    $("#login_next").click ()=>
      self.next()
    $("#username_container").submit ()=>
      self.next()

  @next: ->
    @username = window.username.value
    if @username != ""
      @hide "username"
      @show "password"
      $("#password").focus()

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
