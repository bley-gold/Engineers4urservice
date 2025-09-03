/* Moving JavaScript to correct directory structure */
// Main JavaScript functionality for static version

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Carousel functionality
  initCarousel()

  // Counter animation
  initCounters()

  // Scroll animations
  initScrollAnimations()
})

// Carousel functionality
function initCarousel() {
  const track = document.getElementById("carousel-track")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  if (!track || !prevBtn || !nextBtn) return

  let currentSlide = 0
  const slides = track.children
  const totalSlides = slides.length

  function updateCarousel() {
    const translateX = -currentSlide * 100
    track.style.transform = `translateX(${translateX}%)`
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides
    updateCarousel()
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateCarousel()
  }

  nextBtn.addEventListener("click", nextSlide)
  prevBtn.addEventListener("click", prevSlide)

  // Auto-play carousel
  setInterval(nextSlide, 6000)
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll(".counter")

  const animateCounter = (counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }

  // Intersection Observer for counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        animateCounter(counter)
        observer.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".hover-lift, .floating-element")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.8s ease-out"
    observer.observe(element)
  })
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    })
  }
}

// Form validation and submission
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("border-red-500")
      isValid = false
    } else {
      field.classList.remove("border-red-500")
    }
  })

  return isValid
}

// Email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
