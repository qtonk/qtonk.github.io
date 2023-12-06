var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

function setupScene(){
  scene.add(camera);
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene.background = new THREE.Color(0xc8ccaf);
}
setupScene();

//model test 
const mloader = new THREE.GLTFLoader();
mloader.load(
  'assets/models/placeholder/kenney/survivalkit/structureBase.glb',
  // called when the resource is loaded
  function ( gltf ) {
    scene.add( gltf.scene );
    console.log("model loaded")
  },
  function ( error ) {
    console.log( 'An error happened' );
  }
);


var testmesh = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshStandardMaterial({ color: 0xffffff }));
testmesh.castShadow = true;
scene.add(testmesh)

sun.shadow.camera.updateProjectionMatrix()

const skyLight = new THREE.HemisphereLight(0x82b8ff, 0x6ec412, 1)
scene.add(sun, skyLight)

//resize
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", resize, false);
resize();

//main loop
var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();