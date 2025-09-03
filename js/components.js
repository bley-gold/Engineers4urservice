function loadComponent(elementId, componentPath) {
  fetch(componentPath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html

      // Initialize mobile menu functionality after nav is loaded
      if (elementId === "navbar-container") {
        initializeMobileMenu()
        setActiveNavLink()
      }
    })
    .catch((error) => console.error("Error loading component:", error))
}

function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link, .nav-link-mobile")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      if (link.classList.contains("nav-link")) {
        link.classList.remove("text-gray-700")
        link.classList.add("text-blue-600", "border-b-2", "border-blue-600")
      } else {
        link.classList.remove("text-gray-700")
        link.classList.add("text-blue-600")
      }
    }
  })
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-container", "components/nav.html")
  loadComponent("footer-container", "components/footer.html")
})
