<script>
import { onMount } from 'svelte';
import L from "leaflet";
import  "leaflet.heat";

export let lat = 0;
export let lon = 0;
export let zoom = 10;

onMount(() => {
	var map = L.map('map');
    map.setView([lat, lon], zoom);

    var attribution = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>';
    
    var tiles = 'http://tilessputnik.ru/{z}/{x}/{y}.png?tag=retina';
    
    L.tileLayer(tiles, {
    maxZoom: 18,
    attribution: attribution
    }).addTo(map);

    var heat = L.heatLayer([
        [50.073, 14.4178, 0.2], // lat, lng, intensity
        [50.063, 14.5178, 0.5]
    ], {radius: 25}).addTo(map);
    });
</script>

<style>
    #map{
        height:100%;
        width:100%;
    }
</style>

<div id="map"></div>