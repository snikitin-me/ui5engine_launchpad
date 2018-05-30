/*!
 * ${copyright}
 */
sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'sap/ui/model/resource/ResourceModel',
    'launchpad/model/Model',
    'sap/ui/Device',
    'launchpad/controller/ErrorHandler',
    'jquery.sap.global'
  ],
  function(UIComponent, ResourceModel, Model, Device, ErrorHandler, jQuery) {
    'use strict'

    return UIComponent.extend('launchpad.Component', {
      metadata: {
        rootView: 'launchpad.view.App',
        dependencies: {
          minUI5Version: '1.28.0',
          libs: ['sap.ui.core', 'sap.m', 'sap.ui.layout']
        },

        config: {
          i18nBundle: 'i18n.i18n',
          serviceUrl: ''
        },

        routing: {
          config: {
            routerClass: 'sap.m.routing.Router',
            viewType: 'XML',
            viewPath: 'launchpad.view',
            targetAggregation: 'masterPages',
            clearTarget: false,
            transition: 'slide'
          },
          routes: [
            {
              pattern: '',
              name: 'main',
              view: 'MainPage',
              targetAggregation: 'pages',
              targetControl: 'app'
            }
          ],
          targets: {}
        }
      },

      /**
       * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
       * In this function, the resource and application models are set and the router is initialized.
       * @public
       * @override
       */
      init: function() {
        var mConfig = this.getMetadata().getConfig()

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments)

        // set the internationalization model
        this.setModel(
          new ResourceModel({
            bundleName: mConfig.i18nBundle
          }),
          'i18n'
        )

        // initialize the error handler with the component
        //this._oErrorHandler = new ErrorHandler(this);

        // set the device model
        //this.setModel(models.createDeviceModel(), "device");

        // create the views based on the url/hash
        this.getRouter().initialize()
      },

      /**
       * The component is destroyed by UI5 automatically.
       * In this method, the ErrorHandler are destroyed.
       * @public
       * @override
       */
      destroy: function() {
        this._oErrorHandler.destroy()
        // call the base component's destroy function
        UIComponent.prototype.destroy.apply(this, arguments)
      },

      /**
       * In this function, the rootView is initialized and stored.
       * @public
       * @override
       * @returns {sap.ui.mvc.View} the root view of the component
       */
      createContent: function() {
        var mConfig = this.getMetadata().getConfig()

        var sServiceUrl = mConfig.serviceUrl

        //This code is only needed for testing the application when there is no local proxy available, and to have stable test data.
        var bIsMocked =
          jQuery.sap.getUriParameters().get('responderOn') === 'true'

        //bIsMocked=true;
        // start the mock server for the domain model
        if (bIsMocked) {
          this._startMockServer(sServiceUrl)
        }

        // TODO change to OData model
        var oModel = new Model()
        oModel.init()
        this.setModel(oModel)

        // call the base component's createContent function
        var oRootView = UIComponent.prototype.createContent.apply(
          this,
          arguments
        )
        oRootView.addStyleClass(this.getCompactCozyClass())
        return oRootView
      },

      /**
       * This method can be called to determine whether the sapUiSizeCompact design mode class should be set, which influences the size appearance of some controls.
       * @return {string}
       * @public
       */
      getCompactCozyClass: function() {
        // in 1.28 "Cozy" mode class does not exist yet, but keep the method name in sync with 1.30
        if (!this._sCompactCozyClass) {
          if (!Device.support.touch) {
            // apply compact mode if touch is not supported; this could me made configurable for the user on "combi" devices with touch AND mouse
            this._sCompactCozyClass = 'sapUiSizeCompact'
          }
        }
        return this._sCompactCozyClass
      },

      /**
       * Creates a promise which is resolved when the metadata is loaded.
       * @param {sap.ui.core.Model} oModel the app model
       * @private
       */
      _createMetadataPromise: function(oModel) {
        this.oWhenMetadataIsLoaded = new Promise(function(fnResolve, fnReject) {
          fnResolve.call(this)
          //oModel.attachEventOnce("metadataLoaded", fnResolve);
          //oModel.attachEventOnce("metadataFailed", fnReject);
        })
      }
    })
  }
)
