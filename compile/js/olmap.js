

function OLMap()
{
	//OpenLayers map object
	var map;

	//Yandex and Google traffic layers
	//var yTraffic, gTraffic;
    var msLayer, osmLayer;

	//Non basic layers
    var markerLayer, borderLayer, maskLayer;
    
    var msMapIp = '54.185.39.17';
    var msMapPath = '/home/ubuntu/osm2/basemaps/osm-default.map';
    var msLayers = 'all';

	var maxZoom;
}


OLMap.prototype.init = function(divName)
{
	OpenLayers.Lang.setCode("ru");


	this.createMap(divName);
    

    this.addOSMLayer();
    this.addMapserverLayer();
    
    
    this.addMarkerLayer();
    this.addBorderLayer();

	this.addMaskLayer();


	return true;
};



OLMap.prototype.addBorderLayer =  function()
{

    this.borderLayer = new OpenLayers.Layer.TMS(
              "границы",
              "http://openmapsurfer.uni-hd.de/tiles/adminb/",
              {
                  type: 'png', getURL: getTileURL,
                  displayOutsideMaxExtent: true,
                  isBaseLayer: false,
                  numZoomLevels: 19,
              }
            );

            this.map.addLayer(this.borderLayer);
}

OLMap.prototype.addMaskLayer =  function()
{

var maskStyle  = new OpenLayers.StyleMap({
			  	pointRadius: 0,
			  	strokeWidth: 0,
			  	fillOpacity: 0.8,
			  	strokeOpacity: 0,
			  	strokeLinecap: "round",
			  	strokeColor: "black",
			  	fillColor: "black"

			  });


	this.maskLayer = new OpenLayers.Layer.Vector("mask", 
        {
            
            styleMap: maskStyle
	    });


	this.map.addLayer(this.maskLayer);
}



OLMap.prototype.createMap =  function(divName)
{
    this.map = new OpenLayers.Map(
    {
        div: divName,
       	projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326")
    });

	this.map.events.register('zoomend', this, function(event)
	{
		var zoom = event.object.getZoom();
		if(this.maxZoom > zoom) removeGis(); 
	});    	

    this.map.addControl(new OpenLayers.Control.LayerSwitcher());
}

OLMap.prototype.addMapserverLayer =  function()
{

this.msLayer = new OpenLayers.Layer.TMS( "TMS",
                    "http://54.212.51.74/mapcache/tms/", {layername: 'osm@g', type:'png'} );




   /* var msMapAddr = "http://" + this.msMapIp + "/cgi-bin/mapserv?map=" + this.msMapPath;   
    this.msLayer = new OpenLayers.Layer.MapServer("msMap", msMapAddr, {layers: "all"}); */
    this.map.addLayer(this.msLayer);   
}

OLMap.prototype.addOSMLayer =  function()
{
    this.osmLayer = new OpenLayers.Layer.OSM();
    this.map.addLayer(this.osmLayer);   

}

OLMap.prototype.addMarkerLayer =  function()
{
    var markerStyle  = new OpenLayers.StyleMap({
			  	graphicName: "circle",
			  	pointRadius: 13,
			  	strokeWidth: 10,
			  	fillOpacity: 0.8,
			  	strokeOpacity: 0.3,
			  	strokeLinecap: "round",
			  	strokeColor: "yellow",
			  	fillColor: "yellow",

	  //	label : "${label}",
		
    	fontColor: "blue",
        fontSize: "8px",
        fontFamily: "Arial",
        labelXOffset: 0,
        labelYOffset: -30,
     
        fontOpacity: 1 ,
        cursor: 'pointer'


			  });

		this.markerLayer = new OpenLayers.Layer.Vector("Маркеры", 
        {
            projection: new OpenLayers.Projection("EPSG:4326"),
            styleMap: markerStyle
	    });

	this.map.addLayer(this.markerLayer);
}


OLMap.prototype.addMarkers =  function(markers)
{
    if(markers.data == null) return false;
	for(var i = 0; i < markers.data.length; i++)
    {
        //alert(markers.data[i].lat);
        var pnt = new OpenLayers.Geometry.Point(markers.data[i].lat, markers.data[i].lon).transform(
            new OpenLayers.Projection("EPSG:4326"),
        this.map.getProjectionObject());
		var feature = new OpenLayers.Feature.Vector(pnt, {poppedup: false, label: markers.data[i].name} );
		this.markerLayer.addFeatures([feature]);
    }
    return true;
}

OLMap.prototype.centerMos =  function()
{
    olmap.setCenter(new OpenLayers.LonLat(37.2, 55.9).transform(
        new OpenLayers.Projection("EPSG:4326"),
		this.map.getProjectionObject()),9
    );
}

OLMap.prototype.maskSubj =  function(geom)
{
    var wkt_options = { 
                'internalProjection': this.map.baseLayer.projection,
                'externalProjection': new OpenLayers.Projection("EPSG:4326")
            }; 
	wkt = new OpenLayers.Format.WKT(wkt_options);

	var holeFeature = wkt.read(geom);


	var bgPoly = this.map.getExtent().toGeometry();
	var bgPolyFeature = new OpenLayers.Feature.Vector(bgPoly);

	function Subtract(bigFeature, smallFeature) {

 	   var newPolygon = new OpenLayers.Geometry.Polygon(bigFeature.geometry.components);
 	   var newFeature = new OpenLayers.Feature.Vector(newPolygon);

 	   newPolygon.addComponent(smallFeature.geometry.components[0]);

  	  return newFeature;
	}

	var maskFeature = Subtract(bgPolyFeature, holeFeature); 
	this.maskLayer.addFeatures([maskFeature]);

}
 

OLMap.prototype.centerSubj =  function(data)
{
    	var coords = data.split(';');

		var pnt1 = new OpenLayers.Geometry.Point(coords[0], coords[1]).transform(
		  new OpenLayers.Projection("EPSG:4326"),
		  this.map.getProjectionObject()
		);

        var pnt2 = new OpenLayers.Geometry.Point(coords[2], coords[3]).transform(
		  new OpenLayers.Projection("EPSG:4326"),
		  this.map.getProjectionObject()
		);


		var bounds = new OpenLayers.Bounds(pnt1.x, pnt1.y, pnt2.x, pnt2.y);

		this.map.zoomToExtent(bounds);

		this.maxZoom = this.map.getZoom();


this.maskSubj(coords[4]); 

//this.maskSubj("POLYGON((37.49287 54.0878106, 37.7390927 54.0878106, 37.7390927 54.3006964, 37.49287 54.3006964))");  


this.map.setOptions({restrictedExtent: this.map.getExtent()});

}


 