/**
 * [SVGLoader description]
 * @param {[type]} app [description]
 */
var SVGLoader = function(app, config) {
	this.app = app;
	this.maxOpacity = 0.3;
	this.minOpacity = 0.001;

	if(config && config.onClick) {
		this.onGroupClick = config.onClick;
	}
	if(config && config.panelName) {
		this.panelName = config.panelName;
	}
	if(config && config.map) {
		this.map = config.map;
	}
	if(config && config.panel) {
		this.panel = config.panel;
	}
  this.panel = this.panel || this.map.panel

	this.CSS = {
		"BG": "#bg-svg",
		"SVG": "#svg",
		"IN-SVG-CSS": "#in-svg-css"
	}

	this.elements = {
		"BG": $(this.CSS["BG"]),
		"SVG": $(this.CSS["SVG"]),
		"IN-SVG-CSS": $(this.CSS["IN-SVG-CSS"])
	}

	this.load = function(path) {
		this.elements["BG"].hide();

		var newObject = document.createElement("object");
		newObject.setAttribute("id", "svg");
		newObject.setAttribute("type", "image/svg+xml");
		newObject.setAttribute("data", path);
		newObject.setAttribute("width", "100%");
		newObject.setAttribute("height", "100%");

		this.elements["BG"].html("");
		this.elements["BG"].append(newObject);
		this.elements["SVG"] = $(this.CSS["SVG"]);

		this.prepareSvg_();
	}

	this.hide = function() {
		this.elements["BG"].addClass("onHidden");
	}

	this.show = function() {
		this.elements["BG"].removeClass("onHidden");
	}

	this.prepareSvg_ = function() {
		this.elements["SVG"].on("load", $.proxy(this.onLoadSvg_, this));
		this.elements["BG"].show();
	}

	this.appendCSS_ = function(svg) {
		var styleElement = svg.createElementNS("http://www.w3.org/2000/svg", "style");
		styleElement.textContent = this.elements["IN-SVG-CSS"].html();
		$(svg).find("svg")[0].appendChild(styleElement);
	}

	this.onLoadSvg_ = function() {
		var svg = this.elements["SVG"][0].getSVGDocument();
		var self = this;
		this.appendCSS_(svg);
    var zoom = this.map ? this.map.currentZoom : 1 
		
		$.each($(svg).find("path"), function(key, value) {
			$(value).attr("fill", "#ffffff");
			$(value).attr("fill-opacity", "0");
			$(value).removeAttr("opacity");
			if(zoom != 3) {
				$(value).css("cursor", "pointer");	
			}
		});

		var groups = $(svg).find("g");
		groups.off();

		groups.on("mouseover", function() {
			var paths = $(this).find("path");
			paths.attr({
				"fill-opacity": self.maxOpacity
			});

			if(self.panel.widgets.parametrs && self.panel.widgets.parametrs.currentParametr && self.panel.widgets.parametrs.currentParametr.id) {
				self.app.legendManager.getLegendByParamAndSubject(
					self.panel.widgets.parametrs.currentParametr.id, 
					$(this).attr("target"),
					function(data) {
						self.app.legendWidget.setLevelText(data);
						self.app.legendWidget.show();
					}
				);	
			}
		});
		groups.on("mouseout", function() {
			var paths = $(this).stop().find("path");
			paths.attr({
				"fill-opacity": self.minOpacity
			});

			self.app.legendWidget.hide();
		});

		if(this.onGroupClick) {
			groups.on("click", this.onGroupClick);	
		}
		
		self.drawParamValues();
	} 

	this.drawParamValues = function(data) {
		this.removeParamValues();

		var svg = $(this.CSS["SVG"])[0].getSVGDocument();
    	var zoom = this.map ? this.map.currentZoom : 1 
		var self = this;

		$.each($(svg).find("g"), function(key, value) {
			var id = $(value).attr("target");
			if(id && data &&  data[id]) {
				var newElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
				var path = $(value).find("path")[0];

				var x = parseInt(($(path).offset().left + path.getBoundingClientRect().width/2));
				var y = parseInt(($(path).offset().top + path.getBoundingClientRect().height/2));

				var correctPath = "DISTRICT";

				if(ConfigApp["TARGETS"][correctPath][id]) {
					x = x + parseInt(ConfigApp["TARGETS"][correctPath][id]["x"]);
					y = y + parseInt(ConfigApp["TARGETS"][correctPath][id]["y"]);
				}

				var classes = "zoom" + zoom;
				var val = parseInt(getRandomArbitary(0, 100));
				if(zoom == 2 ) {
					val = parseInt(getRandomArbitary(0, 10));
				}
				if(zoom == 3 ) {
					val = parseInt(getRandomArbitary(0, 5));
				}
				$(newElement).html(data[id]);
				$(newElement).attr({
					x: x,
					y: y,
					"fill": "#ffffff",
					"class": classes,
					"fill-opacity": "0"
				});

				$(svg).find("svg")[0].appendChild(newElement);	
			}

			$(svg).find("text").attr({
				"fill-opacity": "1"
			});
		});
	}

	this.removeParamValues = function() {
		var svg = $(this.CSS["SVG"])[0].getSVGDocument();
		$(svg).find("text").remove();
	}
}

function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

