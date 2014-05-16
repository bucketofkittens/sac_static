window.AppData = {};
window.AppData.frames = [
    {
        index: 0,
        position: {top: 485, left: 810},
        angle: 115,
        number: 'M9-001',
        positionName: '41-й км трассы M9',
        positionСoords: '55°48’36   37°26’33',
        webcam: true,
        ip: "10.10.1.10"
    },
    {
        index: 1,
        position: {top: 500, left: 775},
        number: 'M9-002',
        angle: 10,
        positionName: '43-й км трассы M9',
        positionСoords: '55°48’36   37°26’33',
        webcam: false,
        ip: "10.10.1.11"
    },
    {
        index: 2,
        position: {top: 460, left: 765},
        number: 'M9-003',
        angle: -25,
        positionName: '46-й км трассы M9',
        positionСoords: '55°48’36   37°26’33',
        webcam: false,
        ip: "10.10.1.12"
    },
    {
        index: 3,
        position: {top: 375, left: 550},
        number: 'M9-004',
        angle: -35,
        positionName: '84-й км трассы M9',
        positionСoords: '55°48’36   37°26’33',
        webcam: false,
        ip: "10.10.1.13"
        
    },
    {
        index: 4,
        position: {top: 365, left: 515},
        number: 'M9-005',
        angle: 65,
        positionName: '87-й км трассы M9',
        positionСoords: '55°48’36   37°26’33',
        webcam: false,
        ip: "10.10.1.14"
    },
];

window.AppData.camers = [
    {
        index: 0,
        position: {top: 173 , left: 738},
        number: 'Камера 1',
        adress: 'ул. Репина, 8',
        positionСoords: '55°48’36   37°26’33',
        ip: "10.10.1.14"
    },
    {
        index: 1,
        position: {top: 223 , left: 381},
        number: 'Камера 2',
        adress: 'ул. Кирова, 7',
        positionСoords: '55°48’36   37°26’33',
        ip: "10.10.1.15",
        
    },
    {
        index: 2,
        position: {top: 381 , left: 498},
        number: 'Камера 3',
        adress: 'ул. Оборонная, 25/3',
        positionСoords: '55°48’36   37°26’33',
        ip: "10.10.1.16"
    }
];

window.AppData.fakeCameras = [
	{
		path: "/static/images/scene/tula03.mp4",
        ip: "10.10.1.16"
	},
	{
		path: "/static/images/scene/tula02.mp4",
        ip: "10.10.1.15"
	},
	{
		path: "/static/images/scene/tula01.mp4",
        ip: "10.10.1.14"
	},
	{
		path: "/static/images/scene/r01.mp4",
        ip: "10.10.1.10"
	},
	{
		path: "/static/images/scene/r02.mp4",
        ip: "10.10.1.11"
	},
	{
		path: "/static/images/scene/r03.mp4",
        ip: "10.10.1.11"
	},
	{
		path: "/static/images/scene/r04.mp4",
        ip: "10.10.1.12"
	},
	{
		path: "/static/images/scene/r05.mp4",
        ip: "10.10.1.13"
	}
];

window.AppData.titles = {
    "RU" : {
        "COUNT_TC": "Кол-во осей ТС, шт.",
        "MASS_TC": "Масса ТС, т.",
        "ECO_CLASS": "Экологический класс",
        "SYSP_TYPE": "Тип подвески",
        "LEVEL_INPACT": "Уровень воздействия на инфраструктуру",
        "NUMBER_TC": "Номер ТС",
        "NAME_UR": "Наименование юр.лица",
        "UNPAID_BILL": "Наличие неоплаченных счетов, руб.",
        "ROUTE": "Маршрут",
        "FEE": "Размер сбора, руб.",
        "PLAYMENT_STATUS": "Статус оплаты",
        "INDEFIER_BY": "Идентификатор БУ"
    }
}

