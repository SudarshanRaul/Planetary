$(function(){
    var paper = new Raphael(0, 0, 1000, 500);
    
    var container = paper.rect(50, 50, 900, 400).attr({fill: "#fff"}).click(insertStar);
    
    var star;
    var planets = [];
    
    function insertStar(event){
        if(star){
            planetPath(event);
            return;
        }        
        var glow = {
            width: 25,
            height: 25,
            fill: false,
            opacity: 0.4,
            color: '#ffff00'
        };
        var attr = {
            stroke: '#ff8900',
            fill: '#ff8700',
            'fill-opacity': 0.6 
        };
        star = paper.circle(event.layerX, event.layerY, 25).attr(attr);
        star.glow(glow);
    }
    
    function planetPath(event){
        if(!star){
            return;
        }
        var attr = {
            stroke: '#cccccc',
            'stroke-dasharray': '-'
        };
        var radius = Math.sqrt(((star.attrs.cx - event.layerX)*(star.attrs.cx - event.layerX))+((star.attrs.cy - event.layerY)*(star.attrs.cy - event.layerY)));
        paper.circle(star.attrs.cx, star.attrs.cy, radius).attr(attr);
        
        insertPlanet(event);
    }
    
    function insertPlanet(event){
        if(!star){
            return;
        }
        var radius = Math.sqrt(((star.attrs.cx - event.layerX)*(star.attrs.cx - event.layerX))+((star.attrs.cy - event.layerY)*(star.attrs.cy - event.layerY)));
        var attr = {
            stroke: '#e5e306',
            fill: '#e5ba06',
        };
        var index = 0;
        var planet = paper.circle(event.layerX, event.layerY, 10).attr(attr);
        planets.push(planet);
        
        launchPlanet();
        function launchPlanet(){
            var  radian = index * Math.PI / 180;
            var center = {
                cx : event.layerX - Math.sin(radian) * radius,
                cy : event.layerY - Math.cos(radian) * radius
            };
            index++;
            planet.animate(center, 200, launchPlanet);
        }
    }
    
});