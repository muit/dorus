(function() {
  window.Dollars || (window.Dollars = {});

  Dollars.log = function(message) {
    if (Dollars.Config.log_enabled === void 0 || Dollars.Config.log_enabled === true) {
      return console.log("Dollars: " + message);
    }
  };

  Dollars.load = function() {
    Dollars.Chat.load();
    return Dollars.Login.load();
  };

  Dollars.Config = (function() {
    function Config() {}

    Config.log_enabled = true;

    return Config;

  })();

  Dollars.Chat = (function() {
    function Chat() {}

    Chat.load = function() {};

    Chat.connect = function(user, password) {};

    Chat.disconnect = function() {};

    return Chat;

  })();

  Dollars.Login = (function() {
    function Login() {}

    Login.load = function() {
      var self;
      self = this;
      $("#username").focus();
      $("#username").keydown((function(_this) {
        return function(e) {
          if (e.keyCode === 13) {
            return self.next();
          }
        };
      })(this));
      $("#login_next").keydown((function(_this) {
        return function() {
          return self.next();
        };
      })(this));
      return $("#username_container").submit((function(_this) {
        return function() {
          return self.next();
        };
      })(this));
    };

    Login.next = function() {
      this.username = window.username.value;
      if (this.username !== "") {
        this.hide("username");
        this.show("password");
        return $("#password").focus();
      }
    };

    Login.login = function(username, password, success, error) {
      return $.get("./login/", {
        username: username,
        password: password
      }, (function(_this) {
        return function(data) {
          if (data === "logged in") {
            return success();
          } else {
            return error();
          }
        };
      })(this));
    };

    Login.hide = function(name, callback) {
      return $(this.ids[name]).hide(400, callback);
    };

    Login.show = function(name) {
      return $(this.ids[name]).fadeIn('slow');
    };

    Login.ids = {
      username: "#username_container",
      password: "#password_container",
      registry: "#registry_container"
    };

    return Login;

  })();

}).call(this);
