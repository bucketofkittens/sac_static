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
      $('#sampleMovie').one('ended', function(){
        $('#sampleMovie')[0].pause();
        self.elements["SCENEINFO"].addClass('hidden')
        self.showExtraWidgets()
        self.showInfo()
      })
    }

    this.showExtraWidgets = function(){
        var self = this;
        _.each(self.panel.widgets, function(wdgt) { wdgt.reset && wdgt.reset(); });
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
        setTimeout(function(){
          $('#sceneinfo-extra-7 .waveform').addClass('waveform-playback');
        },400)
    }

    this.zlobinPos = {top: 274, left: 383};
    this.patrols = [
        {
            index: 0,
            type: 'patrolcar',
            current: {top: 478, left: 180, msecs: 0},
            startedAt: null,
            finished: false,
            route: [
                {top: 478, left: 180, msecs:      0, status: 'Отправляем данные...'},
                {top: 478, left: 180, msecs:   5000, status: 'Приказ принят'},
                {top: 454, left: 190, msecs:  10000},
                {top: 292, left: 287, msecs:  80000},
                {top: 307, left: 322, msecs: 100000},
                {top: 284, left: 388, msecs: 120000, status: 'Готовы'},
                {top: 274, left: 383, msecs: 125000, status: 'Приступили'},
                {top: 274, left: 383, msecs: 140000, status: 'Преступник обезврежен'}
            ]
        },
        {
            index: 1,
            type: 'patrol',
            current: {top: 216, left: 103, msecs: 0},
            startedAt: null,
            finished: false,
            route: [
                {top: 216, left: 103, msecs:      0, status: 'Отправляем данные...'},
                {top: 216, left: 103, msecs:   5000, status: 'Приказ принят'},
                {top: 223, left:  99, msecs:  10000},
                {top: 229, left: 278, msecs:  70000},
                {top: 258, left: 284, msecs:  85000},
                {top: 271, left: 350, msecs: 100000},
                {top: 257, left: 367, msecs: 110000},
                {top: 270, left: 388, msecs: 120000, status: 'Готовы'},
                {top: 274, left: 383, msecs: 125000, status: 'Приступили'},
                {top: 274, left: 383, msecs: 135000, status: 'Преступник обезврежен'}
            ]
        },
        {
            index: 2,
            type: 'patrolcar',
            current: {top: 115, left: 475, msecs: 0},
            startedAt: null,
            finished: false,
            route: [
                {top: 115, left: 475, msecs:      0, status: 'Отправляем данные...'},
                {top: 115, left: 475, msecs:   5000, status: 'Приказ принят'},
                {top: 118, left: 462, msecs:  10000},
                {top: 107, left: 440, msecs:  15000},
                {top: 257, left: 367, msecs:  60000},
                {top: 270, left: 388, msecs:  80000, status: 'Готовы'},
                {top: 274, left: 383, msecs:  85000, status: 'Приступили'},
                {top: 274, left: 383, msecs: 100000, status: 'Преступник обезврежен'}
            ]
        }
    ];

    this.mapTag; 
    this.zlobin;
    this.patrolMarks;
    this.operationState;
    this.operationTimer;

    this.patrolMenu = function(e) {
        var self = this;
        if ($('#scene-patrol-menu').css('display') == 'block') {
            $('#scene-patrol-menu').remove();
        } else {
            //console.log('Patrol menu is invoked on', console.log(e));
            // HTML-содержимое контекстного меню.
            var menuContent =
                    '<div id="scene-patrol-menu">\
                        <span class="close"></span>\
                        <div align="center"><input type="submit" value="Отправить" /></div>\
                    </div>';

            // Размещаем контекстное меню на странице
            $('body').append(menuContent);

            // Задаем позицию меню.
            $('#scene-patrol-menu').css({
                left: e.clientX,
                top: e.clientY
            });

            var that = e.target;
            $('#scene-patrol-menu input[type="submit"]').click(function () {
                index = parseInt(that.getAttribute('data-index'));
                console.log('Launching patrol with index', index);
                self.patrols[index].startedAt = new Date();
                $('#scene-patrol-menu').remove();
            });

            $('#scene-patrol-menu .close').click(function (e) {
                $("#scene-patrol-menu").remove();
            });
        }
    }

    this.operationProceed = function(time) {
        var activePatrols = _.filter(this.patrols, function(patrol) {
            return patrol.startedAt && !patrol.finished;
        })
        console.log('Animating', activePatrols.length, 'patrols');
        _.each(activePatrols, function (patrol) {
            var elapsed = time - patrol.startedAt;
            var patrolMark = $('.police.placemark[data-index='+patrol.index+']', self.mapTag);
            // Remove stale segments
            var staleSegments = _.filter(patrol.route, function (segment) {
               return segment.msecs < elapsed;
            });
            _.each(staleSegments, function (route) {
                patrol.current = {top: route.top, left: route.left, msecs: elapsed};
                var segment = patrol.route.shift();
                if (segment.status) {
                    patrolMark.text(segment.status);
                } else patrolMark.text(null);
            });
            if (!patrol.route.length) {
                patrol.finished = true;
                operationState  = 'finished';
                clearInterval(operationTimer);
            } else {
                // Start calculation
                var timeRange = patrol.route[0].msecs - patrol.current.msecs;
                var timeDiff  = elapsed - patrol.current.msecs;
                // Latitude calculation
                var topDiff = patrol.route[0].top - patrol.current.top;
                var top = patrol.current.top + topDiff * ( timeDiff / timeRange );
                // Longitude
                var leftDiff = patrol.route[0].left - patrol.current.left;
                var left = patrol.current.left + leftDiff * ( timeDiff / timeRange );
                // Done
                patrolMark.css({ top: top, left: left });
            }
        });
    }

    this.onCameraClick_ = function(e) {
        var index = $(e.target).attr("data-index");

        var camera = null;
        _.each(window.AppData.camers, function(cm) {
            if(cm.index == index) {
                camera = cm;
            }
        })

        var html = '<div style="margin-top: 40px; left:'+$(e.target).css("left")+'; top: '+$(e.target).css("top")+'" class="tooltip-main-map tooltip bottom blue event-ramp-menu" data-index="'+index+'">' +
        '    <span class="close"></span> ' +
        '    <div class="tooltip-obscure">' +
        '        <div class="center">' +
        '            <p class="gosnumber">'+camera.number+'</p>' +
        '            <p>'+camera.adress+'</p>' +
        '        </div>' +
        '    </div>' +
        '</div>';

        this.mapTag.append(html);

        $(".tooltip-main-map .close").on("click", function() {
            $(".tooltip-main-map").remove();
        })

        $(".tooltip-main-map .gosnumber").on("click", function() {
            $(".tooltip-main-map").remove();

            $.get('/static/compile/scene/camera.html', {}, function (data, status, jqxhr) {
                //rtsp://<%= camera.ip %>/video.pro1
                camera.path = showFakeCamera(camera, camera.ip);
                data = _.template(data, { camera : camera});
                $("#camera-info").append(data);
                $("#camera-info").show();
                $("#camera-info").on("click", ".close", function() {
                    $("#camera-info").html("");
                    $("#camera-info").hide();
                })
            });
        })
        

        /*
        
        

        
        */
    }

    this.close = function() {
        $("#camera-info").html("");
        $("#camera-info").hide();
    }

    this.drawMapItems = function() {
        var self = this;
        this.mapTag = $('#scene-info-map');
        // Add Zlobin to the map
        this.zlobin = $('<div class="placemark criminal">');
        this.zlobin.css(this.zlobinPos);
        this.mapTag.append(this.zlobin);

        // Add patrols to the map
        _.each(this.patrols, function (patrol, index) {
            var patrolMark = $('<div class="placemark police">');
            patrolMark.attr('data-index', index);
            patrolMark.addClass(patrol.type);
            patrolMark.css({left: patrol.current.left, top: patrol.current.top});
            self.mapTag.append(patrolMark);
        });

        _.each(window.AppData.camers, function (camera, index) {
            var cameraMark = $('<div class="camera">');
            cameraMark.attr('data-index', camera.index);
            cameraMark.css({left: camera.position.left, top: camera.position.top});
            self.mapTag.append(cameraMark);
        });

        this.mapTag.on('click', '.police.placemark', $.proxy(this.patrolMenu, this) );
        this.mapTag.on('click', '.camera', $.proxy(this.onCameraClick_, this) );

        // Start animation
        this.operationTimer = setInterval(function(){ webkitRequestAnimationFrame($.proxy(self.operationProceed, self)) }, 100);
    }

    this.showMap = function (e) {
        e.preventDefault()
        that = this;
        that.elements["SCENEINFO"].addClass('hidden');
        var self = this;
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
                    self.drawMapItems();
                });
            }, 400);
        }
        setTimeout(function(){ $('#sceneinfo-extra-7 .waveform').addClass('waveform-playback'); },400)
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
      setTimeout(function(){ $('#sceneinfo-extra-7 .waveform').addClass('waveform-playback'); },400)
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
                    if (page == 'track') {
                      var t = new Date(new Date() - 5 * 60 * 1000)
                      var d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate()
                      var month = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1)
                      var hours = t.getHours() < 10 ? '0' + t.getHours() : t.getHours()
                      var minutes = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes()
                      var alarmDate = d + '.' + month + '.' + t.getFullYear();
                      var alarmTime = hours + ':' + minutes;
                      $('.alarmDate').text(alarmDate);
                      $('.alarmTime').text(alarmTime);
                    }
                    if (page == 'email') { that.bindEmailEvents(); }
                });
            }, 400);
        }
        if (page != 'phone') {
          setTimeout(function(){ $('#sceneinfo-extra-7 .waveform').addClass('waveform-playback'); },400)
        } else {
          setTimeout(function(){ $('#sceneinfo-extra-7 .waveform').removeClass('waveform-playback'); },400)
        }
    }

    this.bindEmailEvents = function() {
      $('#email-left table td').on('click', function(e){
        e.stopPropagation()
        var tr = $(e.target).closest('tr')
        $('#email-right .email').addClass('hidden');
        $('#email-right .' + $(tr).attr('id')).removeClass('hidden')
        $('#email-left table tbody tr').removeClass('active')
        $(tr).addClass('active')
      })

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
        "ONRESET": function() {},
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

    this.reset = function() {
        this.CSS["ONRESET"]();
        return this;
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
        var hideToDirClass   = 'hide-to-'+direction;
        var showFromDirClass = 'hide-to-'+opposite;
        var hidden = $('.sceneinfo-extras.'+side+'.hidden.hide-to-'+opposite);
        if (hidden.length) {
            var that = $('.sceneinfo-extras.'+side+'.'+direction);
            var middle = $('.sceneinfo-extras.'+side+'.middle');
            var distant = $('.sceneinfo-extras.'+side+'.'+opposite);
            // Hide that (nearest to button)
            that.addClass(hideToDirClass).addClass('hidden').removeClass(direction);
            var num_hide = that.attr('id').match(/sceneinfo-extra-(\d+)/)[1];
            self.panel.widgets['wx' + num_hide].hide();
            // Move middle to that's place
            middle.removeClass('middle').addClass(direction);
            // Move distant to middle's place
            distant.removeClass(opposite).addClass('middle');
            // Move first hidden to distant's place
            var toShow = direction == 'top' ? hidden.first() : hidden.last();
            toShow.removeClass(showFromDirClass).removeClass('hidden').addClass(opposite);
            var num_show = toShow.attr('id').match(/sceneinfo-extra-(\d+)/)[1];
            self.panel.widgets['wx' + num_show].show();
        }
    }, this));

}
