// Contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Validate form
      if (!validateContactForm(this)) {
        return
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Create FormData object
      const formData = new FormData(this)

      // Send form data to PHP script
      fetch("vendor/send-email.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showMessage("Thank you! Your message has been sent successfully.", "success")
            contactForm.reset()
          } else {
            showMessage(data.message || "Sorry, there was an error sending your message. Please try again.", "error")
          }
        })
        .catch((error) => {
          console.error("Error:", error)
          showMessage("Sorry, there was an error sending your message. Please try again.", "error")
        })
        .finally(() => {
          // Reset button
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        })
    })
  }
})

function validateContactForm(form) {
  const requiredFields = form.querySelectorAll("[required]")
  const emailField = form.querySelector("#email")
  let isValid = true

  // Check required fields
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("border-red-500")
      isValid = false
    } else {
      field.classList.remove("border-red-500")
    }
  })

  // Validate email
  if (emailField && emailField.value && !validateEmail(emailField.value)) {
    emailField.classList.add("border-red-500")
    isValid = false
  }

  return isValid
}

function showMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Create message element
  const messageDiv = document.createElement("div")
  messageDiv.className = `form-message p-4 rounded-md mb-4 ${type === "success" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`
  messageDiv.textContent = message

  // Insert message before form
  const form = document.getElementById("contact-form")
  form.parentNode.insertBefore(messageDiv, form)

  // Auto-remove message after 5 seconds
  setTimeout(() => {
    messageDiv.remove()
  }, 5000)
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
