window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
  return [
    {
      name: "cesiumman",
      src: "assets/CesiumMan/glTF-Embedded/CesiumMan.gltf",
      scale: "20 20 20",
      location: {
        lat: 21.008769,
        lng: 105.851390,
      },
    },
    {
      name: "boom",
      src: "assets/BoomBoxWithAxes/glTF/BoomBoxWithAxes.gltf",
      scale: "250 250 250",
      location: {
        lat: 21.008512,
        lng: 105.848589,
      },
    },
    {
      name: "magnemite",
      src: "assets/magnemite/scene.gltf",
      scale: "1 1 1",
      location: {
        lat: 21.006929,
        lng: 105.848670,
      },
    },
  ]
}

function renderPlaces(places) {
  let scene = document.querySelector("a-scene");

  places.forEach((place) => {
    let latitude = place.location.lat;
    let longitude = place.location.lng;

    let img = document.createElement("a-entity");
    img.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    // img.setAttribute("src", `${src}`);
    img.setAttribute("look-at", "[gps-camera]")
    img.setAttribute("gltf-model", place.src)
    img.setAttribute("rotation", "0 0 0")
    img.setAttribute('animation-mixer','')
    img.setAttribute("scale", place.scale)
    img.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });
    scene.appendChild(img);
  });
}
