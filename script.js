window.onload = () => {
  let places = staticLoadPlaces();
  renderPlaces(places);
};

function staticLoadPlaces() {
  return [
    {
      name: "cesiumman",
      src: "assets/CesiumMan/glTF-Embedded/CesiumMan.gltf",
      scale: "30 30 30",
      location: {
        lat: 21.008769,
        lng: 105.851390,
      },
    },
    {
      name: "robo",
      src: "assets/robo/BrainStem.gltf",
      scale: "20 20 20",
      location: {
        lat: 21.008512,
        lng: 105.848589,
      },
    },
    {
      name: "magnemite",
      src: "assets/magnemite/scene.gltf",
      scale: "2 2 2",
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

    let model = document.createElement("a-entity");
    model.setAttribute(
      "gps-entity-place",
      `latitude: ${latitude}; longitude: ${longitude};`
    );
    // model.setAttribute("src", `${src}`);
    model.setAttribute("look-at", "[gps-camera]")
    model.setAttribute("gltf-model", place.src)
    model.setAttribute("rotation", "0 0 0")
    model.setAttribute('animation-mixer','')
    model.setAttribute("scale", place.scale)
    model.addEventListener("loaded", () => {
      window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
    });
    scene.appendChild(model);
  });
}
