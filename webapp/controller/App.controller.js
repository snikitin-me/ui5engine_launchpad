/*!
 * ${copyright}
 */

sap.ui.define(
  ['controller/BaseController', 'sap/ui/model/json/JSONModel'],
  function(BaseController, JSONModel) {
    'use strict'

    return BaseController.extend('controller.App', {
      onInit: function() {
        var oViewModel,
          fnSetAppNotBusy,
          iOriginalBusyDelay = this.getView().getBusyIndicatorDelay()

        oViewModel = new JSONModel({
          busy: false,
          delay: 0
        })
        this.setModel(oViewModel, 'appView')

        fnSetAppNotBusy = function() {
          oViewModel.setProperty('/busy', false)
          oViewModel.setProperty('/delay', iOriginalBusyDelay)
        }

        //this.getOwnerComponent().oWhenMetadataIsLoaded
        //	.then(fnSetAppNotBusy, fnSetAppNotBusy);
      }
    })
  }
)
