// JavaScript principal para R&CNetworks

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar todas las funcionalidades
  initMobileMenu();
  initNavbarScroll();
  initAnimations();
  initFormValidation();
  initSmoothScroll();
  initContactForm();
});

// Función para el menú móvil
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Función para el navbar con scroll
function initNavbarScroll() {
  const navbar = document.querySelector("nav");

  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    });
  }
}

// Función para animaciones al hacer scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
      }
    });
  }, observerOptions);

  // Observar elementos que necesitan animación
  const animatedElements = document.querySelectorAll(".card, .feature-item");
  animatedElements.forEach((el) => observer.observe(el));
}

// Función para validación de formularios
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validateForm(form)) {
        // Mostrar loader
        showLoader();

        // Simular envío (reemplazar con lógica real)
        setTimeout(() => {
          hideLoader();
          showSuccessMessage("Formulario enviado correctamente");
        }, 2000);
      }
    });
  });
}

// Función para validar formulario
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, "Este campo es requerido");
      isValid = false;
    } else if (input.type === "email" && !isValidEmail(input.value)) {
      showError(input, "Ingrese un email válido");
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para mostrar error
function showError(input, message) {
  const errorDiv =
    input.parentNode.querySelector(".error-message") ||
    createErrorElement(input.parentNode);
  errorDiv.textContent = message;
  input.classList.add("border-red-500");
}

// Función para limpiar error
function clearError(input) {
  const errorDiv = input.parentNode.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
  input.classList.remove("border-red-500");
}

// Función para crear elemento de error
function createErrorElement(parent) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message text-red-500 text-sm mt-1";
  parent.appendChild(errorDiv);
  return errorDiv;
}

// Función para scroll suave
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Función para el formulario de contacto
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Aquí puedes enviar los datos a tu backend PHP
      console.log("Datos del formulario:", data);

      // Simular envío
      showLoader();
      setTimeout(() => {
        hideLoader();
        showSuccessMessage(
          "Mensaje enviado correctamente. Te contactaremos pronto."
        );
        this.reset();
      }, 2000);
    });
  }
}

// Función para mostrar loader
function showLoader() {
  const loader = document.createElement("div");
  loader.id = "loader-overlay";
  loader.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  loader.innerHTML = '<div class="loader"></div>';
  document.body.appendChild(loader);
}

// Función para ocultar loader
function hideLoader() {
  const loader = document.getElementById("loader-overlay");
  if (loader) {
    loader.remove();
  }
}

// Función para mostrar mensaje de éxito
function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  successDiv.textContent = message;
  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Función para mostrar mensaje de error
function showErrorMessage(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className =
    "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// Función para hacer peticiones AJAX
function makeRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Error en la petición"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Error de red"));
    };

    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}

// Función para actualizar el año en el footer
function updateFooterYear() {
  const yearElement = document.querySelector(".footer-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Función para modo oscuro (opcional)
function initDarkMode() {
  const darkModeToggle = document.getElementById("dark-mode-toggle");

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });

    // Cargar preferencia guardada
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }
}

// Función para lazy loading de imágenes
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Inicializar funciones adicionales
updateFooterYear();
initDarkMode();
initLazyLoading();
