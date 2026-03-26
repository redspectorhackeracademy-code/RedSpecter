// File: assets/js/three-bg.js
function initThreeBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.001);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 250;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particles
  const geometry = new THREE.BufferGeometry();
  const particlesCount = 2500;
  
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i+=3) {
    // Spread in a large cube
    posArray[i] = (Math.random() - 0.5) * 1500; // x
    posArray[i+1] = (Math.random() - 0.5) * 1500; // y
    posArray[i+2] = (Math.random() - 0.5) * 1500; // z

    // Primary: Cyber Red, Secondary: White/Blue hue
    if(Math.random() > 0.4) {
      colorArray[i] = 1.0;   // r
      colorArray[i+1] = 0.0; // g
      colorArray[i+2] = 0.2; // b
    } else {
      colorArray[i] = 1.0;   // r
      colorArray[i+1] = 1.0; // g
      colorArray[i+2] = 1.0; // b
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

  // Custom cyber star particle material
  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(geometry, material);
  scene.add(particlesMesh);

  // Connection grid or wireframe
  const wireGeometry = new THREE.IcosahedronGeometry(300, 2);
  const wireMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xff003c, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.05 
  });
  const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  scene.add(wireMesh);

  // Mouse interact
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
  });

  // Scroll interact
  let scrollY = window.scrollY;
  document.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Constant slow rotation
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.02;
    wireMesh.rotation.x = elapsedTime * 0.1;
    wireMesh.rotation.y = elapsedTime * 0.1;

    // Scroll vertical + rotation interaction
    particlesMesh.position.y = scrollY * 0.15;
    wireMesh.position.y = scrollY * 0.2;

    // Parallax effect with damping
    targetX = mouseX * 0.05;
    targetY = mouseY * 0.05;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (-targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();
}

initThreeBackground();
