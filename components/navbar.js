// Reusable Navbar Component
const root = typeof ROOT_PATH !== 'undefined' ? ROOT_PATH : './';

const navbarHtml = `
<nav>
  <h1><a href="${root}index.html">RedSpecter</a></h1>
  <button class="hamburger" aria-label="Toggle Navigation">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </button>
  <ul class="nav-links">
    <li><a href="${root}index.html">Home</a></li>
    <li><a href="${root}pages/Syllabus.html">Courses</a></li>
    <li><a href="${root}lab.html">Labs</a></li>
    <li><a href="${root}pages/apply.html">Contact</a></li>
  </ul>
</nav>
`;

document.addEventListener("DOMContentLoaded", () => {
  const navbarWidget = document.getElementById("navbar-widget");
  if (navbarWidget) {
    navbarWidget.innerHTML = navbarHtml;

    // Mobile Menu Toggle Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      links.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
  }
});