window.AppData.trucks = [
    {
        index: 0,
        type: 'good',
        position: {top: 460, left: 840},
        toolTipDir: 'bottom',
        time: '18.02 15:32',
        number: 'K 101 PA &nbsp; 95',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo.jpg",
            "/static/images/mt/truck-info-photo-number.jpg"
        ],
        params: {
            "COUNT_TC": "4",
            "MASS_TC": "32",
            "ECO_CLASS": "Евро-3",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "III",
            "NUMBER_TC": "E551TT177",
            "NAME_UR": "ЗАО “Трейд-Инвест”",
            "UNPAID_BILL": "нет",
            "ROUTE": "г.Смоленск — г.Тула",
            "FEE": "1250",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "24РО3498ЕК23"
        }
    },
    {
        index: 1,
        type: 'bad',
        position: {top: 320, left: 475},
        toolTipDir: 'top',
        time: '18.02 15:32',
        number: 'E 551 TT &nbsp; 177',
        status: 'Несоответствие НЗ',
        images: [
            "/static/images/mt/truck-info-photo2.jpg",
            "/static/images/mt/truck-info-photo-number2.jpg"
        ],
        params: {
            "COUNT_TC": "6",
            "MASS_TC": "50",
            "ECO_CLASS": "Евро-4",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "V",
            "NUMBER_TC": "H384HO13",
            "NAME_UR": "ОАО “РусАвтоДор”",
            "UNPAID_BILL": "1200",
            "ROUTE": "г.Калининград — г.Москва",
            "FEE": "2750",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "97НР3288ЕК11"
        }
    },
    {
        index: 2,
        type: 'good',
        position: {top: 392, left: 750},
        toolTipDir: 'bottom',
        time: '23.02 15:32',
        number: 'X 399 BX &nbsp; 177',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo3.jpg",
            "/static/images/mt/truck-info-photo-number3.jpg"
        ],
        params: {
            "COUNT_TC": "4",
            "MASS_TC": "30",
            "ECO_CLASS": "Евро-3",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "III",
            "NUMBER_TC": "0978EH56",
            "NAME_UR": "ООО “Вектор-М”",
            "UNPAID_BILL": "нет",
            "ROUTE": "г.Витебск — г.Пермь",
            "FEE": "1250",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "37OO3325TT25"
        }
    },
    {
        index: 3,
        type: 'good',
        position: {top: 512, left: 250},
        toolTipDir: 'bottom',
        time: '23.02 15:32',
        number: 'X 499 BX &nbsp; 177',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo3.jpg",
            "/static/images/mt/truck-info-photo-number3.jpg"
        ],
        params: {
            "COUNT_TC": "5",
            "MASS_TC": "38",
            "ECO_CLASS": "Евро-2",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "IV",
            "NUMBER_TC": "E123HO69",
            "NAME_UR": "ЗАО “ГрузТехПром”",
            "UNPAID_BILL": "750",
            "ROUTE": "г.Можайск — г.Мурманск",
            "FEE": "1800",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "69УН4718ОС25"
        }
    },
    {
        index: 4,
        type: 'good',
        position: {top: 292, left: 550},
        toolTipDir: 'bottom',
        time: '23.02 15:32',
        number: 'X 599 BX &nbsp; 177',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo3.jpg",
            "/static/images/mt/truck-info-photo-number3.jpg"
        ],
        params: {
            "COUNT_TC": "3",
            "MASS_TC": "26",
            "ECO_CLASS": "Евро-2",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "III",
            "NUMBER_TC": "M103MA97",
            "NAME_UR": "ООО 'Ядвига'",
            "UNPAID_BILL": "750",
            "ROUTE": "г.Москва — г.Смоленск",
            "FEE": "1250",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "46КМ5756АЕ71"
        }
    },
    {
        index: 5,
        type: 'good',
        position: {top: 212, left: 750},
        toolTipDir: 'bottom',
        time: '23.02 15:32',
        number: 'X 699 BX &nbsp; 177',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo3.jpg",
            "/static/images/mt/truck-info-photo-number3.jpg"
        ],
        params: {
            "COUNT_TC": "4",
            "MASS_TC": "34",
            "ECO_CLASS": "Евро-3",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "III",
            "NUMBER_TC": "E101CC77",
            "NAME_UR": "ЗАО “Дижон”",
            "UNPAID_BILL": "нет",
            "ROUTE": "г.Мурманск — г.Минск",
            "FEE": "1250",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "42ОР8943КЕ32"
        }
    },
    {
        index: 6,
        type: 'good',
        position: {top: 512, left: 550},
        toolTipDir: 'bottom',
        time: '23.02 15:32',
        number: 'X 799 BX &nbsp; 177',
        status: 'Оплачено',
        images: [
            "/static/images/mt/truck-info-photo3.jpg",
            "/static/images/mt/truck-info-photo-number3.jpg"
        ],
        params: {
            "COUNT_TC": "4",
            "MASS_TC": "32",
            "ECO_CLASS": "Евро-2",
            "SYSP_TYPE": "пневматическая",
            "LEVEL_INPACT": "III",
            "NUMBER_TC": "E251AT377",
            "NAME_UR": "ЗАО “Инвест-Тревел”",
            "UNPAID_BILL": "нет",
            "ROUTE": "г.Смоленск — г.Казань",
            "FEE": "1250",
            "PLAYMENT_STATUS": "оплачено",
            "INDEFIER_BY": "21XО1498NN23"
        }
    }
];


