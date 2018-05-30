sap.ui.define(
  [
    'jquery.sap.global',
    'sap/ui/core/Renderer',
    'sap/ui/unified/ShellLayoutRenderer'
  ],
  function(jQuery, Renderer, UnifiedShellRenderer) {
    'use strict'

    var ShellRenderer = Renderer.extend(UnifiedShellRenderer)

    return ShellRenderer
  },
  /* bExport= */ true
)
