jQuery.sap.require('sap.ui.model.json.JSONModel')

sap.ui.model.json.JSONModel.extend('launchpad.model.Model', {
  eventBus: sap.ui.getCore().getEventBus(),

  attachChange: function(sPath, callback, scope) {
    this.eventBus.subscribe('model_change', sPath, callback, scope)
  },

  updateProperty: function(sPath, value) {
    this.setProperty(sPath, value)
    this.eventBus.publish('model_change', sPath, value)
  },

  init: function(socket) {
    this.updateProperty('/Roles', {})
  }
})
