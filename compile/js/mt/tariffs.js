// Example: w = new SceneInfoWidget(); w.show();

var TariffMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = jQuery.extend({
        id: 'tariff-map',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.element.addClass('widget widget-l');
    jQuery(this.options.container).append(this.element);

    this.show = function() {
        this.element.removeClass('hidden');
        this.showMap();
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
        var thisContainer = $('#tariff-main-map');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings().addClass('hidden');
        } else {
            thisContainer = $('<div id="tariff-main-map" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/tariff-map.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings().addClass('hidden');
                thisContainer.removeClass('hidden');
            }.bind(this));
        }
    };

};

var TariffListWidget = function(panel, options) {
    this.panel = panel;

    this.options = jQuery.extend({
        id: 'tariff-sidebar',
        container: jQuery('#app', document),
    }, (options || {}));

    this.element = jQuery('<div id="'+this.options.id+'" class="hidden"></div>');
    this.innerElement = jQuery('<div class="widget-obscure"></div>');
    this.element.append(this.innerElement);
    this.menuElement = jQuery('<menu><li data-side="tariffs">Тарифы</li></menu>');
    this.element.append(this.menuElement);
    this.element.addClass('widget widget-sidebar widget-sidebar-l');
    jQuery(this.options.container).append(this.element);

    self = this;
    this.menuElement.on('click', 'li', function(e) {
       var val = this.dataset.side;
       self.element[0].className = self.element[0].className.replace(/tab-\w*/g, '');
       self.element.addClass('tab-'+val);
       self['show'+val[0].toUpperCase() + val.slice(1)]();
    });

    this.show = function() {
        this.element.removeClass('hidden');
        this.showTariffs();
    };

    this.hide = function() {
        this.element.addClass('hidden');
    };

    this.setContent = function (content) {
        this.innerElement.html(content);
        this.innerElement.removeClass('hidden');
        this.innerElement.siblings('.widget-obscure').addClass('hidden');
    };

    this.showTariffs = function (e) {
        if (e) e.preventDefault();
        var thisContainer = $('#tariff-sidebar-tariffs');
        if (thisContainer.length) {
            thisContainer.removeClass('hidden');
            thisContainer.siblings('.widget-obscure').addClass('hidden');
        } else {
            thisContainer = $('<div id="tariff-sidebar-tariffs" class="widget-obscure hidden hide-to-left">');
            this.element.append(thisContainer);
            $.get('/static/compile/mt/tariff-sidebar-tariffs.html', {}, function (data, status, jqxhr) {
                thisContainer.html(data);
                thisContainer.siblings('.widget-obscure').addClass('hidden');
                thisContainer.removeClass('hidden');
            });
        }
    };

    $("body").on('click', '.decrease', function(e) {
        e.preventDefault();
        var input = $(this).parent().find('input');
        var val = parseFloat(input.val());
        val -= 0.5;
        if (val >= 0) {
            input.val(val);
            input.trigger('change');
        }
    });
    $("body").on('click', '.increase', function(e) {
        e.preventDefault();
        var input = $(this).parent().find('input');
        var val = parseFloat(input.val());
        input.val(val+0.5);
        input.trigger('change');
    });
    $("body").on('change', 'input[type=number]', function() {
       var groupTag = $(this).closest('tbody');
       var base  = parseFloat(groupTag[0].dataset.cost);
       var day   = parseFloat(groupTag.find('input').first().val());
       var night = parseFloat(groupTag.find('input').last().val());
       var avg   = (day+night)/2;
       var load  = base/avg;
       groupTag.find('tr:last td:last').text(Math.round(load*100));
    });
};

var TariffNavWidget = function(panel, options) {
    this.panel = panel;
    this.options = options;

    this.appId = "#app";
    this.navId = "#reference-nav";

    var self = this;

    this.show = function() {
        var self = this;
        $.get('/static/compile/mt/nav.html', {}, function (data, status, jqxhr) {
            $(self.appId).append(data);
        });
    };

    this.hide = function() {    
        $(this.navId).remove();
    };

    this.onNavClick_ = function() {
        $(this.navId+" li").removeClass("current");
        $(this).parent().addClass("current");
        
        self.panel.changeState($(this).attr("state"));
    }

    $("body").on("click", this.navId+" a", this.onNavClick_);
};


var TariffCamersListWidget = function(panel, options) {
    this.panel = panel;
    this.options = options;

    this.appId = "#app";
    this.navId = "#camers-list";

    this.show = function() {
        var self = this;
        $.get('/static/compile/mt/camers-list.html', {}, function (data, status, jqxhr) {
            $(self.appId).append(data);
        });
    };

    this.hide = function() {    
        $(this.navId).remove();
    };
};

var TariffCamersMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = options;

    this.appId = "#app";
    this.navId = "#camers-main";

    this.show = function() {
        var self = this;
        $.get('/static/compile/mt/camers-main.html', {}, function (data, status, jqxhr) {
            $(self.appId).append(data);
        });
    };

    this.hide = function() {    
        $(this.navId).remove();
    };
};

var TariffRamkListWidget = function(panel, options) {
    this.panel = panel;
    this.options = options;

    this.appId = "#app";
    this.navId = "#ramks-main";

    this.show = function() {
        var self = this;
        $.get('/static/compile/mt/ramks-list.html', {}, function (data, status, jqxhr) {
            $(self.appId).append(data);
        });
    };

    this.hide = function() {    
        $(this.navId).remove();
    };
};

var TariffRamkMainWidget = function(panel, options) {
    this.panel = panel;
    this.options = options;

    this.appId = "#app";
    this.navId = "#ramks-main";

    this.show = function() {
        var self = this;
        $.get('/static/compile/mt/ramks-main.html', {}, function (data, status, jqxhr) {
            $(self.appId).append(data);
        });
    };

    this.hide = function() {    
        $(this.navId).remove();
    };
};
