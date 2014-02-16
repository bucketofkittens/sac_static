var EventsAlarmWidget = function(panel) {
	this.panel = panel;
	this.CSS = {
		"MAIN": "#events-alarm",
		"HIDDEN": "hidden",
		"DATA-PLACE": "#events-alarm-data",
		"LOAD": "#load"
	}

	this.elements = {
		"MAIN": $(this.CSS["MAIN"]),
		"DATA-PLACE": $(this.CSS["DATA-PLACE"])
	}

	this.show = function() {
		this.elements["MAIN"].removeClass(this.CSS["HIDDEN"]);
	}

	this.hidden = function() {
		this.elements["MAIN"].addClass(this.CSS["HIDDEN"]);
	}
}
