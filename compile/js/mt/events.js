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

    this.show = function() {
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
            }.bind(this));
        }
    };

    this.showTruckInfo = function (elem, event) {
        if (event && ('preventDefault' in event)) event.preventDefault();
        var thisContainer = jQuery('#event-main-truck-info');
        var updateInfo = function () {
            var e = jQuery(elem);
            thisContainer.find('p.gosnumber').text(e.find('.gosnumber').text());
            thisContainer.find('p.time').text(e.find('.time').text());
            thisContainer.find('p.truck-status').text(e.find('.truck-status').text());
            thisContainer.find('.well.photo').html(e.find('.well').html());
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

    this.showRampInfo = function (e, ramp) {
        if (e && 'preventDefault' in e) e.preventDefault();
        else if (e && !ramp) ramp = e;
        this.ramp = ramp;
        var thisContainer = jQuery('#event-main-ramp-info');
        var updateInfo = function () {
            thisContainer.find('p.number').text(this.ramp.number);
            thisContainer.find('p.position').html(
                this.ramp.positionName+'<br>'+this.ramp.positionCoords
            );
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
    };

    this.showTruckInfo = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#event-main-truck-info');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            thisContainer = $('<div id="#event-sidebar-trucks" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-sidebar-trucks.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
            });
        }
    };

    this.element.on('click', function (e) {
       panel.widgets.mainWidget.showTruckInfo(this.element, e);
    }.bind(this));
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
    };

    this.element.on('click', function (e) {
        this.panel.widgets.mainWidget.showRampInfo(e, this.ramp);
    }.bind(this));
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
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings('.widget-obscure').addClass('hidden');
        } else {
            thisContainer = $('<div id="event-sidebar-trucks" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/event-sidebar-trucks.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings('.widget-obscure').addClass('hidden');
                thisContainer.removeClass('hidden');
            });
        }
    };

    this.showRamps = function (e, ramp) {
        if (e) e.preventDefault();
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
            });
        }
    };
};
