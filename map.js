let map, infoWindow;

function setLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
  
}

function setMarker(){
    let position = {lat: 49.03870904486135, lng:  8.287087109905027};
    new google.maps.Marker({
        position: position,
        map: map,
        label: {
            text: "warning_amber",
            fontFamily: "Material Icons",
            color: "#ffffff",
            fontSize: "16px",
          },
      
      });
}

function initMap() {
 
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49, lng:  8 },
    zoom: 13,
    mapId: '29dd8aef47072665',
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: true,
    fullscreenControl: false

  });
  infoWindow = new google.maps.InfoWindow();

  setLocation();
  setMarker();
}
