var Panel = function(app) {
  this.app = app;
  this.widgets = {};
  this.initialize.apply(this, arguments);
};

_.extend(Panel.prototype, {

  initialize: function(){},

  show: function(){
    _.each(this.widgets, function(widget){ if (widget.show) widget.show() }); 
  },

  hide: function(){
    _.each(this.widgets, function(widget){ if (widget.hidden) widget.hidden() }); 
  }
});

Panel.extend = extend;


/**
 * FormatPanel
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var FormatsPanel = Panel.extend({
  initialize: function(){
	  this.onFormatUpdateContentEvent = new signals.Signal();
	  this.onFormatUpdateContentEvent.add(OnFormatUpdateContentEvent);
	  this.onFormatUpdateContentEventBind_ = function() {
		  this.onFormatUpdateContentEvent.dispatch(this);
	  }
    this.widgets.yearSelector = new YearSelectWidget(this, {
                                  years: [2014, 2013, 2012, 2011, 2010, 2009, 2008],
                                  selectedYear: 2014,
                                  container: "#params-age-selected",
                                  onAfterYearSelected: $.proxy(this.onFormatUpdateContentEventBind_, this)
                                })

    this.widgets.format = new FormatWidget(this);
    this.widgets.paramsSelector =  new ParamsSelectorWidget(this);
    this.widgets.regionsSelector =  new RegionsSelectorWidget(this); 
  }
});

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var DistrictsPanel = Panel.extend({

  initialize: function(){
    this.map = new MapStateManager(this.app, this);
		this.mapColorel = new MapColorel(this.app);

    this.onDistrictUpdateMapEvent = new signals.Signal();
    this.onDistrictUpdateMapEvent.add(OnDistrictUpdateMapEvent);
    this.onDistrictUpdateMapEventBind_ = function() {
    	this.onDistrictUpdateMapEvent.dispatch(this);
    }

    this.widgets.yearSelector = new YearSelectWidget(this, {
			              years: [2014, 2013, 2012, 2011, 2010, 2009, 2008],
			              selectedYear: 2012,
			              container: "#age_select",
			              onAfterYearSelected: $.proxy(this.onDistrictUpdateMapEventBind_, this)
		              });
    this.widgets.parametrs = new ParametrsWidgets(this);
    this.widgets.mapColor = new MapColorWidget(this);
    this.widgets.mapColor.enable();
    
    
    //this.widgets.regionsParametrs = new RegionsParametrsWidgets(this); 
    //this.widgets.regionsParametrs.getRegionsParams();
    
  },

	show: function() {
		this.map.show();
		if(this.map.currentZoom != 1) {
			this.map.miniMap.opacityShow();	
		}
		
		this.map.SVGWriter.show();
		this.map.SVGWriter.load(this.app.configManager.getSvgById(this.map.currentRegion));
		this.widgets.parametrs.fullShow();
		this.widgets.mapColor.updateParams();
		this.mapColorel.show();
		this.app.pageTitleWidget.show();
		//this.widgets.regionsParametrs.fullShow();
		//console.log(this.widgets.regionsParametrs);
		if(this.widgets.parametrs.currentParametr && this.widgets.parametrs.currentParametr.id) {
			this.app.legendWidget.show();
		}
	},

	hide: function() {
		this.map.addBlur();
		this.map.miniMap.opacityHidden();
		this.map.SVGWriter.hide();

		this.widgets.parametrs.fullHidden();
		this.app.legendWidget.hide();
		//this.widgets.paramsSelectorWidget.hidden();
		this.mapColorel.hidden();
	}
})


/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var GraphPanel = Panel.extend({

  initialize: function(){
	  this.onFormatUpdateContentEvent = new signals.Signal();
	  this.onFormatUpdateContentEvent.add(OnFormatUpdateContentEvent);
	  this.onFormatUpdateContentEventBind_ = function() {
		  this.onFormatUpdateContentEvent.dispatch(this);
	  }
    this.widgets.yearSelector = new YearSelectWidget(this, {
			              years: [2014, 2013, 2012, 2011, 2010, 2009, 2008],
			              selectedYear: 2012,
			              container: "#age_select",
			              onAfterYearSelected: $.proxy(this.onDistrictUpdateMapEventBind_, this)
		              });
    this.widgets.graph = new GraphWidget(this); 
    this.widgets.regionsSelector =  new GraphRegionsSelectorWidget(this);
    this.widgets.paramsSelector =  new GraphParamsSelector(this); 
  }
});

var ReportsPanel = Panel.extend({

	show: function() {
		this.app.reportsParamsSelector.show();
		this.app.reportsDiscSelector.show();
		//this.app.graphRegionsSelectorWidget.show();
		//this.app.graphWidget.show();
	},

	hide: function() {
		this.app.reportsParamsSelector.hidden();
		this.app.reportsDiscSelector.hidden();
		this.app.reportsWidget.hidden();
		//this.app.graphRegionsSelectorWidget.hidden();
		//this.app.graphWidget.hidden();
	}
});

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var RegionPanel = Panel.extend({

  initialize: function(){
    this.elements = {
      "BG-IMAGE": $(this.CSS["BG-IMAGE"]),
      "CAMERA-LEFT": $(this.CSS["CAMERA-LEFT"]),
      "CAMERA-RIGHT": $(this.CSS["CAMERA-RIGHT"])
    }
		//this.regionsMapColorel = new RegionsMapColorel(this);
	  this.svgWriter = new SVGLoader(this.app, {panel: this});
    this.widgets.yearSelector = new YearSelectWidget(this, {
			years: [2012],
			selectedYear: 2012,
			container: "#regions_age_select"
		});

	  //this.widgets.regionsParametrs = new RegionsParametrsWidgets(this); 
    //this.widgets.regionsParametrs.getRegionsParams();
		//this.widgets.paramsSelector = new ParamsSelectorWidget(this);
    //this.widgets.regionsSelector = new RegionsSelectorWidget(this)
	 // this.widgets.regionsMapColor = new RegionsMapColorWidget(this); 
	//	this.widgets.regionsMapColor.enable();
	  this.bindEvents_();
  },

	bgImage: null,

	CSS: {
		"BG-IMAGE": "#bg-regions-image",
		"CAMERA-LEFT": "#regions-left-camera",
		"CAMERA-RIGHT": "#regions-right-camera"
	},
	currentCamera: "CENTER",

	getBgCurrentCamera: function() {
		return this.app.getResByPath(ConfigApp["REGIONS"][this.currentCamera]["MAP"]) ;
	},

	getSVGCurrentCamera: function() {
		return ConfigApp["REGIONS"][this.currentCamera]["SVG"];
	},

	getVideoName: function(start, end) {
		if(start == "LEFT" && end == "CENTER") {
			return ConfigApp["REGIONS"]["LEFT"]["VIDEO"]["OUT"];
		}
		if(start == "CENTER" && end == "RIGHT") {
			return ConfigApp["REGIONS"]["RIGHT"]["VIDEO"]["IN"];
		}
		if(start == "RIGHT" && end == "CENTER") {
			return ConfigApp["REGIONS"]["RIGHT"]["VIDEO"]["OUT"];
		}
		if(start == "CENTER" && end == "LEFT") {
			return ConfigApp["REGIONS"]["LEFT"]["VIDEO"]["IN"];
		}
	},

	setBg: function(bg) {
		if(bg) {
			this.bgImage = bg;	
		}
		if(this.bgImage) {
			this.elements["BG-IMAGE"].css("backgroundImage", "url('"+this.bgImage+"')");
		} else {
			this.elements["BG-IMAGE"].css("backgroundImage", "url('"+this.getBgCurrentCamera()+"')");
		}
	},

	show: function() {
	    this.setBg();
	    this.app.setAppTitle('Россия')
		this.elements["BG-IMAGE"].addClass("onShow");

		if(this.currentCamera != "LEFT") {
			this.elements["CAMERA-LEFT"].addClass("onShow");
		}
		if(this.currentCamera != "RIGHT") {
			this.elements["CAMERA-RIGHT"].addClass("onShow");
		}
		this.svgWriter.show();
		this.svgWriter.load(this.getSVGCurrentCamera());

		//this.widgets.regionsParametrs.fullShow();
		this.widgets.regionsMapColor.updateParams();

		//this.app.regionsLegendWidget.show();
	},

	hide: function() {
		this.elements["BG-IMAGE"].removeClass("onShow");
		this.elements["CAMERA-LEFT"].removeClass("onShow");
		this.elements["CAMERA-RIGHT"].removeClass("onShow");
    	$('#bg-colored-image').css({backgroundImage: 'none'});

		//this.widgets.regionsParametrs.fullHidden();

		//this.app.regionsLegendWidget.hide();
	},

	addBlur: function() {
		this.elements["BG-IMAGE"].addClass("blur");
	},

	removeBlur: function() {
		this.elements["BG-IMAGE"].removeClass("blur");
	},

	onCameraLeftClick_ : function() {
		var startState = "";
		var endState = "";

		if(this.currentCamera == "CENTER") {
			this.currentCamera = "LEFT";
			this.elements["CAMERA-LEFT"].removeClass("onShow");

			startState = "CENTER";
			endState = "LEFT";
		}
		if(this.currentCamera == "RIGHT") {
			this.currentCamera = "CENTER";
			this.elements["CAMERA-RIGHT"].addClass("onShow");

			startState = "RIGHT";
			endState = "CENTER";
		}

		var mobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);

		if(!mobile) {
			var poster =  (this.bgImage || '/static/images/map/all-regions-center.jpg')

			this.app.videoPlayer.play(
				this.app.getResByPath(this.getVideoName(startState, endState)) ,
				{
					onEndedCallback: $.proxy(this.onVideoPlayEnd_, this),
					poster: poster
				}
			);
		} else {
			this.onVideoPlayEnd_();
		}
	},

	onVideoPlayEnd_ : function() {
		var self = this;
		if(this.widgets.regionsParametrs.currentParametr) {
      this.regionsMapColorel.colored(
				this.widgets.regionsParametrs.currentParametr.id, 
				this.widgets.yearSelector.selectedYear,
        function(){self.app.videoPlayer.hide()}
			);	
		}
		this.widgets.regionsMapColor.updateParams();

		this.setBg(this.getBgCurrentCamera());
		this.svgWriter.load(this.getSVGCurrentCamera());

		/*setTimeout(function() {*/
		//	self.app.videoPlayer.hide();
		/*}, 0);*/
		
	},

	onCameraRightClick_ : function() {
		var startState = "";
		var endState = "";

		if(this.currentCamera == "CENTER") {
			this.currentCamera = "RIGHT";
			this.elements["CAMERA-RIGHT"].removeClass("onShow");

			startState = "CENTER";
			endState = "RIGHT";
		}
		if(this.currentCamera == "LEFT") {
			this.currentCamera = "CENTER";
			this.elements["CAMERA-LEFT"].addClass("onShow");

			startState = "LEFT";
			endState = "CENTER";
		}

		var mobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
		if(!mobile) {
			var poster =  (this.bgImage || '/static/images/map/all-regions-center.jpg')
			this.app.videoPlayer.play(
				this.app.getResByPath(this.getVideoName(startState, endState)) ,
				{
					onEndedCallback: $.proxy(this.onVideoPlayEnd_, this),
					poster: poster
				}
			);
		} else {
			this.onVideoPlayEnd_();
		}
    	
	},

	bindEvents_ : function() {
		this.elements["CAMERA-LEFT"].on("click", $.proxy(this.onCameraLeftClick_, this));
		this.elements["CAMERA-RIGHT"].on("click", $.proxy(this.onCameraRightClick_, this));
	}

});

