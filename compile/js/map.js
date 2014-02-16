var Map = function(app, panel) {
  this.app = app;
  this.panel = panel;
  this.currentRegion = 100;
  this.currentZoom = 1;
  this.miniMap = new MiniMapWriter();
	this.bgImage = {};
	this.regions = {};
	this.currentRegionData = {};

  this.initialize.apply(this, arguments);
}

_.extend(Map.prototype, {

  initialize: function(){
    this.bg = $(this.stateCSS['BG-IMAGE']);
    this.setStateEvent();
    /*this.onAfterStateChange = function(){
      console.log(this.currentZoom)
      console.log(this.currentRegion)
    }*/
    this.SVGWriter = new SVGLoader(this.app, {
      onClick: $.proxy(this.onSvgClick_, this),
      map: this
    });
  },

  setStateEvent: function(){
	  this.OnDistrictChangeState = new signals.Signal();
	  this.OnDistrictChangeState.add(OnDistrictChangeState);
  },

  getStateEvent: function(){
    return this.OnDistrictChangeState
  },

	stateCSS: {
		"BG-IMAGE": "#bg-image"
	},

	addBlur: function() {
		this.bg.addClass("blur");
	},

	removeBlur: function() {
		this.bg.removeClass("blur");
	},

	setPrevRegion: function(data) {
		this.prevRegion = data;
		this.miniMap.setText(this.prevRegion.name);
		this.miniMap.show(
			this.app.configManager.getMiniMapById(this.currentRegion), 
			$.proxy(this.onBack_, this)
		);
	},

	setRootRegions: function(data) {
		this.regions = this.app.regionsManagerLocal.getRegionsByParent(this.currentRegion, data);
		this.currentRegionData = this.app.regionsManagerLocal.getRegionById(this.currentRegion, data);

		this.app.setAppTitle(this.currentRegionData.name);
		if(this.currentZoom != 1) {
			if(this.currentRegionData.parent_id) {
				this.setPrevRegion(
					this.app.regionsManagerLocal.getRegionById(
						this.currentRegionData.parent_id, 
						data
					)
				);
			}
		}
	},

	show: function() {
		this.app.regionsManagerLocal.getRegions($.proxy(this.setRootRegions, this));
		
		this.setBgImage();
		if (this.panel.widgets.mapColor) this.panel.widgets.mapColor.updateParams();
		this.SVGWriter.load(this.app.configManager.getSvgById(this.currentRegion));
		if (this.panel.widgets.parametrs) this.panel.widgets.parametrs.getParamsByRegionAndYeage(this.currentRegion);
	},

  getBgImage: function(){
	  return this.app.configManager.getMapById(this.currentRegion);
  },

	setBgImage: function(bgImageLoaded) {
		this.bgImage = this.getBgImage();
		this.bg.css("backgroundImage", "url('"+this.bgImage+"')");
	},

	onBack_ : function() {
		this.onBeforeVideoPlay_();

		var outVideo = this.app.configManager.getOutVideoById(this.currentRegion);

		this.currentRegion = this.prevRegion.id;
    this.currentZoom--;

		this.getStateEvent().dispatch(this.app, this, outVideo);

		this.app.legendWidget.hide();
	},

	clear: function() {
		this.miniMap.hiden();
	},

	onBeforeVideoPlay_ : function() {
		this.miniMap.hiden();
    if (this.panel.mapColorel) this.panel.mapColorel.hidden();
		this.SVGWriter.hide();
	},

	onSvgClick_ : function(evt) {
		var newIdRegion = $(evt.target).parent().attr("target");

		if(newIdRegion) {
			this.app.legendWidget.hide();
			var inVideo = this.app.configManager.getInVideoById(newIdRegion);
			if(inVideo) {
				this.onBeforeVideoPlay_();

				this.currentRegion = newIdRegion;
        this.currentZoom++;

				this.getStateEvent().dispatch(this.app, this, inVideo);
			}
		}
	}
});

Map.extend = extend;

var EventsMapStateManager = Map.extend({

	stateCSS: {
		"BG-IMAGE": "#bg-event-image"
	},

  setStateEvent: function(){
	  this.OnEventsChangeState = new signals.Signal();
	  this.OnEventsChangeState.add(OnEventsChangeState);
  },

  getStateEvent: function(){
    return this.OnEventsChangeState
  },

  getBgImage: function(){
    if (this.currentRegion == 100) {
		  return '/static/images/bg-map-events-100.jpg';
    } else if (this.currentRegion == 101) {
		  return '/static/images/bg-map-events-101.jpg';
    } else {
		  return this.app.configManager.getMapById(this.currentRegion);
    }
  },

	onBeforeVideoPlay_ : function() {
		this.miniMap.hiden();
		this.SVGWriter.hide();
    this.panel.widgets.alarm.hide()
	},

  onAfterStateChange: function(){
    if (this.currentZoom == 3 && this.currentRegion == 63) {
      this.panel.widgets.alarm.show()
    }
  }
});

var MapStateManager = Map.extend({
});
