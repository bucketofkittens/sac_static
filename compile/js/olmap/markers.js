OLMap.prototype.addMarker =  function(layer, lat, lon, options)
{
    var pnt = this.newPnt(lat, lon);
    var feature = new OpenLayers.Feature.Vector(pnt, options );
	layer.addFeatures([feature]);
    
} 


OLMap.prototype.addLpus =  function(lpus) 
{
    if(lpus == null) return false;
	for(var i = 0; i < lpus.length; i++)
    {
        var options = {poppedup: false, label: lpus[i].name};
        this.addMarker(this.lpuLayer, lpus[i].lat, lpus[i].lon, options );
    }
    return true;   
}

OLMap.prototype.addRequisitions =  function(data, onPopupClick)
{
	console.log(data);
  if(data == null) return false;
	for(var i = 0; i < data.length; i++)
    {
        data[i].path = this.hostIP + '/static/compile/js/olmap/images/' +
       //   data[i].path = 'images/' +
            data[i].type + '_' + data[i].color + '.png';
        
            
        data[i].poppedup = false;
    
        this.addMarker(this.requisitionsLayer, data[i].lat, data[i].lon, data[i]);
    }

    this.addMarkersPopup(this.requisitionsLayer, this.createRequisitionsPopupHtml , onPopupClick);
    return true;
}

OLMap.prototype.createRequisitionsPopupHtml =  function(attr) 
{
    html =   '<div style="background-image: url('+attr.popup_bg_path+');';
    html += 'height: 109px; width: 232px; ">';
    html += '<div style="position: absolute; top: 25px; left: 20px; color: white">';
    html += '<table cellpadding = 1px cellspacing=2px width=185px border=0'+
    ' style="color: white; font-size: 12; font-family: arial">';
    html += '<tr><td>№ ' + attr.num + '</td><td  align=center bgcolor="'+ attr.color +'">' +
        attr.status + '</td></tr>';
    html += '<tr><td colspan="2" style="font-size: 14; font-weight: bold">' + attr.type_ru + '</td></tr>';
    html += '<tr><td colspan="2">' + attr.address + '</td></tr>';
    html += '<tr><td colspan="2">' + attr.creation_time + '</td></tr>';        
    html +=  '</table></div>';
    html +=  '<div class="close" style="position: absolute; top: 23px; right: 20px;'+
        ' " onclick="olmap.popup.destroy()"></div>';
    html +=  '</div>';
    return html;
}

OLMap.prototype.addMarkersPopup =  function(layer, createHTMLFunction, onPopupClick)
{   
     var me = this;
     function selectFeature(feature)
     {
        var pos = feature.geometry;
            
        if (me.popup) me.map.removePopup(me.popup);
        

        var path =  me.hostIP + '/static/compile/js/olmap/images/tooltip-bottom-blue.png';
	feature.attributes.popup_bg_path = path; 

        var pWidth = 240;  
        var pHeight = 112; 
        
        //var offset = {'size':new OpenLayers.Size(0,0),'offset':new OpenLayers.Pixel(pWidth/2+10,pHeight+10)}; 
        var offsetX =  pWidth/2;  
        var offsetY =  pHeight+10; 
            
        html = createHTMLFunction(feature.attributes); //createPopupHTML(feature.attributes); 
        me.popup = new OpenLayers.Popup.Anchored("popup",
        new OpenLayers.LonLat(pos.x, pos.y),
        new OpenLayers.Size(pWidth,pHeight), html, null, false);
        
        me.popup.relativePosition = "br";
        me.popup.keepInMap = false;
        
        me.popup.calculateNewPx = function(px)
        {
            if (me.popup.size !== null){px = px.add(-offsetX, 0);}
            return px;
        };
        
      
        me.popup.setBackgroundColor("tranceparent");
        
       me.popup.events.register("click", map, function() {if(me.popup != null) onPopupClick(feature.attributes);});
        
                      
        me.map.addPopup(me.popup);
    }
    var popupControl = new OpenLayers.Control.SelectFeature(layer,
    {
        onSelect: function(feature) {selectFeature(feature);}
    });
       
    this.map.addControl(popupControl);
            
    popupControl.activate();
}