var EventsPanel = Panel.extend({

	getAppealsListLast_: function(statuses) {
		var self = this;
	  	this.appealsList.init();
	  	this.appealsList.beforeCreate_ = function(data) {
			return _.template(data, { appeals : self.appeals, statuses: statuses});
		}
		this.appealsList.afterCreate_ = function() {
			$("#appeals-list .num").on("click", function() {
				$(this).parent().find(".status_list").toggle();
			});
		}
		this.appealsList.create();
  	},
  
	getAppealsList_: function(appeals) {
		this.appeals = appeals;
		$.get(this.app.apiHost + "/appeal_statuses.json", $.proxy(this.getAppealsListLast_, this));
	},
  
	initialize: function(){
		this.CSS = { "CONTAINER": "#bg-event-image" }
		this.elements = { "CONTAINER": $(this.CSS["CONTAINER"]) }

		this.map = new Map(this.app, this);

		this.appealsList = AppealsList;
		this.appealsList.panel = this;
		
		this.requisitionInfoWidget = RequisitionInfoWidget;
		this.requisitionInfoWidget.panel = this;
		
		$.get(this.app.apiHost + "/appeal_types.json", $.proxy(this.getAppealsList_, this));
	},

	show: function() {
		this.appealsList.show();
		this.elements["CONTAINER"].removeClass("onHidden");
		
		this.map.show(this.map.currentZoom)
		if (Number(this.map.currentZoom) == 3 && Number(this.map.currentRegion) == 72) {
		  this.widgets.alarm.show()
		}
		//this.app.pageTitleWidget.show();
	},

	hide: function() {
		this.elements["CONTAINER"].addClass("onHidden");
	_.each(this.widgets, function(w){ w.hide() })
		this.map.miniMap.opacityHidden();

	}
});

