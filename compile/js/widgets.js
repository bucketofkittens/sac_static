var ExWidget = {
    appId: "#app",
    navId: "",
    panel: null,
    template: null,
    folder: "/compile/mt/",

    create: function() {
        if(this.navId) {
            var self = this;
            $.get('/static'+this.folder+this.navId.replace("#", "")+'.html', {}, function(data, status, jqxhr) {
                self.template = data;
                data = self.beforeCreate_(self.template);
                $(self.appId).append(data);
                self.afterCreate_();
            });
        }
    },

    refresh: function() {
        this.destroy();
        data = this.beforeCreate_(this.template);
        $(this.appId).append(data);
        this.afterCreate_();
        this.show();
    },

    destroy: function(){
        $(this.navId).remove();
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

/**
 * [ description]
 * @param  {[type]} app     [description]
 * @param  {[type]} configs [description]
 * @return {[type]}         [description]
 */
var YearSelectWidget = function(app, configs) {
	this.app = app;
	this.configs = configs;
	this.years = configs.years;
	this.selectedYear = configs.selectedYear;
	this.onAfterYearSelected = configs.onAfterYearSelected;
	
	this.CSS = {
		"SELECTOR": configs.container
	}
	this.elements = {
		"SELECTOR": $(this.CSS["SELECTOR"])
	}

	this.onYearSelected_ = function(val, inst) {
		this.selectedYear = val;
		if(this.onAfterYearSelected) {
			this.onAfterYearSelected();
		}
	}

	this.clear = function() {
		this.elements["SELECTOR"].html("");
	}

	this.decorate_ = function() {
		this.elements["SELECTOR"].selectbox({
			effect: "slide",
			onChange: $.proxy(this.onYearSelected_, this)
		});
	}

	this.createOptionChild_ = function(key, value) {
		var newOption = document.createElement("option");
		var newOptionContent = document.createTextNode(value);

		newOption.appendChild(newOptionContent);
		newOption.setAttribute("value", value);
		
		if(value == this.selectedYear) {
			newOption.setAttribute("selected", "selected");
		}

		this.elements["SELECTOR"].append(newOption);
	}

	this.draw = function() {
		this.clear();
		$.each(this.years, $.proxy(this.createOptionChild_, this));
		this.decorate_();
	}
}

/**
 * [ description]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
var PageTitleWidget = function(app) {
	this.CSS = {
		"CONTAINER": "header h1"
	};
	this.elements = {
		"CONTAINER": $(this.CSS["CONTAINER"])
	};

	this.hidden = function() {
		this.elements["CONTAINER"].addClass("onHidden");
    return this;
	}

	this.show = function() {
		this.elements["CONTAINER"].removeClass("onHidden");
    return this;
	}

  this.set = function(text) {
		this.elements["CONTAINER"].text(text);
    return this;
  }
}

/**
 * [FooterNavWidget description]
 * @param {[type]} app [description]
 */
var FooterNavWidget = function(app) {
	this.app = app;
	this.CSS = {
		"MAIN": "#footer-nav-widget"
	};
	this.elements = {
		"MAIN": $(this.CSS["MAIN"])
	};
	this.items = ConfigApp["FOOTER-NAV"];

	this.draw_ = function() {
		$.each(this.items, $.proxy(this.drawItem_, this));
	}
	this.drawItem_ = function(index, element) {

		var newLink = document.createElement("a");
		var newLinkContent = document.createTextNode(element["title"]);

		newLink.appendChild(newLinkContent);
		newLink.setAttribute("data-id", index);

		if(element["coming"]) {
			$(newLink).addClass("coming");
		}
    if(index == "REFBOOKS") {
      $(newLink).addClass('wide');
    }
		/*if(index == "DISTRICTS") {
			$(newLink).addClass("active");
		}*/
		this.elements["MAIN"].append(newLink);
	}
	this.addEvents_ = function() {
		$(this.CSS["MAIN"]).find("a").on("click", $.proxy(this.onItemClick_, this));
	}
	this.onItemClick_ = function(evt) {
		var curElement = $(evt.target);
		var itemId = curElement.attr("data-id");

		if(!curElement.hasClass("coming")) {
      _.each(this.app.panels, function(panel) { panel.hide() })
      this.app.panels[itemId].show();

			if(!curElement.hasClass("active")) {
				$(this.CSS["MAIN"]).find("a").removeClass("active");
				curElement.toggleClass("active");		
			}
		}
	}

	this.draw = function() {
		this.draw_();
		this.addEvents_();	
	}

	this.hide = function() {
		this.elements["MAIN"].removeClass("onShow");
	}
}

/**
 * [AppTimer description]
 * @param {[type]} app [description]
 */
var AppTimer = function(app) {
	this.timerEvent_ = {};
	this.CSS = {
		"hour": "#hour",
		"minute": "#minute",
		"day": "#day",
		"month": "#month",
		"age": "#age"
	}
	this.month = ['января','февраля','марта','апреля','мая','июня', 'июля','августа','сентября','рктября','ноября','декабря'];
	this.elements = {
		"minute": $(this.CSS["minute"]),
		"hour": $(this.CSS["hour"]),
		"day": $(this.CSS["day"]),
		"month": $(this.CSS["month"]),
		"age": $(this.CSS["age"])
	}

	this.run = function() {
		this.tick_();
		this.timerEvent_ = setInterval($.proxy(this.tick_, this), 10000);
	}

	this.tick_ = function() {
		var date = new Date();

		var strMonth = '' + date.getMinutes();
		if (strMonth.length == 1) {
		  strMonth = '0' + strMonth;
		}

		this.elements["hour"].html(date.getHours());
		this.elements["minute"].html(strMonth);
		this.elements["day"].html(date.getDate());
		this.elements["month"].html(this.month[date.getMonth()]);
		this.elements["age"].html(date.getUTCFullYear());
	}
}


var AppealsList = Object.create(ExWidget);

AppealsList.navId = "#appeals-list";
AppealsList.folder = "/templates/";

