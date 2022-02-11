let map, infoWindow, positionUser;



function getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            return {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          
          },
        );
      } else {
        // Browser doesn't support Geolocation
      }
  
}


function updateactualPosition(){

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
       
        map.setCenter(pos);
        positionUser.setPosition(pos);
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

setInterval(function(){

  updateactualPosition();
},3000);

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
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
           const marker = new google.maps.Marker({
                position: pos,
                map: map,
                label: {
                    text: "warning_amber",
                    fontFamily: "Material Icons",
                    color: "#ffffff",
                    fontSize: "16px",
                  },
              
              });
              let date = new Date();
              const infoWindow = new google.maps.InfoWindow({content: "Funddatum: " + date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes(),});
              marker.addListener("click", ()=> {
                            infoWindow.open(map,marker);
                          });

            
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

  const svgMarker = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    fillColor: "red",
    fillOpacity: 0.6,
    rotation: 0,
    scale: 4,
  };


  positionUser =  new google.maps.Marker({
    position:  { lat: 49, lng:  8 },
    map: map,
    icon: svgMarker
  }); 

 

  setLocation();
}
