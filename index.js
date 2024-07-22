//Respect for https://threejs.org/examples/?q=lines#webgl_lines_sphere;
window.addEventListener("DOMContentLoaded", startup());
var camera, scene, renderer,z;
var ticks;
var dsu;

async function loaded() {
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms));
  var name = "Raku Kurahashi Portfolio"
  let iss;
  for (var i = 1; i <= 33; i++) {
    iss = i * 2.3;
    $('#loaded-message').text(name.substr(0,i))
    await sleep(100)
  } 
}


function createGeometry() {

  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const vertex = new THREE.Vector3(); 
  var r = 450;

  for ( let i = 0; i < 300; i ++ ) {

    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    vertex.normalize();
    vertex.multiplyScalar( r );

    vertices.push( vertex.x, vertex.y, vertex.z );

    vertex.multiplyScalar( Math.random() * 0.09 + 1 );

    vertices.push( vertex.x, vertex.y, vertex.z );

  }

  geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

  return geometry;

}
function init() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 80, width / height, 1, 3000 );
  z=1000
  camera.position.z = z
  const geometry = createGeometry();

  const parameters = [[ 0.25, 1 ], [ 0.5, 1 ], [ 0.75, 0.75 ], [ 1,0.5 ], [ 1.25, 0.8 ],
          [ 3.0, 0.75 ], [ 3.5,0.5 ], [ 4.5,0.25 ], [ 5.5,0.125 ]];

  for ( let i = 0; i < parameters.length; ++ i ) {
    const p = parameters[ i ];
    const material = new THREE.LineBasicMaterial( { color: 0xffffff, opacity:  p[1] } );
    const line = new THREE.LineSegments( geometry, material );
    line.scale.x = line.scale.y = line.scale.z = p[ 0 ];
    line.userData.originalScale = p[ 0 ];
    line.rotation.y = Math.random() * Math.PI;
    line.updateMatrix();
    scene.add( line );
  }
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#startup")
  });
  document.body.appendChild( renderer.domElement );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  tick();
}
function tick() {
  ticks = requestAnimationFrame( tick );
  render();
  if (z <= -2000) {cancelAnimationFrame( ticks );console.log("TEST");shutload();}
}
function shutload() {
  dsu.style.display = "none";
  document.getElementById('another').style.display = "block";
}
async function render() {
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve,ms));
  z -= 6;
  camera.position.z = z;
  await sleep(1)
  renderer.render( scene, camera );
}
async function startup() {
  dsu = document.getElementById('startup');
  await loaded()
  await $('#loaded-message').hide()
  await init()
}
