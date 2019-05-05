<script>
import { onMount } from 'svelte';
import {callAPI} from './../helpers';
import {category,personal,mode} from './../state';

import L from "leaflet";
import  "leaflet.heat";

export let lat = 0;
export let lon = 0;
export let zoom = 10;

let utype = '1';
personal.subscribe((v)=>{
    if(v)
        utype = '/1';
    else
        utype='';
})

///api/v1/grade/06c711ef-fb86-41b9-b0c3-358fbe376ea9/user1


onMount(() => {
	let map = L.map('map');
    map.setView([lat, lon], zoom);
    map.on('click', e=>{
        let sample ={
            lat: e.latlng.lat,
            lon: e.latlng.lng,
            grade: ($mode ? 1 : -1),
            user_id: ($personal ? '1' : 'user_'+Math.round(Math.random()*100))
        }
        callAPI(`grade/${$category}`,sample).then(v=>load_heatmap(map));
    });

    let attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, , Imagery © <a href="https://here.com">HERE</a>';
    
    //var tiles = 'http://tilessputnik.ru/{z}/{x}/{y}.png?tag=retina';
    var tiles = 'https://1.base.maps.api.here.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?app_id=7jXO4KhVfvmyfZm14F5q&app_code=Z9MDX6xk1BUHuWUlB4os5A';
    
    L.tileLayer(tiles, {
    maxZoom: 18,
    attribution: attribution
    }).addTo(map);

    load_heatmap(map);
});

let hlayers = [];
const load_heatmap = (map) => {
    callAPI(`grade/${$category}${utype}`).then(data => {
    
        hlayers.forEach(l=>map.removeLayer(l));

        let positive = [];
        let negative = [];
        data.forEach((item)=>{
            if(item.grade == 1)
                positive.push([item.lat,item.lon,0.7])
            else
                negative.push([item.lat,item.lon,0.7])
        });
        hlayers.push(L.heatLayer(positive, {radius: 25, gradient:{1: 'lime'}}));
        hlayers.push(L.heatLayer(negative, {radius: 25, gradient:{1: 'red'}}));

        hlayers.forEach(l=>l.addTo(map));
    });
} 
    
</script>

<style>
    #map{
        height:100%;
        width:100%;
    }
</style>

<div id="map"></div>