// Example: w = new SceneInfoWidget(); w.show();

var EventMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = jQuery.extend({
        id: 'event-map',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.element.addClass('widget widget-xl');
    jQuery(this.options.container).append(this.element);

    

    this.truckMenu = function(e) {
        var index = parseInt(e.target.getAttribute('data-index'));
        var truck = window.AppData.trucks[index];

        $(".event-truck-menu").remove();

        var menu = new EventMapTruckMenuWidget({
            container: $('#events-map'),
            index: truck.index,
            target: e.target,
            class: 'event-truck-menu',
            side: truck.toolTipDir,
            color: (truck.type == 'bad') ? 'red' : 'blue',
        }, application.panels.SVP);
        menu.setContent('<span class="close"></span>' +
            '<div class="center">' +
            '<p class="time">'+truck.time+'</p>' +
            '<p class="gosnumber">'+truck.number+'</p>' +
            '<p class="truck-status">'+truck.status+'</p>' +
            '<p class="gosnumber more">Подробнее</p>' +
            '<div class="well photo" style="height: 220px;">' +
            '<img class="truck-photo" src="'+truck.images[0]+'">' +
            '<img class="truck-photo" src="'+truck.images[1]+'">' +
            '</div>' +
        '</div>');
        menu.show();
        truck.tooltip = menu;
    }

    this.rampMenu = function(e) {
        var index = parseInt(e.target.getAttribute('data-index'));
        var ramp = window.AppData.frames[index];

        $(".event-ramp-menu").remove();

        var menu = new EventMapRampMenuWidget({
            container: $('#events-map'),
            index: ramp.index,
            target: e.target,
            class: 'event-ramp-menu',
            side: 'bottom',
            color: 'blue',
        }, ramp, application.panels.SVP);
        menu.setContent('<span class="close"></span>' +
                '<div class="center">' +
                '<p class="gosnumber">'+ramp.number+'</p>' +
                '<p>Журнал</p>' +
                '<p class="gosnumber more">Подробнее</p>' +
                '</div>');
        menu.show();
        ramp.tooltip = menu;
    }

    this.drawItems = function() {
        var mapTag = $('.events-map-cvn');
        var self = this;

        $(mapTag).find(".truck").remove();
        $(mapTag).find(".ramp").remove();

        // Add trucks to the map
        _.each(window.AppData.trucks, function (truck) {
            var truckMark = $('<div class="placemark truck">');
            truckMark.attr('data-index', truck.index);
            truckMark.addClass(truck.type);
            truckMark.css({left: truck.position.left, top: truck.position.top});
            mapTag.append(truckMark);
        });

        mapTag.off('click', '.truck.placemark', $.proxy(self.truckMenu, self) );
        mapTag.on('click', '.truck.placemark', $.proxy(self.truckMenu, self) );

        // Add ramps to the map
        _.each(window.AppData.frames, function (ramp) {
            var rampMark = $('<div class="ramp">');
            rampMark.attr('data-index', ramp.index);
            rampMark.css({left: ramp.position.left, top: ramp.position.top});
            rampMark.css({transform: 'rotate('+ramp.angle+'deg)'});
            $(rampMark).css({
                "webkitTransform":"rotate("+ramp.angle+"deg)",
                "MozTransform":"rotate("+ramp.angle+"deg)",
                "msTransform":"rotate("+ramp.angle+"deg)",
                "OTransform":"rotate("+ramp.angle+"deg)",
                "transform":"rotate("+ramp.angle+"deg)"
            });
            mapTag.append(rampMark);
        });

        mapTag.off('click', '.ramp', $.proxy(self.rampMenu, self));
        mapTag.on('click', '.ramp', $.proxy(self.rampMenu, self));
    }

    this.show = function() {
        this.drawItems();
        this.element.removeClass('hidden');
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };


    this.setContent = function (content) {
        this.innerElement.html(content);
        this.innerElement.removeClass('hidden');
        this.innerElement.siblings().addClass('hidden');
    };

    this.showMap = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#event-main-map');
        var self = this;
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            thisContainer = $('<div id="event-main-map" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-map.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
                self.drawItems();
            }.bind(this));
        }
    };

    this.truckById = function(index) {
        var ret = null;
        _.each(window.AppData.trucks, function (truck) {
            if(truck.index == index) {
                ret = truck;   
            }
        });

        return ret;
    }

    this.showTruckInfo = function (elem, event) {
        if (event && ('preventDefault' in event)) event.preventDefault();
        var thisContainer = jQuery('#event-main-truck-info');
        var self = this;

        var updateInfo = function () {
            var e = jQuery(elem);
            var index = $(e).attr("data-index");
            var truck = self.truckById(index);

            thisContainer.find('p.gosnumber').html(truck.number);
            thisContainer.removeClass("bad").removeClass("good");
            thisContainer.addClass(truck.type);
            thisContainer.find('p.time').html(truck.time);
            thisContainer.find('p.truck-status').html(truck.status);

            var photos = '';
            _.each(truck.images, function(image) {
                photos +='<img class="truck-photo" src="'+image+'" />';
            });
            
            thisContainer.find('.well.photo').html(photos);
        };
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
            updateInfo();
        } else {
            thisContainer = $('<div id="event-main-truck-info" class="widget-obscure hidden hide-to-right">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-truck-info.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
                updateInfo();
            });
        }
    };

    this.useWebcam = function() {
        var video = document.querySelector("#rampVideo");
 
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
         
        if (navigator.getUserMedia) {       
            navigator.getUserMedia({video: true}, handleVideo, videoError);
        }
         
        function handleVideo(stream) {
            video.src = window.URL.createObjectURL(stream);
        }

        function videoError(e) {
            // do something
        }
    }

    this.noiseVideo = function() {
        var video = document.querySelector("#rampVideo");
        video.src = "/static/images/scene/noise.mp4";
    }

    this.showRampInfo = function (e, ramp) {
        var self = this;
        if (e && 'preventDefault' in e) e.preventDefault();
        else if (e && !ramp) ramp = e;
        this.ramp = ramp;
        var thisContainer = jQuery('#event-main-ramp-info');
        var updateInfo = function () {
            thisContainer.find('p.number').text(this.ramp.number);
            thisContainer.find('p.position').html(
                this.ramp.positionName+'<br>'+this.ramp.positionСoords
            );

            $("#video_in_ramp").html(getVideoTag(showFakeCamera(this.ramp.ip)));
        }.bind(this);
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
            updateInfo();
        } else {
            thisContainer = $('<div id="event-main-ramp-info" class="widget-obscure hidden hide-to-right">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-ramp-info.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
                updateInfo();
            });
        }
    };

    this.element.on('click', '.close-button', function (e) {
        this.showMap(e);
        $("#event-truck-menu .truck-entry").removeClass("current");
    }.bind(this));

};