var SvpPanel = Panel.extend({

    initialize: function(){
        this.CSS = { "CONTAINER": "#bg-event-image" }
        this.elements = { "CONTAINER": $(this.CSS["CONTAINER"]) }

        this.widgets.mainWidget = new EventMainWidget(this);
        this.widgets.mainWidget.showMap();

        this.widgets.sidebarWidget = new EventSidebarWidget(this);
        this.widgets.sidebarWidget.showTrucks();

        this.map = new EventsMapStateManager(this.app, this);
    },

    show: function() {
		    this.elements["CONTAINER"].removeClass("hidden");
        this.map.show();
        _.each(this.widgets, function(w){ w.show(); });
        this.app.pageTitleWidget.set('Транспорт').show();
	},

	hide: function() {
		this.elements["CONTAINER"].addClass("hidden");
        _.each(this.widgets, function(w){ w.hide(); });
		this.map.miniMap.opacityHidden();
	}
});

var DchPanel = Panel.extend({

    initialize: function(){
		this.CSS = { "CONTAINER": "#bg-event-image" }
		this.elements = { "CONTAINER": $(this.CSS["CONTAINER"]) }

		this.widgets.videoMain = VideoMainWidget;
		this.widgets.videoMain.panel = this;
		this.widgets.videoMain.init();
		this.widgets.videoMain.create();
    },

    show: function() {
		this.elements["CONTAINER"].removeClass("hidden");
		this.app.pageTitleWidget.set('ВН').show();
		_.each(this.widgets, function(w){ w.show(); });
	},

	hide: function() {
		this.elements["CONTAINER"].addClass("hidden");

		_.each(this.widgets, function(w){ w.hide(); });
	}
});

