/**
 * [OnGraphUpdateEvent description]
 * @param {[type]} app [description]
 */
var OnGraphUpdateEvent = function(panel) {
	this.panel = panel;

	this.onGraphDataRequest_ = function(data) {
		$(this.panel.widgets.graph.CSS["LOAD"]).removeClass("onShow");
		this.panel.widgets.graph.showGraph();
		this.panel.widgets.graph.updateContent(data);
	}
	
	this.panel.app.graphManager.getGraph(
		this.panel.widgets.regionsSelector.getCurrentIds(),
		this.panel.widgets.paramsSelector.getCurrentIds(),
		this.panel.widgets.graph.getBeginData(),
		this.panel.widgets.graph.getEndData(),
		$.proxy(this.onGraphDataRequest_, this)
	);
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var OnDistrictUpdateMapEvent = function(panel) {
	this.panel = panel;

	this.panel.app.paramsManager.getParamsByRegionAndYeage(
		this.panel.map.currentRegion, 
		this.panel.widgets.yearSelector.selectedYear, 
		$.proxy(this.panel.widgets.parametrs.getParametrs_, this.panel.widgets.parametrs)
	);
	if(this.panel.widgets.parametrs.currentParametr) {
		this.panel.mapColorel.colored(
			this.panel.widgets.parametrs.currentParametr.id, 
			this.panel.map.currentRegion, 
			this.panel.widgets.yearSelector.selectedYear
		);
		if (this.panel.widgets.mapColor) this.panel.widgets.mapColor.updateParams();
		this.panel.app.legendManager.getLegendByParamAndSubject(
			this.panel.widgets.parametrs.currentParametr.id, 
			this.panel.map.currentRegion
		);
	}
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var OnFormatUpdateContentEvent = function(panel) {
  this.panel = panel
	this.panel.widgets.format.updateContent();
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var OnEvensMapChangeState = function(app) {
	this.app = app;
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var OnDistrictChangeState = function(app, map, video_id, currentRegion) {
	this.app = app;
	this.map = map;
  this.widgets = this.map.panel.widgets
	this.finishEvent = 0;
	this.maxEvent = 2;

	this.onAfterEvent_ = function() {
		this.finishEvent += 1;
		this.testEvents_();
	}

	this.testEvents_ = function() {
		if(this.finishEvent == this.maxEvent) {
			this.onAllFinish_();
		}
	}

	this.onAllFinish_ = function() {
		this.finishEvent = 0;

		this.map.SVGWriter.show();
		this.map.show();

    if (this.map.panel.mapColorel) {
		  this.map.panel.mapColorel.show();
    }

		this.app.videoPlayer.hide();
		
		if(this.map.onAfterStateChange) {
			this.map.onAfterStateChange();
		}
	}

	var self = this;

	if(this.widgets.parametrs && this.widgets.parametrs.currentParametr != null && this.map.panel.mapColorel) {
		this.map.panel.mapColorel.colored(
			this.widgets.parametrs.currentParametr.id, 
			this.map.currentRegion, 
			this.map.panel.widgets.yearSelector.selectedYear,
			$.proxy(this.onAfterEvent_, this)
		);
		this.app.legendManager.getLegendByParamAndSubject(
			this.map.panel.widgets.parametrs.currentParametr, 
			this.map.panel.widgets.parametrs.currentParametr.id,
			function(data) {
				self.app.legendWidget.setLevelText(data);
				self.app.legendWidget.show();
			}
		);
	} else {
		this.finishEvent += 1;
		this.app.legendWidget.hide();
	}

	this.app.videoPlayer.play(
		video_id,
		{
			onEndedCallback: $.proxy(this.onAfterEvent_, this),
			//poster: this.mapStateManager.getBgImage()	
			poster: this.map.bgImage	
		}
	);
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var OnEventsChangeState = function(app, map, video_id, currentRegion) {
	this.app = app;
	this.map = map;
  this.widgets = this.map.panel.widgets
	this.finishEvent = 0;
	this.maxEvent = 2;

	this.onAfterEvent_ = function() {
		this.finishEvent += 1;
		this.testEvents_();
	}

	this.testEvents_ = function() {
		if(this.finishEvent == this.maxEvent) {
			this.onAllFinish_();
		}
	}

	this.onAllFinish_ = function() {
		this.finishEvent = 0;

		this.map.SVGWriter.show();
		this.map.show();

    if (this.map.panel.mapColorel) {
		  this.map.panel.mapColorel.show();
    }

		this.app.videoPlayer.hide();
		
		if(this.map.onAfterStateChange) {
			this.map.onAfterStateChange();
		}
	}

	var self = this;

	this.finishEvent += 1;
	//this.app.legendWidget.hide();

	this.app.videoPlayer.play(
		video_id,
		{
			onEndedCallback: $.proxy(this.onAfterEvent_, this),
			poster: this.map.bgImage	
		}
	);
}
