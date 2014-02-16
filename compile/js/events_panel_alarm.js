var EventsAlarmWidget = function(panel) {
	this.panel = panel;
	this.CSS = {
		"MAIN": "#events-alarm",
		"HIDDEN": "hidden",
		"DATA-PLACE": "#events-alarm-data",
		"LOAD": "#load",
    "LINK": "#events-alarm-msg a"
	}

	this.elements = {
		"MAIN": $(this.CSS["MAIN"]),
		"DATA-PLACE": $(this.CSS["DATA-PLACE"]),
		"LINK": $(this.CSS["LINK"])
	}

	this.show = function() {
		this.elements["MAIN"].removeClass(this.CSS["HIDDEN"]);
    var self = this
    this.elements["LINK"].click(function(){
      self.hide()
      self.panel.app.setAppTitle("Федеральный розыск")
      self.panel.map.miniMap.opacityHidden()
      self.panel.map.addBlur()
      self.panel.map.SVGWriter.hide()
      
      _.each(['sceneInfo', 'wx1', 'wx2', 'wx3'], function(w){ self.panel.widgets[w].show()})
    })
	}

	this.hide = function() {
		this.elements["MAIN"].addClass(this.CSS["HIDDEN"]);
	}
}
