document.addEventListener('DOMContentLoaded', () => {

  // Load Three.js dynamically and then init the 3D background
  const root = typeof ROOT_PATH !== 'undefined' ? ROOT_PATH : './';
  const script3js = document.createElement('script');
  script3js.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script3js.onload = () => {
    const bgScript = document.createElement('script');
    bgScript.src = root + 'assets/js/three-bg.js';
    document.body.appendChild(bgScript);
  };
  document.head.appendChild(script3js);
});