var TariffsPanel = Panel.extend({

    initialize: function(){
        this.CSS = { "CONTAINER": "#bg-tariff-image" };
        this.elements = { "CONTAINER": $(this.CSS["CONTAINER"]) };

        this.stateWidgets = {
        	cameras: {},
        	tariffs: {},
        	ramks: {}
        }
        
        this.widgets.navWidget = TariffNavWidget;
        this.widgets.navWidget.panel = this;
        this.widgets.navWidget.init();
        this.widgets.navWidget.create();

        this.stateWidgets.cameras.list = TariffCamersListWidget;
        this.stateWidgets.cameras.main = TariffCamersMainWidget;

        this.stateWidgets.tariffs.list = new TariffListWidget(this);
        this.stateWidgets.tariffs.main = new TariffMainWidget(this);

        this.stateWidgets.ramks.list = TariffRamkListWidget;
        this.stateWidgets.ramks.main = TariffRamkMainWidget;
        
        this.map = new EventsMapStateManager(this.app, this);
        this.createAllWidgets();
    },

    changeState: function(state) {
    	this.hideAllState();
    	this.showState(state);
    },

    createAllWidgets: function(state) {
    	console.log(this);
    	var self = this;
    	_.each(this.stateWidgets, function(w){ 
        	_.each(w, function(w2) {
        		w2.panel = self;
		        w2.init();
		        w2.create();
        	});
        });
    },

    show: function() {
        this.elements["CONTAINER"].removeClass("hidden");
        _.each(this.widgets, function(w){ 
        	w.show(); 
       	});
        this.app.pageTitleWidget.set('Справочники').show();
        this.changeState("cameras");
    },

    showState: function(state) {
    	_.each(this.stateWidgets[state], function(w){ 
        	w.show();
        });
    },

    hideAllState: function() {
    	_.each(this.stateWidgets, function(w){ 
        	_.each(w, function(w2){
        		w2.hide();
        	});
        });
    },

    hide: function() {
        this.elements["CONTAINER"].addClass("hidden");
        _.each(this.widgets, function(w){ 
        	w.hide();
        });
        this.hideAllState();
        this.map.miniMap.opacityHidden();

        this.widgets.navWidget.clear();
    }
});