var EventMapTruckMenuWidget = function(options, panel) {
    this.options = jQuery.extend({
        container: jQuery('#app', document),
    }, (options || {}));

    this.scrollApi = null;

    this.element = jQuery('<div class="tooltip hidden"></div>');
    this.innerElement = jQuery('<div class="tooltip-obscure"></div>');
    this.element.append(this.innerElement);
    if (this.options.index)
        this.element.attr('data-index', this.options.index);
    if (this.options.side)
        this.element.addClass(this.options.side);
    if (this.options.color)
        this.element.addClass(this.options.color);
    if (this.options.class)
        this.element.addClass(this.options.class);

    // Позиционируем наш тултип
    var target = jQuery(this.options.target);
    var targetPos = target.position();
    var wOff = target.outerWidth() / 2;
    var hOff = (this.options.side == 'bottom') ? target.outerHeight() : 0;
    this.element.css({top: targetPos.top+hOff, left: targetPos.left+wOff});

    jQuery(this.options.container).append(this.element);

    this.show = function() {
        this.element.removeClass('hidden');
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };

    this.toggle = function () {
        if (this.element.hasClass('hidden'))
            this.show();
        else
            this.hide();
    };

    this.setContent = function (content) {
        this.innerElement.html(content);

        this.element.find(".gosnumber").on('click', function (e) {
            $(".tooltip").remove();
            $("#event-truck-menu .truck-entry").removeClass("current");

            var self = this;
            var index = $(e.target).parents(".tooltip").attr("data-index");
            $.each($("#event-truck-menu .truck-entry"), function(key, item) {
                if($(item).attr("data-index") == index) {
                    $(item).addClass("current");
                }
            });
            panel.widgets.mainWidget.showTruckInfo(this.element, e);
        }.bind(this));

        this.element.find(".close").on('click', function (e) {
            this.hide();
        }.bind(this));
    };

    this.showTruckInfo = function (e) {
        if (e) e.preventDefault();
        var self = this;
        var thisContainer = $('#event-main-truck-info');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            thisContainer = $('<div id="#event-sidebar-trucks" class="widget-obscure hidden hide-to-left">');
            t
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-sidebar-trucks.html', {}, function (data, status, jqxhr) {
                console.log(data);
                data = _.template(data, { trucks : window.AppData.trucks});

                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
            });
        }
    };
};

