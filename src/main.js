import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {Pane} from 'tweakpane';

// Initialize the pane
const pane = new Pane();

// Initialize the scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load('static/textures/2k_sun.jpg');
const mercuryTexture = textureLoader.load('static/textures/2k_mercury.jpg');
const venusTexture = textureLoader.load('static/textures/2k_venus_surface.jpg');
const earthTexture = textureLoader.load('static/textures/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('static/textures/2k_mars.jpg');
const jupiterTexture = textureLoader.load('static/textures/2k_jupiter.jpg');
const saturnTexture = textureLoader.load('static/textures/2k_saturn.jpg');
const uranusTexture = textureLoader.load('static/textures/2k_uranus.jpg');
const neptuneTexture = textureLoader.load('static/textures/2k_neptune.jpg');
const moonTexture = textureLoader.load('static/textures/2k_moon.jpg');
const backgroundTexture = textureLoader.load('static/textures/2k_stars_milky_way.jpg');
// scene.background = backgroundTexture;

scene.background = new THREE.CubeTextureLoader()
    .setPath('./static/textures/cubeMap/')
    .load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png'
    ]);


// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture
});
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture
});
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture
});
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture
});
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture
});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
);
sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: 'Mercury',
    radius: 0.4,
    distance: 10,
    speed: 0.04,
    material: mercuryMaterial,
    moons: []
  }, 
  {
    name: 'Venus',
    radius: 0.9,
    distance: 15,
    speed: 0.015,
    material: venusMaterial,
    moons: []
  }, 
  {
    name: 'Earth',
    radius: 1,
    distance: 20,
    speed: 0.01,
    material: earthMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.27, 
        distance: 2,
        speed: 0.036,
      }
    ]
  }, 
  {
    name: 'Mars',
    radius: 0.6,
    distance: 25,
    speed: 0.008,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1, 
        distance: 1.2,
        speed: 0.05,
      }, 
      {
        name: 'Deimos',
        radius: 0.08, 
        distance: 1.8,
        speed: 0.035,
      }, 
    ]
  }, 
  {
    name: 'Jupiter',
    radius: 2.5,
    distance: 40,
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      {
        name: 'Io',
        radius: 0.3, 
        distance: 4,
        speed: 0.04,
      }, 
      {
        name: 'Europa',
        radius: 0.25, 
        distance: 5,
        speed: 0.03,
      }, 
      {
        name: 'Ganymede',
        radius: 0.35, 
        distance: 6,
        speed: 0.02,
      }, 
      {
        name: 'Callisto',
        radius: 0.32, 
        distance: 7,
        speed: 0.015,
      }, 
    ]
  }, 
  {
    name: 'Saturn',
    radius: 2.2,
    distance: 60,
    speed: 0.0009,
    material: saturnMaterial,
    moons: [
      {
        name: 'Titan',
        radius: 0.35, 
        distance: 4,
        speed: 0.012,
      }, 
      {
        name: 'Rhea',
        radius: 0.15, 
        distance: 3,
        speed: 0.015,
      }, 
      {
        name: 'Iapetus',
        radius: 0.14,
        distance: 5,
        speed: 0.006
      }
    ]
  }, 
  {
    name: 'Uranus',
    radius: 1.5,
    distance: 80,
    speed: 0.0004,
    material: uranusMaterial,
    moons: [
      {
        name: 'Titania',
        radius: 0.2, 
        distance: 2.5,
        speed: 0.014,
      }, 
      {
        name: 'Oberon',
        radius: 0.18, 
        distance: 3,
        speed: 0.011,
      }, 
    ]
  }, 
  {
    name: 'Neptune',
    radius: 1.4,
    distance: 100,
    speed: 0.0001,
    material: neptuneMaterial,
    moons: [
      {
        name: 'Triton',
        radius: 0.22, 
        distance: 2.5,
        speed: 0.016,
      }, 
    ]
  }, 
]

const createPlanet = (planet) => {
  // create the mesh and add it to the scene 
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  );
  // set the scale 
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  return planetMesh;
}

const createMoon = (moon) => {
  // create the mesh and add it to the scene 
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
  )
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = moon.distance;
  return moonMesh;
}

const planetMeshes = planets.map(planet => {
  // create the mesh
  const planetMesh = createPlanet(planet);
  // add it to our scene
  scene.add(planetMesh);
  // loop through each moon and create the moon
  planet.moons.forEach(moon => {
    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  })
  return planetMesh;
})

// add lights
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.03
);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(
  0xfff8e7,
  1000
);
scene.add(pointLight);

// Initialize the camera 
const camera = new THREE.PerspectiveCamera( 
  35, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  400
);

camera.position.z = 100;
camera.position.y = 5;

const canvas = document.querySelector('canvas.threejs');
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

window.addEventListener('resize', () => {
  console.log('Resized!');
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();                             // Must be called after any change of camera properties.
  renderer.setSize( window.innerWidth, window.innerHeight );
});

console.log(planetMeshes);

// render loop 
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed;
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance;
    })
  })
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
}

renderloop();
