 require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/TileLayer",
    "esri/widgets/Slider"
  ], function(esriConfig, Map, MapView, FeatureLayer, TileLayer, Slider) {

  esriConfig.apiKey = "YOUR_API_KEY";

  // Create a style for the chartsLayer
  const renderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol: {
      type: "simple-fill",  // autocasts as new SimpleFillSymbol()
      color: [ 255, 128, 0, 0.5 ],
      outline: {  // autocasts as new SimpleLineSymbol()
        width: 2,
        color: "gray"
      }
    }
  }; 

  // add FIPS TileLayers to the map
  const fips_1897 = new TileLayer({
     url: "https://portal1-geo.sabu.mtu.edu/server/rest/services/Hosted/Sanborn_1897_5/MapServer"
  });

  // Add the excavation sites layer to the map   
  const sitesLayer = new FeatureLayer({
    url: "https://portal1-geo.sabu.mtu.edu/server/rest/services/Hosted/OHC_Excavation_Boundaries/FeatureServer/0",
    outFields: ["*"], // Return all fields so it can be queried client-side
    renderer: renderer
  });

  const map = new Map({
    basemap: "satellite",
    layers: [fips_1897, sitesLayer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-83.0496,42.3928],
    zoom: 16
  });

  

  //map.add(fips_1897);

  // add esri widgets
  const slider = new Slider({
    container: "sliderDiv",
    layout: "vertical",
    min: 0,
    max: 100,
    values: [ 100 ],
    snapOnClickEnabled: false,
    visibleElements: {
      labels: false,
      rangeLabels: true
    }
  });
/*//Trailheads feature layer (points)
  const trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
  });

  map.add(trailheadsLayer);

//Trails feature layer (lines)
  const trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
  });

  map.add(trailsLayer, 0);

// Parks and open spaces (polygons)
  const parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
  });

  map.add(parksLayer, 0);*/

  });