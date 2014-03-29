// Example: w = new SceneInfoWidget(); w.show();

var EventMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = jQuery.extend({
        id: 'event-map',
        container: jQuery('body', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'"></div>');
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
            thisContainer.find('p.gosnumber').text(e.find('p.gosnumber').text());
            thisContainer.find('p.time').text(e.find('p.time').text());
            thisContainer.find('p.truck-status').text(e.find('p.truck-status').text());
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

    this.element.on('click', '.close-button', function (e) {
        this.showMap(e);
    }.bind(this));

};


var EventMapTruckMenuWidget = function(options, panel) {
    this.options = jQuery.extend({
        container: jQuery('body', document),
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

var EventSidebarWidget = function(panel, options) {
    this.panel = panel;

    this.options = jQuery.extend({
        id: 'event-sidebar',
        container: jQuery('body', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.element.addClass('widget widget-sidebar');
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

    this.showTrucks = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#event-sidebar-trucks');
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

};