/**
 * [ description]
 * @return {[type]} [description]
 */
var VideoPlayer = function() {
	this.CSS = {
		"BG": "bg-video",
		"VIDEO": "video",
		"HEADER": "header",
		"SVG": "#bg-svg"
	}
	this.elements = {
		"BG": document.getElementById(this.CSS["BG"]),
		"VIDEO": document.getElementById(this.CSS["VIDEO"]),
		"HEADER": $(this.CSS["HEADER"]),
		"SVG": $(this.CSS["SVG"])
	}

	this.video = $("#video");
	this.endedCallback = {};

	this.onTimeupdate_ = function(e) {
		if(e.currentTarget.duration - e.currentTarget.currentTime < 0.2) {
			e.currentTarget.pause();
			this.endedCallback();
      		this.video.off('playing');
		}
	}

	this.video.on('timeupdate', $.proxy(this.onTimeupdate_, this));

	this.play = function(videoPath, config) {
		this.video.attr("src", videoPath);

		if(config && config.poster) {
			this.video.attr("poster", config.poster);	
		}
		
		if(config && config.onEndedCallback) {
			this.endedCallback = config.onEndedCallback;
		}
	  	this.video.on('playing', function(){if (config.map) {config.map.setBgImage()}});
		
		this.video[0].load();
		this.video[0].play();
		$(this.elements["BG"]).show();
	}

	this.hide = function() {
		$(this.elements["BG"]).hide();
	}
}

/**
 * [MiniMapWriter Работает с отображением и логикой мини карты слева]
 */
var MiniMapWriter = function() {
	this.CSS = {
		"CONTAINER": "#miniMap",
		"TEXT": " a"
	}
	this.elements = {
		"CONTAINER": $(this.CSS["CONTAINER"]),
		"TEXT": $(this.CSS["CONTAINER"]+this.CSS["TEXT"])
	}

	this.show = function(imagePath, callback) {
		this.elements["CONTAINER"].addClass("onShow");
		this.elements["TEXT"].css("backgroundImage", "url('"+imagePath+"')");
		this.elements["CONTAINER"].off("click");
		this.elements["CONTAINER"].on("click", callback);
	}

	this.hiden = function() {
		this.elements["CONTAINER"].removeClass("onShow");
		this.elements["TEXT"].css("backgroundImage", "none");
		this.elements["CONTAINER"].off("click");
	}

	this.opacityHidden = function() {
		this.elements["CONTAINER"].removeClass("onShow");
	}

	this.opacityShow = function() {
		this.elements["CONTAINER"].addClass("onShow");
	}

	this.setText = function(text) {
		this.elements["TEXT"].html(text);
	}
}

/**
 * [LoadingState description]
 * @param {[type]} app [description]
 */
var LoadingState = function(app) {
	this.app = app;
	this.stateCSS = {
		"BG-IMAGE": "#bg-image",
		"NAV-ELEMENTS": ".nav-elements",
		"LOADER": "#load",
		"LOAD-IMAGE": "#load-image",
		"LOADING-TEXT": "#loading"
	}
	this.animateSpeed = 2000;

	this.elements = {
		"BG-IMAGE": $(this.stateCSS["BG-IMAGE"]),
		"NAV-ELEMENTS": $(this.stateCSS["NAV-ELEMENTS"]),
		"LOADER": $(this.stateCSS["LOADER"]),
		"LOAD-IMAGE": $(this.stateCSS["LOAD-IMAGE"]),
		"LOADING-TEXT": $(this.stateCSS["LOADING-TEXT"])
	}

	this.run = function() {
		this.elements["BG-IMAGE"].addClass("blur");
		this.elements["BG-IMAGE"].css("backgroundImage", "url('/static/images/map/100.png')");
		this.elements["LOADER"].addClass("onShow");
	}

	this.stop = function(callback) {
		this.elements["BG-IMAGE"].removeClass("blur");
		this.elements["NAV-ELEMENTS"].addClass("onShow");
		this.elements["LOADER"].removeClass("onShow");

		if(callback) {
			callback();	
		}
	}

	this.updateText = function(currentFile, allFile) {
		this.elements["LOADING-TEXT"].html("");
		this.elements["LOADING-TEXT"].html('Загружено: '+parseInt(currentFile)+' из '+ allFile +' </p>');
	}

	this.clearText = function() {
		this.elements["LOADING-TEXT"].html("");
	}
}

