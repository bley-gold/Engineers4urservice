/* Enhanced JavaScript functionality with smooth animations */

// Enhanced mobile menu toggle with animations
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initCarousel()
  initCounters()
  initScrollAnimations()
  initParallaxEffects()
  initSmoothScrolling()
  
  // Add loading animation to page
  document.body.classList.add("fade-in-up")
})

// Enhanced Carousel functionality with smoother transitions
function initCarousel() {
  const track = document.getElementById("carousel-track")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  if (!track || !prevBtn || !nextBtn) return

  let currentSlide = 0
  const slides = track.children
  const totalSlides = slides.length
  let isTransitioning = false

  function updateCarousel(smooth = true) {
    if (isTransitioning) return
    
    isTransitioning = true
    const translateX = -currentSlide * 100
    
    if (smooth) {
      track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    } else {
      track.style.transition = "none"
    }
    
    track.style.transform = `translateX(${translateX}%)`
    
    setTimeout(() => {
      isTransitioning = false
    }, 800)
  }

  function nextSlide() {
    if (isTransitioning) return
    currentSlide = (currentSlide + 1) % totalSlides
    updateCarousel()
    
    // Add slide animation effect
    const currentSlideElement = slides[currentSlide]
    currentSlideElement.style.animation = "fadeInRight 0.8s ease-out"
    setTimeout(() => {
      currentSlideElement.style.animation = ""
    }, 800)
  }

  function prevSlide() {
    if (isTransitioning) return
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
    updateCarousel()
    
    // Add slide animation effect
    const currentSlideElement = slides[currentSlide]
    currentSlideElement.style.animation = "fadeInLeft 0.8s ease-out"
    setTimeout(() => {
      currentSlideElement.style.animation = ""
    }, 800)
  }

  // Enhanced button interactions
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    nextSlide()
  })
  
  prevBtn.addEventListener("click", (e) => {
    e.preventDefault()
    prevSlide()
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "ArrowRight") {
      nextSlide()
    }
  })

  // Touch/swipe support
  let startX = 0
  let endX = 0

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
  })

  track.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    const diff = startX - endX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  })

  // Auto-play with pause on hover
  let autoPlayInterval = setInterval(nextSlide, 6000)
  
  track.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval)
  })
  
  track.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(nextSlide, 6000)
  })

  // Pause auto-play when page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(autoPlayInterval)
    } else {
      autoPlayInterval = setInterval(nextSlide, 6000)
    }
  })
}

// Enhanced counter animation with easing
function initCounters() {
  const counters = document.querySelectorAll(".counter")

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"))
    const duration = 2000 // 2 seconds
    const startTime = performance.now()
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(target * easeOutQuart)
      
      counter.textContent = current.toLocaleString()
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  // Enhanced intersection observer for counter animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        // Add scale animation when counter starts
        counter.style.animation = "scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        setTimeout(() => {
          animateCounter(counter)
        }, 300)
        observer.unobserve(counter)
      }
    })
  }, {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px"
  })

  counters.forEach((counter) => {
    observer.observe(counter)
  })
}

// Enhanced scroll animations with stagger effects
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target
        
        if (element.classList.contains("stagger-animation")) {
          // Animate children with stagger effect
          const children = element.children
          Array.from(children).forEach((child, index) => {
            // Force immediate visibility
            child.style.opacity = "1"
            child.style.transform = "translateY(0)"
            child.style.visibility = "visible"
          })
        } else {
          // Force immediate visibility for all elements
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
          element.style.visibility = "visible"
        }
        
        observer.unobserve(element)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".hover-lift, .floating-element, .fade-in-up, .stagger-animation, .card-hover"
  )

  animatedElements.forEach((element) => {
    // Set initial state
    element.style.opacity = "1"
    element.style.transform = "translateY(0)"
    element.style.visibility = "visible"
    element.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    observer.observe(element)
  })
}

// Parallax effects for enhanced visual appeal
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".floating-element")
  
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5
    
    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`
    })
  })
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      
      if (target) {
        const offsetTop = target.offsetTop - 80 // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        })
      }
    })
  })
}

// Smooth scroll to section with offset for fixed navbar
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    })
  }
}

// Enhanced form validation with smooth feedback
function validateForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  let isValid = true

  requiredFields.forEach((field) => {
    const value = field.value.trim()
    const fieldContainer = field.parentElement
    
    // Remove existing error states
    field.classList.remove("border-red-500", "shake")
    const existingError = fieldContainer.querySelector(".error-message")
    if (existingError) {
      existingError.remove()
    }

    if (!value) {
      field.classList.add("border-red-500")
      field.style.animation = "shake 0.5s ease-in-out"
      
      // Add error message
      const errorMsg = document.createElement("div")
      errorMsg.className = "error-message text-red-500 text-sm mt-1 fade-in-up"
      errorMsg.textContent = "This field is required"
      fieldContainer.appendChild(errorMsg)
      
      isValid = false
      
      // Remove shake animation after it completes
      setTimeout(() => {
        field.style.animation = ""
      }, 500)
    }
  })

  return isValid
}

// Enhanced email validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Add shake animation for form validation
const shakeKeyframes = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`

// Inject shake animation styles
const style = document.createElement("style")
style.textContent = shakeKeyframes
document.head.appendChild(style)

// Enhanced page transitions
function initPageTransitions() {
  // Add fade-in effect to page load
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease-in-out"
  
  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
  
  // Add fade-out effect to page navigation
  document.querySelectorAll("a[href$='.html']").forEach(link => {
    link.addEventListener("click", function(e) {
      if (this.hostname === window.location.hostname) {
        e.preventDefault()
        const href = this.href
        
        document.body.style.opacity = "0"
        setTimeout(() => {
          window.location.href = href
        }, 250)
      }
    })
  })
}

// Initialize page transitions
initPageTransitions()

// Add loading states for better UX
function showLoading(element) {
  element.classList.add("loading")
  element.style.pointerEvents = "none"
}

function hideLoading(element) {
  element.classList.remove("loading")
  element.style.pointerEvents = "auto"
}

// Enhanced error handling with user feedback
function showNotification(message, type = "info", duration = 5000) {
  const notification = document.createElement("div")
  notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`
  
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500"
  }[type] || "bg-blue-500"
  
  notification.className += ` ${bgColor} text-white`
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <svg class="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-auto">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `
  
  document.body.appendChild(notification)
  
  // Slide in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)
  
  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  }, duration)
}

// Performance optimizations
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations here
}, 16) // ~60fps

window.addEventListener("scroll", optimizedScrollHandler)
