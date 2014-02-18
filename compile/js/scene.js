// Example: w = new SceneInfoWidget(app); w.show();

var SceneInfoWidget = function(app, panel) {
    this.app = app;
    this.panel = panel;
    
    this.scrollApi = null;

    this.CSS = {
        "MAIN": "#sceneinfo-content",
        "SCENEINFO": "#sceneinfo-panel"
    }

    this.elements = {
        "MAIN": $(this.CSS["MAIN"]),
        "SCENEINFO": $(this.CSS["SCENEINFO"])
    }

    this.show = function() {
        this.elements["MAIN"].removeClass('hidden');
        this.showLoad();
    }

    this.hide = function() {
        this.elements["MAIN"].addClass('hidden');
    }

    this.setContent = function (content) {
        this.elements["SCENEINFO"].html(content);
        this.elements["SCENEINFO"].removeClass('hidden');
        this.elements["SCENEINFO"].siblings().addClass('hidden');
    }

    this.showLoad = function(){
      this.elements["SCENEINFO"].html('<div id="scene-load" class="onShow">' +
                                      '<p class="text" id="scene-loading"></p>'+
                                      '<img src="/static/images/load.png" id="load-image" alt="">'+
                                      '</div>')
      this.panel.widgets.wx1.show()
      var self = this
      $('#sampleMovie').on('ended', function(){
        $('#sampleMovie')[0].pause();
         _.each(['wx2', 'wx3', 'wx4', 'wx5', 'wx6'], function(w){self.panel.widgets[w].show()})
        self.elements["SCENEINFO"].addClass('onHidden')
        self.showInfo()
      })
    }

    /*this.showVideo = function (hide) {
        if (!_.isBoolean(hide)){
          hide.preventDefault()
        }
        that = this;
        if (hide) $('.sceneinfo-panel', that.elements["SCENEINFO"]).addClass('hidden');
        $('#sceneinfo-main', this.elements["MAIN"]).siblings().removeClass('current');
        $('#sceneinfo-main', this.elements["MAIN"]).addClass('current');
        var thisContainer = $('#sceneinfo-panel-main');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            setTimeout(function() {
                var thisContainer = $('<div id="sceneinfo-panel-main" class="sceneinfo-panel '+ ( hide ? 'hidden' : '' ) + ' hide-to-left">');
                that.elements["MAIN"].append(thisContainer);
                $.get('/static/compile/scene/video.html', {}, function (data, status, jqxhr) {
                    thisContainer.html(data);
                    thisContainer.siblings().addClass('hidden');
                    thisContainer.removeClass('hidden');
                    var video = thisContainer.find('video');
                    video[0].play()
                    video.on('ended', function(){
                      $('#video-text-1').removeClass('hidden')
                      setTimeout(function(){
                        _.each(['wx1', 'wx4', 'wx2', 'wx5', 'wx3', 'wx6'], function(w){that.panel.widgets[w].show()})
                        $('#video-text-1').removeClass('onHidde')
                        that.showInfo()
                      }, 2000)
                  })
                });
            }, (hide ? 400 : 0));
        }
      }*/

    this.showInfo = function (e) {
        if (e) e.preventDefault()
        that = this;
        that.elements["SCENEINFO"].addClass('hidden');
        $('#sceneinfo-map', this.elements["MAIN"]).siblings().removeClass('current');
        $('#sceneinfo-map', this.elements["MAIN"]).addClass('current');
        var thisContainer = $('#sceneinfo-panel-info');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            setTimeout(function() {
                thisContainer = $('<div id="sceneinfo-panel-info" class="sceneinfo-panel hidden hide-to-left">');
                that.elements["MAIN"].append(thisContainer);
                $.get('/static/compile/scene/info.html', {}, function (data, status, jqxhr) {
                    thisContainer.html(data);
                    thisContainer.siblings().addClass('hidden');
                    thisContainer.removeClass('hidden');
                });
            }, 400);
        }
    }

    this.showMap = function (e) {
        e.preventDefault()
        that = this;
        that.elements["SCENEINFO"].addClass('hidden');
        $('#sceneinfo-map', this.elements["MAIN"]).siblings().removeClass('current');
        $('#sceneinfo-map', this.elements["MAIN"]).addClass('current');
        var thisContainer = $('#sceneinfo-panel-map');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            setTimeout(function() {
                thisContainer = $('<div id="sceneinfo-panel-map" class="sceneinfo-panel hidden hide-to-left">');
                that.elements["MAIN"].append(thisContainer);
                $.get('/static/compile/scene/map.html', {}, function (data, status, jqxhr) {
                    thisContainer.html(data);
                    thisContainer.siblings().addClass('hidden');
                    thisContainer.removeClass('hidden');
                    // Map stuff
                    // TODO: Map scripts
                });
            }, 400);
        }
    }

    this.showSimpleContent = function(options){
      var that = this;
      that.elements["SCENEINFO"].addClass('hidden')
      var thisContainer = $('#'+options.id);
      if (thisContainer.length) {
        thisContainer.removeClass('hidden');
        thisContainer.siblings().addClass('hidden');
      } else {
        thisContainer = $('<div id="'+ options.id +'" class="sceneinfo-panel hidden hide-to-right">');
        that.elements["MAIN"].append(thisContainer);
        thisContainer.html(options.content);
        thisContainer.siblings().addClass('hidden');
        thisContainer.removeClass('hidden');
      }
    }

    this.showText = function (e) {
        e.preventDefault()
        that = this;
        that.elements["SCENEINFO"].addClass('hidden')
        $('#sceneinfo-text', this.elements["MAIN"]).siblings().removeClass('current');
        $('#sceneinfo-text', this.elements["MAIN"]).addClass('current');
        // Load data to its container unless it's already there
        var thisContainer = $('#sceneinfo-text');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            setTimeout(function() {
                thisContainer = $('<div id="sceneinfo-text" class="sceneinfo-panel hidden hide-to-right">');
                that.elements["MAIN"].append(thisContainer);
                $.get('/static/compile/scene/text.html', {}, function (data, status, jqxhr) {
                    thisContainer.html(data);
                    thisContainer.siblings().addClass('hidden');
                    thisContainer.removeClass('hidden');
                    // Map stuff
                    // TODO: Map scripts
                });
            }, 400);
        }
    } 

    this.showGraph = function (e) {
        e.preventDefault()
        this.showSimpleContent({
          id: 'sceneinfo-graph',
          content: '<img src="/static/images/connect.png">'
        })
    }

    this.showDiagram = function (e) {
        e.preventDefault()
        this.showSimpleContent({
          id: 'sceneinfo-diagram',
          content: '<img src="/static/images/scene/diagram.png">'
        })
    }


    // Bind events to main menu
    $('#sceneinfo-main   a', this.elements["MAIN"]).on('click', $.proxy(this.showInfo, this));
    $('#sceneinfo-map    a', this.elements["MAIN"]).on('click', $.proxy(this.showMap, this));
    $('#sceneinfo-forces a', this.elements["MAIN"]).on('click', $.proxy(this.showForces, this));

}

// Example: wx2 = new SceneInfoExtraWidget(app, {MAIN: '#sceneinfo-extra-2'}); wx2.show();

// _.each([1,2,3,4,5,6], function(i){ w = new SceneInfoExtraWidget(app, {MAIN: '#sceneinfo-extra-'+i}); w.show();})

var SceneInfoExtraWidget = function(app, options) {
    this.app = app;
    this.CSS = jQuery.extend({
        "MAIN": "#sceneinfo-extra-1",
        "LOAD": "#load",
        "ONSHOW": function() {},
        "ONHIDE": function() {},
        "ONCLICK": function() {}
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
        this.CSS["ONSHOW"]();
    }

    this.hide = function() {
        this.elements["MAIN"].addClass('hidden');
        this.CSS["ONHIDE"]();
    }

    this.setContent = function (content) {
        this.elements["SCENEINFO"].html(content);
    }

    this.elements["MAIN"].on('click', $.proxy(this.CSS["ONCLICK"], this));

}