/**
 * [Application description]
 */
var Application = function() {
	this.appSize = [1920, 1080];
	this.currentRegion = 100;
	this.maxZoom = 3;
	this.russianId = 100;

	this.apiHost = ConfigApp["API-HOST"];

	this.loadingState = new LoadingState(this);
	this.configManager = new ConfigManager(this, ConfigApp);
	this.appTimer = new AppTimer(this);
	this.footerNavWidget = new FooterNavWidget(this);

	var self = this;

	this.getResByPath = function(path) {
		return path;
	}
	
	this.CSS = {
		"APP": "#app",
		"TITLE": "h1"
	}
	this.elements = {
		"APP": $(this.CSS["APP"]),
		"TITLE": $(this.CSS["TITLE"])
	}

	this.run = function() {
		this.loadingState.run();
		this.appTimer.run();

		this.regionManager = new RegionManager(this);
		this.paramsManager = new ParamsManager(this);
		this.legendManager = new LegendManager(this);
		this.graphManager = new GraphManager(this);
		this.regionsManagerLocal = new RegionsManagerLocal(this);
		this.dictionaryManager = new DictionaryManager(this);

		// TODO: Enable caching, when needed: this.initResource_();
        this.onCacheLoaded_();

        var mobile = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);

		if(!mobile) {
			$("html").attr("manifest", "/static/cache.appcache");
		}
	}

	// Загружаем ресурсы, используя родной applicationCache
	this.initResource_ = function() {
        var appCache = window.applicationCache;
        if (appCache.status == appCache.IDLE)
            return this.onCacheLoaded_();

        var loaded = $.proxy(function () {
            this.onCacheLoaded_();
        }, this);

        appCache.addEventListener('updateready', loaded, false);
        appCache.addEventListener('noupdate', loaded, false);
        appCache.addEventListener('error', loaded, false); // Если размер кэша недостаточен — продолжим без кэширования
        appCache.addEventListener('cached', function () {
            // Reload page after all content is cached
            window.location.reload();
        }, false);
        appCache.addEventListener('downloading', $.proxy(function () {
            this.loadingState.run();
        }, this), false);
        appCache.addEventListener('progress', $.proxy(function (e) {
            this.loadingState.updateText(e.loaded, e.total);
        }, this), false);
	};

	this.init = function() {
		$(this.elements["APP"]).width(this.appSize[0]).height(this.appSize[1]);
	}

	this.onCacheLoaded_ = function() {
		this.loadingState.clearText();
		this.loadingState.stop();

		this.videoPlayer = new VideoPlayer();
		
		this.ageSelectorReportsWidget = new YearSelectWidget(this, {
			years: [2014, 2013, 2012, 2011, 2010, 2009, 2008],
			selectedYear: 2012,
			container: "#reposrts-params-age-selected",
			onAfterYearSelected: $.proxy(this.onFormatUpdateContentEventBind_, this)
		});
 

		this.legendWidget = new LegendWidget(this);
		this.regionsLegendWidget = new RegionsLegendWidget(this); 
		this.regionsLegendWidget.show();
		//this.eventsLegendWidget = new EventsLegendWidget(this);
		this.pageTitleWidget = new PageTitleWidget(this);
		
		/*
			this.eventsDrawWidget = new EventsDrawWidget(this);
			this.formatManager = new FormatManager(this);
			this.reportsParamsSelector = new ReportsParamsSelector(this);
			this.reportsDiscSelector = new ReportsDiscSelector(this);
			this.reportsWidget = new ReportsWidget(this);
		*/

		this.panels = {
		  'EVENTS':     new EventsPanel(this),
		  'REGIONS':    new RegionPanel(this),
		  'SVP':        new SvpPanel(this),
		  'DCH':        new DchPanel(this),
		  'REFBOOKS':   new TariffsPanel(this) 
		  /*'TARIFFS':    new TariffsPanel(this),
		  'DISTRICTS':  new DistrictsPanel(this),
		  'FORMATS':    new FormatsPanel(this),
		  'GRAPHS':     new GraphPanel(this),
		  'REPORTS':    new ReportsPanel(this)*/
		};

		this.footerNavWidget.draw();
		this.loadingState.stop();

		this.panels['EVENTS'].show();
	}

	this.setAppTitle = function(title) {
		this.elements["TITLE"].html(title);
	}

	this.init();
};

$(document).ready(function() {
	window.application = new Application();
  window.application.run();
});
