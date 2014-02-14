var OnSceneInfoUpdateEvent = function(app) {
    this.app = app;

//    this.onGraphDataRequest_ = function(data) {
//        $(this.app.graphWidget.CSS["LOAD"]).removeClass("onShow");
//        this.app.graphWidget.showGraph();
//        this.app.graphWidget.updateContent(data);
//    }
//
//    this.app.graphManager.getGraph(
//        this.app.graphRegionsSelectorWidget.getCurrentIds(),
//        this.app.graphParamsSelector.getCurrentIds(),
//        this.app.graphWidget.getBeginData(),
//        this.app.graphWidget.getEndData(),
//        $.proxy(this.onGraphDataRequest_, this)
//    );
}


// Example: w = new SceneInfoWidget(app); w.show();

var SceneInfoWidget = function(app) {
    this.app = app;
    this.scrollApi = null;
    this.onUpdateSceneInfo = new signals.Signal();
    this.onUpdateSceneInfo.add(OnSceneInfoUpdateEvent);

    this.CSS = {
        "MAIN": "#sceneinfo-content",
        "LOAD": "#load",
        "SCENEINFO": "#sceneinfo-panel"
    }

    this.elements = {
        "MAIN": $(this.CSS["MAIN"]),
        "SCENEINFO": $(this.CSS["SCENEINFO"])
    }

    this.onUpdateSceneInfoDispather_ = function() {
        this.onUpdateSceneInfo.dispatch(this.app);
    }

    this.show = function() {
        this.elements["MAIN"].removeClass('hidden');
    }

    this.hidden = function() {
        this.elements["MAIN"].addClass('hidden');
    }

    this.setContent = function (content) {
        this.elements["SCENEINFO"].html(content);
    }

}

var OnSceneInfoExtraUpdateEvent = function(app) {
    this.app = app;

//    this.onGraphDataRequest_ = function(data) {
//        $(this.app.graphWidget.CSS["LOAD"]).removeClass("onShow");
//        this.app.graphWidget.showGraph();
//        this.app.graphWidget.updateContent(data);
//    }
//
//    this.app.graphManager.getGraph(
//        this.app.graphRegionsSelectorWidget.getCurrentIds(),
//        this.app.graphParamsSelector.getCurrentIds(),
//        this.app.graphWidget.getBeginData(),
//        this.app.graphWidget.getEndData(),
//        $.proxy(this.onGraphDataRequest_, this)
//    );
}

// Example: wx2 = new SceneInfoExtraWidget(app, {MAIN: '#sceneinfo-extra-2'}); wx2.show();

var SceneInfoExtraWidget = function(app, options) {
    this.app = app;
    this.scrollApi = null;
    this.onUpdateSceneInfoExtra = new signals.Signal();
    this.onUpdateSceneInfoExtra.add(OnSceneInfoExtraUpdateEvent);

    this.CSS = jQuery.extend({
        "MAIN": "#sceneinfo-extra-1",
        "LOAD": "#load"
    }, options);

    this.elements = {
        "MAIN": $(this.CSS["MAIN"]),
        "SCENEINFO": $('.sceneinfo-extra-panel', this.CSS["MAIN"])
    }

    this.onUpdateSceneInfoExtraDispather_ = function() {
        this.onUpdateSceneInfoExtra.dispatch(this.app);
    }

    this.show = function() {
        this.elements["MAIN"].removeClass('hidden');
    }

    this.hidden = function() {
        this.elements["MAIN"].addClass('hidden');
    }

    this.setContent = function (content) {
        this.elements["SCENEINFO"].html(content);
    }

}
