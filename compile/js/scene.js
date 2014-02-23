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
        if (this.panel.alertShown) {
          this.panel.widgets.wx1.show()
          this.showExtraWidgets()
          this.showInfo()
        } else {
          this.showLoad();
        }
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
        self.showExtraWidgets()
        self.elements["SCENEINFO"].addClass('onHidden')
        self.showInfo()
      })
    }

    this.showExtraWidgets = function(){
        var self = this;
        setTimeout(function(){ self.panel.widgets['wx2'].show() },  300);
        setTimeout(function(){ self.panel.widgets['wx3'].show() },  600);
        setTimeout(function(){ self.panel.widgets['wx4'].show() }, 1200);
        setTimeout(function(){ self.panel.widgets['wx5'].show() }, 1500);
        setTimeout(function(){ self.panel.widgets['wx6'].show() }, 1800);
        setTimeout(function(){ self.panel.widgets['mgmtTopRight'].show() },    2000);
        setTimeout(function(){ self.panel.widgets['mgmtBottomRight'].show(); self.panel.alertShown = true; }, 2000);
    }

    this.showInfo = function (e) {
        if (e) e.preventDefault()
        that = this;
        that.elements["SCENEINFO"].addClass('hidden');
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

    this.showHtml = function(page) {
        that = this;
        that.elements["SCENEINFO"].addClass('hidden')
        // Load data to its container unless it's already there
        var thisContainer = $('#sceneinfo-' + page);
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            setTimeout(function() {
                thisContainer = $('<div id="sceneinfo-' + page + '" class="sceneinfo-panel hidden hide-to-right">');
                that.elements["MAIN"].append(thisContainer);
                $.get('/static/compile/scene/'+ page +'.html', {}, function (data, status, jqxhr) {
                    thisContainer.html(data);
                    thisContainer.siblings().addClass('hidden');
                    thisContainer.removeClass('hidden');
                    if (page == 'phone') {
                      setTimeout(function(){
                        $('#sceneinfo-phone .waveform').addClass('waveform-playback');
                      },400)
                    }
                });
            }, 400);
        }
    }

    this.showText  = function(e) { this.showHtml('text') }
    this.showTrack = function(e) { this.showHtml('track') }
    this.showEmail = function(e) { this.showHtml('email') }
    this.showPhone = function(e) { this.showHtml('phone'); }
    this.showProperties = function(e) { this.showHtml('properties') }


    // Bind events to main menu
    /*$('#sceneinfo-main   a', this.elements["MAIN"]).on('click', $.proxy(this.showInfo, this));
    $('#sceneinfo-map    a', this.elements["MAIN"]).on('click', $.proxy(this.showMap, this));
    $('#sceneinfo-forces a', this.elements["MAIN"]).on('click', $.proxy(this.showForces, this));*/

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


var SceneInfoExtraMgmtWidget = function(panel, options) {
    this.panel = panel;
    this.options = jQuery.extend({
        "ONSHOW": function() {},
        "ONHIDE": function() {},
        "ONCLICK": function() {}
    }, options);

    this.elements = {
        "MAIN": $(".sceneinfo-extras-mgmt."+this.options.side+"."+this.options.direction)
    };

    this.show = function() {
        this.elements["MAIN"].removeClass('hidden');
        this.options["ONSHOW"]();
    };

    this.hide = function() {
        this.elements["MAIN"].addClass('hidden');
        this.options["ONHIDE"]();
    };

    this.setContent = function (content) {
        this.elements["SCENEINFO"].html(content);
    };

    this.elements["MAIN"].on('click', $.proxy(this.options["ONCLICK"], this));

    this.elements["MAIN"].on('click', $.proxy(function (){
        var self = this;
        var direction = this.options.direction;
        var side = this.options.side;
        var opposite = direction == 'top' ? 'bottom' : 'top';
        var hideClass = direction == 'top' ? 'hide-to-top' : 'hide-to-bottom';
        var hidden = $('.sceneinfo-extras.'+side+'.hidden.hide-to-'+opposite);
        if (hidden.length) {
            var that = $('.sceneinfo-extras.'+side+'.'+direction);
            var middle = $('.sceneinfo-extras.'+side+'.middle');
            var distant = $('.sceneinfo-extras.'+side+'.'+opposite);

            that.addClass('hidden '+hideClass).removeClass(direction);
            var num_hide = that.attr('id').match(/sceneinfo-extra-(\d+)/)[1];
            self.panel.widgets['wx' + num_hide].hide();

            middle.removeClass('middle').addClass(direction);
            distant.removeClass(opposite).addClass('middle');

            var toShow = direction == 'top' ? hidden.first() : hidden.last();
            toShow.removeClass('hidden hide-to-'+opposite).addClass(opposite);
            var num_show = toShow.attr('id').match(/sceneinfo-extra-(\d+)/)[1];
            self.panel.widgets['wx' + num_show].show();
        }
    }, this));

}