var EventMapRampMenuWidget = function(options, ramp, panel) {
    this.options = jQuery.extend({
        container: jQuery('#app', document),
    }, (options || {}));
    this.ramp = ramp;
    this.panel = panel;

    this.element = jQuery('<div class="tooltip hidden"></div>');
    this.innerElement = jQuery('<div class="tooltip-obscure"></div>');
    this.element.append(this.innerElement);
    if (this.options.index)
        this.element.attr('data-index', this.options.index);
    if (this.options.side)
        this.element.addClass(this.options.side);
    if (this.options.color)
        this.element.addClass(this.options.color);
    if (this.options.class)
        this.element.addClass(this.options.class);

    // Позиционируем наш тултип
    var target = jQuery(this.options.target);
    var targetPos = target.position();
    var wOff = target.outerWidth() / 2;
    var hOff = (this.options.side == 'bottom') ? target.outerHeight() : 0;
    this.element.css({top: targetPos.top+hOff+10, left: targetPos.left+wOff});

    jQuery(this.options.container).append(this.element);

    this.show = function() {
        this.element.removeClass('hidden');
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };

    this.toggle = function () {
        if (this.element.hasClass('hidden'))
            this.show();
        else
            this.hide();
    };

    this.setContent = function (content) {
        this.innerElement.html(content);

        this.element.find(".gosnumber").on('click', function (e) {
            this.panel.widgets.mainWidget.showRampInfo(e, this.ramp);
        }.bind(this));

        this.element.find(".close").on('click', function (e) {
            this.hide();
        }.bind(this));
    };
};

var EventSidebarWidget = function(panel, options) {
    this.panel = panel;

    this.options = jQuery.extend({
        id: 'event-sidebar',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.menuElement = jQuery('<menu><li data-side="trucks">ТС</li><li data-side="ramps">Рамки</li></menu>');
    this.element.append(this.menuElement);
    this.element.addClass('widget widget-sidebar');
    jQuery(this.options.container).append(this.element);

    this.menuElement.on('click', 'li', function(e) {
       var val = e.currentTarget.dataset.side;
       this.element[0].className = this.element[0].className.replace(/tab-\w*/g, '');
       this.element.addClass('tab-'+val);
       this['show'+val[0].toUpperCase() + val.slice(1)]();
    }.bind(this));

    this.show = function() {
        this.drawFrames();
        this.element.removeClass('hidden');
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };

    this.setContent = function (content) {
        this.innerElement.html(content);
        this.innerElement.removeClass('hidden');
        this.innerElement.siblings('.widget-obscure').addClass('hidden');
    };

    this.showTrucks = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#event-sidebar-trucks');
        var self = this;
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings('.widget-obscure').addClass('hidden');
        } else {
            thisContainer = $('<div id="event-sidebar-trucks" class="widget-obscure hidden hide-to-left">');

            this.element.append(thisContainer);

            $.get('/static/compile/mt/event-sidebar-trucks.html', {}, function (data, status, jqxhr) {
                console.log(window.AppData.trucks);
                data = _.template(data, { trucks : window.AppData.trucks});
                thisContainer.html(data);
                thisContainer.siblings('.widget-obscure').addClass('hidden');
                thisContainer.removeClass('hidden');

                $("#event-truck-menu").on('click', '.truck-entry', function() {
                    window.application.panels.SVP.widgets.mainWidget.showTruckInfo(this);
                    $("#event-truck-menu .truck-entry").removeClass("current");
                    $(this).addClass("current");
                });
            });
        }
    };

    this.drawFrames = function() {
        var rampMenu = jQuery('#event-ramp-menu');
        $(rampMenu).find(".ramp-entry").remove();

        _.each(window.AppData.frames, function (ramp) {
            var rampEntry = jQuery(
                '<div class="ramp-entry sidebar-entry" data-index="'+ramp.index+'">' +
                    '<p class="gosnumber">' + ramp.number + '</p>' +
                    '<p class="position-name">' + ramp.positionName + '</p>' +
                    '<p class="position">' + ramp.positionСoords + '</p>' +
                '</div>');
            rampMenu.append(rampEntry);
        });

        jQuery("#event-ramp-menu").on('click', '.ramp-entry', function(e) {
            window.application.panels.SVP.widgets.mainWidget.showRampInfo(e, window.AppData.frames[this.dataset.index]);
        });
    }

    this.showRamps = function (e, ramp) {
        if (e) e.preventDefault();
        var self = this;
        var thisContainer = $('#event-sidebar-ramps');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings('.widget-obscure').addClass('hidden');
        } else {
            thisContainer = $('<div id="event-sidebar-ramps" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-sidebar-ramps.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings('.widget-obscure').addClass('hidden');
                thisContainer.removeClass('hidden');
                self.drawFrames();
            });
        }
    };
};
