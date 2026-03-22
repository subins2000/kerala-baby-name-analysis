import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import keralaGeoJsonUrl from "./kerala.geojson?url";

let map;
let markers = [];

const colors = {
  "Kasaragod": "#ffefac",
  "Kannur": "#ffefac",
  "Kozhikode": "#ffefac",
  "Wayanad": "#ffefac",
  "Malappuram": "#ffacac",
  "Palakkad": "#ffacac",
  "Thrissur": "#ffacac",
  "Ernakulam": "#ffacac",
  "Idukki": "#abefff",
  "Alappuzha": "#abefff",
  "Kottayam": "#abefff",
  "Pathanamthitta": "#abefff",
  "Kollam": "#abefff",
  "Thiruvananthapuram": "#abefff"
};

const districtLabelCoords = {
  "Kasaragod": [74.0000, 12.5000],
  "Kannur": [75.4300, 11.8700],
  "Kozhikode": [75.7800, 11.2500],
  "Wayanad": [76.1000, 11.7000],
  "Malappuram": [76.0500, 11.0400],
  "Palakkad": [76.6500, 10.7800],
  "Thrissur": [76.2200, 10.5200],
  "Ernakulam": [76.3000, 10.0500],
  "Idukki": [77.0500, 9.8500],
  "Alappuzha": [76.3800, 9.5000],
  "Kottayam": [76.5500, 9.5900],
  "Pathanamthitta": [76.7800, 9.2700],
  "Kollam": [76.6000, 8.8900],
  "Thiruvananthapuram": [76.9500, 8.5200]
};

fetch(keralaGeoJsonUrl)
  .then(res => res.json())
  .then(json => {

    // ✅ Blank map (no tiles)
    map = new maplibregl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {},
        layers: []
      },
      center: [76.2711, 10.8505],
      zoom: 6.5
    });

    map.on('load', () => {

      // ✅ Add Kerala districts GeoJSON
      map.addSource('kerala', {
        type: 'geojson',
        data: json
      });

      // ✅ Fill layer (district colors)
      map.addLayer({
        id: 'district-fill',
        type: 'fill',
        source: 'kerala',
        paint: {
          'fill-color': [
            'match',
            ['get', 'name'],
            ...Object.entries(colors).flat(),
            '#ccc' // default
          ],
          'fill-opacity': 0.5
        }
      });

      // ✅ Border layer
      map.addLayer({
        id: 'district-border',
        type: 'line',
        source: 'kerala',
        paint: {
          'line-color': '#000',
          'line-width': 0.5
        }
      });

      // Use one marker per district to avoid duplicate labels from multi-polygons.
      markers.forEach(marker => marker.remove());
      markers = [];

      Object.values(districtLabelCoords).forEach(coords => {
        const label = document.createElement('div');
        label.textContent = 'aa';
        label.style.fontSize = '12px';
        label.style.fontWeight = '600';
        label.style.color = '#111';
        label.style.whiteSpace = 'nowrap';
        label.style.transform = 'translateX(-18px)';

        const marker = new maplibregl.Marker({
          element: label,
          anchor: 'center'
        }).setLngLat(coords).addTo(map);

        markers.push(marker);
      });
    });
  });
