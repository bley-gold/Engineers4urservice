function loadComponent(elementId, componentPath) {
  fetch(componentPath)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById(elementId).innerHTML = html

      // Initialize mobile menu functionality after nav is loaded
      if (elementId === "navbar-container") {
        initializeMobileMenu()
        setActiveNavLink()
        initializeScrollEffects()
      }
    })
    .catch((error) => console.error("Error loading component:", error))
}

function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    // Enhanced mobile menu toggle with animation
    mobileMenuButton.addEventListener("click", (e) => {
      e.preventDefault()
      const isHidden = mobileMenu.classList.contains("hidden")
      const arrow = mobileMenuButton.querySelector("svg")
      
      if (isHidden) {
        mobileMenu.classList.remove("hidden")
        // Trigger reflow for animation
        mobileMenu.offsetHeight
        mobileMenu.style.animation = "slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        // Rotate arrow up
        if (arrow) {
          arrow.style.transform = "rotate(180deg)"
        }
      } else {
        mobileMenu.style.animation = "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
        // Rotate arrow down
        if (arrow) {
          arrow.style.transform = "rotate(0deg)"
        }
        setTimeout(() => {
          mobileMenu.classList.add("hidden")
        }, 300)
      }
    })

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        if (!mobileMenu.classList.contains("hidden")) {
          const arrow = mobileMenuButton.querySelector("svg")
          mobileMenu.style.animation = "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
          // Rotate arrow down
          if (arrow) {
            arrow.style.transform = "rotate(0deg)"
          }
          setTimeout(() => {
            mobileMenu.classList.add("hidden")
          }, 300)
        }
      }
    })

    // Close mobile menu on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        const arrow = mobileMenuButton.querySelector("svg")
        mobileMenu.classList.add("hidden")
        // Reset arrow rotation
        if (arrow) {
          arrow.style.transform = "rotate(0deg)"
        }
      }
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
        link.classList.add("text-blue-600", "font-semibold")
        // Add active indicator
        const indicator = document.createElement("div")
        indicator.className = "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"
        link.style.position = "relative"
        link.appendChild(indicator)
      } else {
        link.classList.remove("text-gray-700")
        link.classList.add("text-blue-600", "font-semibold")
      }
    }
  })
}

function initializeScrollEffects() {
  // Navbar scroll effect
  const navbar = document.querySelector("nav")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY
    
    if (currentScrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
    
    lastScrollY = currentScrollY
  })

  // Scroll progress indicator
  const scrollIndicator = document.createElement("div")
  scrollIndicator.className = "scroll-indicator"
  document.body.appendChild(scrollIndicator)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`
  })
}

// Enhanced intersection observer for animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        
        // Add appropriate animation class based on element
        if (element.classList.contains("fade-in-up")) {
          element.style.animationPlayState = "running"
        } else if (element.classList.contains("stagger-animation")) {
          element.style.animationPlayState = "running"
        } else {
          element.classList.add("fade-in-up")
        }
        
        observer.unobserve(element)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".hover-lift, .floating-element, .card-hover, .fade-in-up, .stagger-animation"
  )

  animatedElements.forEach((element) => {
    observer.observe(element)
  })
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar-container", "components/nav.html")
  loadComponent("footer-container", "components/footer.html")
  
  // Initialize scroll animations after a short delay
  setTimeout(initializeScrollAnimations, 100)
})
