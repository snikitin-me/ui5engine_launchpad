/*!
 * ${copyright}
 */

sap.ui.define(
  ['controller/BaseController', 'sap/ui/model/json/JSONModel'],
  function(BaseController, JSONModel) {
    'use strict'
    return BaseController.extend('controller.MainPage', {
      onInit: function(evt) {
        // set mock model
        var oModel = new JSONModel('/module/launchpad/tiles')
        this.getView().setModel(oModel)
      },

      onPress: function(evt) {
        var tile = evt.getParameter('tile')
        location.href = evt.getSource().data('url')
      },

      handleEditPress: function(evt) {
        var oTileContainer = this.getView().byId('container')
        var newValue = !oTileContainer.getEditable()
        oTileContainer.setEditable(newValue)
        evt.getSource().setText(newValue ? 'Done' : 'Edit')
      },

      handleBusyPress: function(evt) {
        var oTileContainer = this.getView().byId('container')
        var newValue = !oTileContainer.getBusy()
        oTileContainer.setBusy(newValue)
        evt.getSource().setText(newValue ? 'Done' : 'Busy state')
      },

      handleTileDelete: function(evt) {
        var tile = evt.getParameter('tile')
        evt.getSource().removeTile(tile)
      }
    })
  }
)
