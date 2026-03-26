// Reusable Footer Component
const footerRoot = typeof ROOT_PATH !== 'undefined' ? ROOT_PATH : './';

const footerHtml = `
<footer class="main-footer">
  <div id="footer-3d-canvas-container"></div>
  <div class="footer-content">
    <div class="footer-brand">
      <h3 style="font-family: var(--font-heading); color: #fff; letter-spacing: 4px; margin-bottom: 10px;">REDSPECTER</h3>
      <p style="color: var(--text-muted); font-size: 14px;">Master Ethical Hacking, Web Exploitation, and Cyber Defense.</p>
    </div>
    
    <div class="footer-links">
      <h4>Explore</h4>
      <ul>
        <li><a href="${footerRoot}index.html">Home</a></li>
        <li><a href="${footerRoot}pages/Syllabus.html">Courses</a></li>
        <li><a href="${footerRoot}pages/apply.html">Apply Now</a></li>
      </ul>
    </div>
    
    <div class="footer-newsletter">
      <h4>Stay Updated</h4>
      <form class="subscribe-form" onsubmit="event.preventDefault(); alert('Subscribed to RedSpecter Intel!');">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit">Subscribe</button>
      </form>
    </div>
    
    <div class="footer-social">
      <h4>Connect</h4>
      <div class="social-icons">
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>© 2026 RedSpecter Cyber Academy | Built for Hackers</p>
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const footerWidget = document.getElementById("footer-widget");
  if (footerWidget) {
    footerWidget.innerHTML = footerHtml;
    tryInitFooter3D();
  }
});

function tryInitFooter3D() {
  if (typeof THREE !== 'undefined') {
    initFooter3D();
  } else {
    setTimeout(tryInitFooter3D, 100);
  }
}

function initFooter3D() {
  const container = document.getElementById('footer-3d-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  // Adjust camera aspect ratio to roughly match a footer
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 100;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create an attractive 3D Torus Knot
  const geometry = new THREE.TorusKnotGeometry(20, 5, 120, 20);
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xff003c, 
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  
  // Center it more and push it slightly to the right, to not overlap heavily
  torusKnot.position.x = 20;
  // Push it back slightly
  torusKnot.position.z = -20;
  scene.add(torusKnot);

  // Resize handler for footer
  window.addEventListener('resize', () => {
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  
  animate();
}
