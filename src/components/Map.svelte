<script>
import { onMount } from 'svelte';
import {callAPI} from './../helpers';
import {category,personal,mode,edit} from './../state';

import L from "leaflet";
import  "leaflet.heat";

export let lat = 0;
export let lon = 0;
export let zoom = 10;

let map = null;


let hlayers = [];
const load_heatmap = () => {
    if(map === null) return false;
    hlayers.forEach(l=>map.removeLayer(l));
    hlayers = [];

    let catlist = [];
    
    if($category instanceof Array) 
        catlist = $category;
    else
        catlist = [$category];

    catlist.forEach((ctgry)=>{
        callAPI(`grade/${ctgry}${utype}`).then(data => {
            let positive = [];
            let negative = [];
            data.forEach((item)=>{
                if(item.grade == 1)
                    positive.push([item.lat,item.lon,0.7])
                else
                    negative.push([item.lat,item.lon,0.7])
            });
            hlayers.push(L.heatLayer(positive, {radius: getRadius(map.getZoom()), gradient:{1: 'lime'}}));
            hlayers.push(L.heatLayer(negative, {radius: getRadius(map.getZoom()), gradient:{1: 'red'}}));

            hlayers.forEach(l=>l.addTo(map));
        });
    });
} 



let utype = '1';
personal.subscribe((v)=>{
    if(v)
        utype = '/1';
    else
        utype='';
});

category.subscribe(v=>{
    load_heatmap();
});


///api/v1/grade/06c711ef-fb86-41b9-b0c3-358fbe376ea9/user1


onMount(() => {
	map = L.map('map');
    map.setView([lat, lon], zoom);
    map.on('click', e=>{
        if(!$edit) return false;

        let sample ={
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            grade: ($mode ? 1 : -1),
            user_id: ($personal ? '1' : 'user_'+Math.round(Math.random()*100))
        }
        callAPI(`grade/${$category}`,sample).then(v=>load_heatmap(map));
    });
    map.on('zoomend', e=>{
        hlayers.forEach(l=>l.setOptions({radius: getRadius(map.getZoom())}).redraw());
    });

    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, , Imagery © <a href="https://here.com">HERE</a>';
    
    //var tiles = 'http://tilessputnik.ru/{z}/{x}/{y}.png?tag=retina';
    var tiles = 'https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?app_id=7jXO4KhVfvmyfZm14F5q&app_code=Z9MDX6xk1BUHuWUlB4os5A';
    
    L.tileLayer(tiles, {
    maxZoom: 18,
    attribution: attribution
    }).addTo(map);
    load_heatmap();
});

function getRadius(currentZoom){
    var radius;
    if (currentZoom === 7){
        radius=2
    }
    else if (currentZoom === 8) {
        radius = 4;
    }
    else if (currentZoom === 9) {
        radius = 6;
    }
    else if (currentZoom === 10) {
        radius = 8;
    }
    else if (currentZoom === 11) {
        radius = 10;
    }
    else if (currentZoom === 12) {
        radius = 12;
    }
    else if (currentZoom === 13) {
        radius = 14;
    }
    else if (currentZoom === 14) {
        radius = 16;
    }
    else if (currentZoom === 15) {
        radius = 18;
    }
    else if (currentZoom === 16) {
        radius = 20;
    }
    else if (currentZoom === 17) {
        radius = 22;
    }
    else if (currentZoom === 18) {
        radius = 24;
    }
    return radius;
}  
</script>

<style>
    #map{
        height:100%;
        width:100%;
    }
</style>

<div id="map"></div>