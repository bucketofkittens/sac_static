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

    this.init = function() {

    };

    this.create = function() {

    };  

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

    this.init = function() {

    };

    this.create = function() {

    };
    
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

var ExWidget = {
    appId: "#app",
    navId: "",
    panel: null,

    create: function() {
        if(this.navId) {
            var self = this;
            $.get('/static/compile/mt/'+this.navId.replace("#", "")+'.html', {}, function(data, status, jqxhr) {
                data = self.beforeCreate_(data);
                $(self.appId).append(data);
                self.afterCreate_();
            });
        }
    },

    beforeCreate_: function(data) {
        return data;
    },

    afterCreate_: function() {

    },

    show: function() {
        $(this.navId).removeClass('hidden');
    },

    hide: function() {    
        $(this.navId).addClass('hidden');
    },

    init: function() { }
}

var TariffNavWidget = Object.create(ExWidget);

TariffNavWidget.navId = "#reference-nav";

TariffNavWidget.onNavClick_ = function(event) {
    var elm = $(event.target);
    if(event.target.tagName == "A") {
        elm = $(event.target).parent();
    }
    if(!elm.hasClass("current")) {
        $(this.navId+" li").removeClass("current");
        elm.addClass("current");
        this.panel.changeState(elm.attr("state"));    
    }
}

TariffNavWidget.clear = function() {
    $(this.navId + " li.current").removeClass("current");
    $(this.navId + " li:first-child").addClass("current");
}

TariffNavWidget.init = function() {
    $("body").on("click", this.navId+" li", $.proxy(this.onNavClick_, this));
}

var TariffCamersListWidget = Object.create(ExWidget);
TariffCamersListWidget.navId = "#camers-list";

TariffCamersListWidget.beforeCreate_ = function(data) {
    return _.template(data, { camers : window.AppData.camers});
}

var TariffCamersMainWidget = Object.create(ExWidget);
TariffCamersMainWidget.navId = "#camers-main";

var TariffRamkListWidget = Object.create(ExWidget);
TariffRamkListWidget.navId = "#ramks-list";

TariffRamkListWidget.beforeCreate_ = function(data) {
    return _.template(data, { frames : window.AppData.frames});
}
TariffRamkListWidget.onAddClick_ = function(event) {

}
TariffRamkListWidget.init = function(data) {
    $("body").on("click", "#ramks-list .add", $.proxy(this.onAddClick_, this));
}



var TariffRamkMainWidget = Object.create(ExWidget);
TariffRamkMainWidget.navId = "#ramks-main";
TariffRamkMainWidget.eventMapId = "#map-fake";

TariffRamkMainWidget.afterCreate_ = function() {
    this.drawFrames();

    //
}

TariffRamkMainWidget.frameClick_ = function(event) {
    var index = $(event.target).attr("data-index");

    if(!this.isTooltip(index)) {
        this.addTooltip_(index);    
    }
}

TariffRamkMainWidget.isTooltip = function(index) {
    return $(this.navId + " " + this.eventMapId + " .event-ramp-menu[data-index='"+index+"']").size();
}


TariffRamkMainWidget.addTooltip_ = function(index) {
    var frame = this.getFrameByIndex_(index);
    var html = $('<div class="tooltip bottom blue event-ramp-menu" data-index="'+frame.index+'"><span class="close"></span> <div class="tooltip-obscure"><div class="center"><p class="gosnumber">'+frame.number+'</p><p>'+frame.positionName+'</p></div></div></div>');
    
    $(html).css("left", (frame.position.left+15)+"px");
    $(html).css("top", (frame.position.top+15)+"px");

    $(this.navId + " " + this.eventMapId).append(html);
}

TariffRamkMainWidget.getFrameByIndex_ = function(index) {
    return positiveArr = window.AppData.frames.filter(function(item) {
        if(item.index == index) { return item; }
    })[0];

}

TariffRamkMainWidget.createFrame = function(frame) {
    var el1 = document.createElement("div");

    el1.className = "ramp";
    el1.style.left = frame.position.left+"px";
    el1.style.top = frame.position.top+"px";

    $(el1).css({
        "webkitTransform":"rotate("+frame.angle+"deg)",
        "MozTransform":"rotate("+frame.angle+"deg)",
        "msTransform":"rotate("+frame.angle+"deg)",
        "OTransform":"rotate("+frame.angle+"deg)",
        "transform":"rotate("+frame.angle+"deg)"
    });
    $(el1).attr("data-index", frame.index);

    $(el1).click($.proxy(this.frameClick_, this));

    $(this.navId + " " + this.eventMapId).append(el1);
}

TariffRamkMainWidget.drawFrames = function() {
    var self = this;
    _.each(window.AppData.frames, function(value, key) {
        self.createFrame(value);
    });
}