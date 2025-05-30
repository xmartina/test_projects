document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      mobileMenu.classList.toggle("mobile-menu-enter")
    })
  }

  // Password toggle functionality
  const togglePassword = document.getElementById("toggle-password")
  const passwordInput = document.getElementById("password-input")
  const eyeOpen = document.getElementById("eye-open")
  const eyeClosed = document.getElementById("eye-closed")

  if (togglePassword && passwordInput && eyeOpen && eyeClosed) {
    togglePassword.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
      passwordInput.setAttribute("type", type)

      if (type === "password") {
        eyeOpen.classList.remove("hidden")
        eyeClosed.classList.add("hidden")
      } else {
        eyeOpen.classList.add("hidden")
        eyeClosed.classList.remove("hidden")
      }
    })
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe all elements with animate-on-scroll class
  const animateElements = document.querySelectorAll(".animate-on-scroll")
  animateElements.forEach((el) => observer.observe(el))

  // Header scroll effect
  const header = document.querySelector("header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
      header?.classList.remove("shadow-2xl")
      return
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      header?.classList.add("shadow-2xl")
    } else if (currentScroll < lastScroll) {
      // Scrolling up
      header?.classList.remove("shadow-2xl")
    }

    lastScroll = currentScroll
  })

  // Form validation and submission
  const loginForm = document.querySelector("form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = loginForm.querySelector('input[type="email"]')
      const matricNumber = loginForm.querySelector('input[type="text"]')
      const password = loginForm.querySelector('input[type="password"], input[type="text"]')
      const submitBtn = loginForm.querySelector('button[type="submit"]')

      // Basic validation
      let isValid = true
      const inputs = [email, matricNumber, password]

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.classList.add("border-red-500", "bg-red-50")
          input.classList.remove("border-slate-200")
        } else {
          input.classList.remove("border-red-500", "bg-red-50")
          input.classList.add("border-slate-200")
        }
      })

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (email.value && !emailRegex.test(email.value)) {
        isValid = false
        email.classList.add("border-red-500", "bg-red-50")
      }

      if (isValid) {
        // Show loading state
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = `
          <span class="flex items-center justify-center space-x-2">
            <div class="spinner"></div>
            <span>Signing In...</span>
          </span>
        `
        submitBtn.disabled = true

        // Simulate login process
        setTimeout(() => {
          alert("Login successful! Redirecting to dashboard...")
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
          loginForm.reset()
        }, 2000)
      } else {
        // Show error message
        const errorDiv = document.createElement("div")
        errorDiv.className = "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4"
        errorDiv.innerHTML = "Please fill in all fields correctly."

        // Remove existing error messages
        const existingError = loginForm.querySelector(".bg-red-100")
        if (existingError) {
          existingError.remove()
        }

        loginForm.appendChild(errorDiv)

        // Remove error message after 5 seconds
        setTimeout(() => {
          errorDiv.remove()
        }, 5000)
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add hover effects to cards
  const cards = document.querySelectorAll(".group")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-4px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Notification cards click handler
  const notificationCards = document.querySelectorAll(".cursor-pointer")
  notificationCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Add a subtle animation
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)

      // Here you could navigate to the full article
      console.log("Navigating to full article...")
    })
  })

  // Add typing effect to hero title (optional enhancement)
  const heroTitle = document.querySelector("h1")
  if (heroTitle) {
    const text = heroTitle.innerHTML
    heroTitle.innerHTML = ""
    let i = 0

    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000)
  }

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector(".relative.min-h-screen")
    if (parallax) {
      const speed = scrolled * 0.5
      parallax.style.transform = `translateY(${speed}px)`
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenu && !event.target.closest("nav") && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
    }
  })

  // Add loading animation to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.disabled) {
        this.style.transform = "scale(0.95)"
        setTimeout(() => {
          this.style.transform = "scale(1)"
        }, 150)
      }
    })
  })

  // Initialize AOS (Animate On Scroll) alternative
  function initScrollAnimations() {
    const elements = document.querySelectorAll(".animate-on-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate")
            }, index * 100) // Stagger animations
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    elements.forEach((el) => observer.observe(el))
  }

  initScrollAnimations()

  // Add performance monitoring
  window.addEventListener("load", () => {
    console.log("Page loaded successfully")

    // Add a subtle fade-in to the entire page
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.5s ease-in-out"

    setTimeout(() => {
      document.body.style.opacity = "1"
    }, 100)
  })
})

// Utility functions
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
  // Handle scroll events here
}, 10)

window.addEventListener("scroll", optimizedScrollHandler)
