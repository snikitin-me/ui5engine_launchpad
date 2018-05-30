sap.ui.define(
  [
    'sap/ui/unified/Shell',
    'sap/ui/unified/ShellHeadItem',
    'sap/ui/unified/ShellHeadUserItem',
    'sap/m/SearchField'
  ],
  function(UnifiedShell, ShellHeadItem, ShellHeadUserItem, SearchField) {
    'use strict'

    var Shell = UnifiedShell.extend('engine.launchpad.common.Shell')

    Shell.prototype.init = function() {
      UnifiedShell.prototype.init.apply(this, arguments)

      // this.addHeadItem(
      // 	new ShellHeadItem({
      // 			tooltip:"Configuration",
      // 			icon:"sap-icon://menu2",
      // 			press: this.onPressConfiguration
      // 	})
      // );

      this.addHeadItem(
        new ShellHeadItem({
          tooltip: 'Home',
          icon: 'sap-icon://home',
          press: this.onPressHome
        })
      )

      this.addHeadEndItem(
        new ShellHeadItem({
          tooltip: 'Logoff',
          icon: 'sap-icon://log',
          press: this.onPressLogoff
        })
      )

      this.setUser(
        new ShellHeadUserItem({
          image: 'sap-icon://person-placeholder',
          username: 'Undefined',
          press: this.onUserItemPressed
        })
      )

      // this.setSearch(
      // 	new SearchField({
      // 			search: this.onSearchPressed
      // 	})
      // );

      // this.addPaneContent({
      // 	<Text text="Lorem ipsum" />
      // });

      this._loadUserData()
    }

    Shell.prototype.onPressConfiguration = function() {}

    Shell.prototype.onPressHome = function() {
      window.location = '/modules/launchpad/webapp/index.html'
    }

    Shell.prototype.onPressLogoff = function() {
      window.location = '/auth/logout'
    }

    Shell.prototype.onUserItemPressed = function() {}

    Shell.prototype._loadUserData = function() {
      $.getJSON(
        '/module/users/user/profile',
        function(response) {
          var user = response.d.results
          this.getUser().setUsername(user.firstname + ' ' + user.lastname)
        }.bind(this)
      )
    }

    return Shell
  },
  /* bExport= */ true
)
