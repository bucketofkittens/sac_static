var Map = function(app, panel) {
  this.app = app;
  this.panel = panel;
  this.currentRegion = 100;
  this.currentZoom = 1;
  this.miniMap = new MiniMapWriter();
	//this.bgImage = '';
	this.regions = {};
	this.currentRegionData = {};

  this.initialize.apply(this, arguments);
}

_.extend(Map.prototype, {

  initialize: function(){
    this.bg = $(this.stateCSS['BG-IMAGE']);
    this.setStateEvent();
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
		this.removeBlur();
		if(this.currentZoom != 1) {
			this.miniMap.opacityShow();
		}
		this.SVGWriter.load(this.app.configManager.getSvgById(this.currentRegion));
		this.SVGWriter.show();

		if (this.panel.widgets.mapColor) this.panel.widgets.mapColor.updateParams();
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
	
	getPhotos_: function(photos) {
		var self = this;
		self.photos = photos;
		
		this.panel.requisitionInfoWidget.init();
		this.panel.requisitionInfoWidget.beforeCreate_ = function(data) {
			console.log(self.photos);
			return _.template(data, { requisition: self.requisition, history: self.history, images: self.photos});
		}
		this.panel.requisitionInfoWidget.afterCreate_ = function() {
			var self = this;
			$("#requisition .close").on("click", function() {
				self.panel.requisitionInfoWidget.destroy();
			});
			$("#requisition .images .left img").on("click", function() { 
				var currentIndex = $("#requisition .images .current").index();
				currentIndex -= 1;
				
				if(currentIndex == 0) {
					currentIndex = $("#requisition .images img").size()-2;
				}
				
				console.log(currentIndex);
				
				$("#requisition .images img").removeClass("current");
				$("#requisition .images img").eq(currentIndex).addClass("current");
			});
			$("#requisition .images .right img").on("click", function() {
				var currentIndex = $("#requisition .images .current").index();
				currentIndex += 1;
				
				if(currentIndex > $("#requisition .images img").size()-2) {
					currentIndex = 1;
				}
				
				$("#requisition .images img").removeClass("current");
				$("#requisition .images img").eq(currentIndex).addClass("current");
			});
			
			$("#requisition #assign").on("click", function() {
				$.post(window.location.origin+"/requisitions/change_status", {status_id: 2, requisition_id: $("#req_id").val()}, function() {
					$(".warning1").fadeIn();
				
					$("#text1").html($(".executor option:selected").text());
				
					$("#assign").remove();
					$(".executor").remove();
					
					$("#stat").html("В работе");
				});
				
			});
			
			$(".executor").on("change", function() {
				if($(this).val() == -1) {
					$("#assign").attr("disabled", "disabled");
				} else {
					$("#assign").attr("disabled", false);
				}
			});
			
		}
		this.panel.requisitionInfoWidget.create();
		this.panel.requisitionInfoWidget.show();
	},
	
	getTypes_: function(history) {
		this.history = history;
		
		$.get(this.app.apiHost + "/requisitions/get_requisition_photos/"+this.requisition.id, $.proxy(this.getPhotos_, this));
	},
	
	showRequisition: function(requisition) {
		var self = this;
		self.requisition = requisition;
		
		$.get(this.app.apiHost + "/requisitions/get_status_history_list/by_requisition_id/"+requisition.id, $.proxy(this.getTypes_, this));
	},

	onSvgClick_ : function(evt) {
		var newIdRegion = $(evt.target).parent().attr("target");
		
		if(newIdRegion) {
			
			if(this.currentZoom == 3) {
				showGis(newIdRegion, $.proxy(this.showRequisition, this));
				this.panel.appealsList.hidden();
			} else {
				this.panel.appealsList.show();
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

  bgImage: '/static/images/bg-events-100.jpg',

  getBgImage: function(){
    if (this.currentRegion == 100) {
		  return '/static/images/bg-events-100.jpg';
    } else if (this.currentRegion == 101) {
		  return '/static/images/bg-events-101.jpg';
    } else {
		  return this.app.configManager.getMapById(this.currentRegion);
    }
  },

	onBeforeVideoPlay_ : function() {
		this.miniMap.hiden();
		this.SVGWriter.hide();
	},

  onAfterStateChange: function(){
    if (this.currentZoom == 3 && this.currentRegion == 72) {
      this.panel.widgets.alarm.show()
    }
  }
});

var MapStateManager = Map.extend({
});
