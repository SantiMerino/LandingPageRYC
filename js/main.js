// Main JavaScript for R&C Networks
// Simplified version for Hostgator hosting

console.log("Main.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");
  initializeNavbar();
  initializeAnimations();
  initializeForms();
});

// Navbar functionality
function initializeNavbar() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close mobile menu when clicking on links
  const mobileLinks = mobileMenu?.querySelectorAll("a");
  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Initialize dropdowns
  initializeDropdowns();

  // Navbar sticky effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 100) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });
}

// Dropdown functionality - Click only (no hover)
function initializeDropdowns() {
  console.log("Initializing dropdowns...");
  const dropdowns = document.querySelectorAll(".dropdown");
  console.log("Found dropdowns:", dropdowns.length);

  dropdowns.forEach((dropdown, index) => {
    console.log(`Setting up dropdown ${index + 1}`);
    const button = dropdown.querySelector("button");
    const content = dropdown.querySelector(".dropdown-content");

    if (button && content) {
      let isOpen = false;

      // Function to open dropdown
      const openDropdown = () => {
        if (!isOpen) {
          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              const otherButton = otherDropdown.querySelector("button");
              const otherContent =
                otherDropdown.querySelector(".dropdown-content");
              if (otherContent) {
                otherContent.classList.remove("show");
                if (otherButton) {
                  otherButton.setAttribute("aria-expanded", "false");
                }
              }
            }
          });

          content.classList.add("show");
          button.setAttribute("aria-expanded", "true");
          isOpen = true;

          // Animate dropdown items
          animateDropdownItems(content);
        }
      };

      // Function to close dropdown
      const closeDropdown = () => {
        if (isOpen) {
          content.classList.remove("show");
          button.setAttribute("aria-expanded", "false");
          isOpen = false;
        }
      };

      // Animate dropdown items
      const animateDropdownItems = (dropdownContent) => {
        const items = dropdownContent.querySelectorAll("a");
        items.forEach((item, index) => {
          item.style.setProperty("--item-index", index);
          item.style.animation = "none";
          item.offsetHeight; // Trigger reflow
          item.style.animation = `dropdownItemFadeIn 0.3s ease forwards ${
            index * 0.05
          }s`;
        });
      };

      // Toggle dropdown on click only
      button.addEventListener("click", function (e) {
        console.log("Dropdown button clicked!");
        e.preventDefault();
        e.stopPropagation();

        if (isOpen) {
          console.log("Closing dropdown");
          closeDropdown();
        } else {
          console.log("Opening dropdown");
          openDropdown();
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          closeDropdown();
        }
      });

      // Close dropdown when clicking on links
      const dropdownLinks = content.querySelectorAll("a");
      dropdownLinks.forEach((link) => {
        link.addEventListener("click", () => {
          closeDropdown();
        });
      });

      // Keyboard navigation
      button.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        }
      });

      // Close dropdown on escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeDropdown();
        }
      });
    }
  });
}

// Animations
function initializeAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll(".animate-fade-in");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Form handling
function initializeForms() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

// Form submission handler
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  // Show loading state
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;

  try {
    // Simulate form submission (replace with actual endpoint)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Show success message
    showNotification(
      "¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.",
      "success"
    );
    form.reset();
  } catch (error) {
    // Show error message
    showNotification(
      "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      "error"
    );
  } finally {
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
      ? "bg-red-500 text-white"
      : "bg-blue-500 text-white"
  }`;

  notification.innerHTML = `
      <div class="flex items-center">
          <div class="flex-shrink-0">
              ${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
          </div>
          <div class="ml-3">
              <p class="text-sm font-medium">${message}</p>
          </div>
          <div class="ml-auto pl-3">
              <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                  ✕
              </button>
          </div>
      </div>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Smooth scrolling for anchor links
function smoothScrollTo(element) {
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Initialize smooth scrolling for anchor links
document.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.getAttribute("href")?.startsWith("#")
  ) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    smoothScrollTo(targetElement);
  }
});
