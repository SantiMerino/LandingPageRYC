// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initializeNavbar();
  initializeAnimations();
  initializeForms();
});

// Funcionalidad del navbar
function initializeNavbar() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  const mobileLinks = mobileMenu?.querySelectorAll("a");
  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Inicializar dropdowns
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

// Funcionalidad mejorada para dropdowns
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");
  let hoverTimeout;
  let isDesktop = window.innerWidth >= 768;

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector("button");
    const content = dropdown.querySelector(".dropdown-content");

    if (button && content) {
      // Variables para control de hover
      let isHovering = false;
      let isOpen = false;

      // Función para abrir dropdown
      const openDropdown = () => {
        if (!isOpen) {
          // Cerrar otros dropdowns abiertos
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

          // Animar elementos del dropdown
          animateDropdownItems(content);
        }
      };

      // Función para cerrar dropdown
      const closeDropdown = () => {
        if (isOpen) {
          content.classList.remove("show");
          button.setAttribute("aria-expanded", "false");
          isOpen = false;
        }
      };

      // Función para animar elementos del dropdown
      const animateDropdownItems = (dropdownContent) => {
        const items = dropdownContent.querySelectorAll("a");
        items.forEach((item, index) => {
          item.style.setProperty("--item-index", index);
          // Resetear animación
          item.style.animation = "none";
          item.offsetHeight; // Trigger reflow
          item.style.animation = `dropdownItemFadeIn 0.3s ease forwards ${
            index * 0.05
          }s`;
        });
      };

      // Toggle dropdown al hacer click
      button.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });

      // Eventos de hover para desktop
      if (isDesktop) {
        // Hover en el botón
        button.addEventListener("mouseenter", () => {
          isHovering = true;
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            if (isHovering) {
              openDropdown();
            }
          }, 150); // Delay de 150ms
        });

        button.addEventListener("mouseleave", () => {
          isHovering = false;
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            if (!isHovering) {
              closeDropdown();
            }
          }, 200); // Delay de 200ms para cerrar
        });

        // Hover en el contenido del dropdown
        content.addEventListener("mouseenter", () => {
          isHovering = true;
          clearTimeout(hoverTimeout);
        });

        content.addEventListener("mouseleave", () => {
          isHovering = false;
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            if (!isHovering) {
              closeDropdown();
            }
          }, 200);
        });
      }

      // Cerrar dropdown al hacer click fuera
      document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
          closeDropdown();
        }
      });

      // Cerrar dropdown al hacer click en un enlace del dropdown
      const dropdownLinks = content.querySelectorAll("a");
      dropdownLinks.forEach((link) => {
        link.addEventListener("click", () => {
          closeDropdown();
        });

        // Efecto de hover mejorado para enlaces
        if (isDesktop) {
          link.addEventListener("mouseenter", () => {
            link.style.transform = "translateX(4px)";
            // Animar icono
            const icon = link.querySelector("svg");
            if (icon) {
              icon.style.transform = "scale(1.1)";
            }
          });

          link.addEventListener("mouseleave", () => {
            link.style.transform = "translateX(0)";
            // Resetear icono
            const icon = link.querySelector("svg");
            if (icon) {
              icon.style.transform = "scale(1)";
            }
          });
        }
      });

      // Navegación con teclado mejorada
      button.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          button.click();
        } else if (e.key === "ArrowDown" && !isOpen) {
          e.preventDefault();
          openDropdown();
          // Enfocar el primer enlace
          const firstLink = content.querySelector("a");
          if (firstLink) {
            firstLink.focus();
          }
        }
      });

      // Navegación con teclado en el contenido del dropdown
      content.addEventListener("keydown", function (e) {
        const links = content.querySelectorAll("a");
        const currentIndex = Array.from(links).findIndex(
          (link) => link === document.activeElement
        );

        switch (e.key) {
          case "Escape":
            closeDropdown();
            button.focus();
            break;
          case "ArrowDown":
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % links.length;
            links[nextIndex].focus();
            break;
          case "ArrowUp":
            e.preventDefault();
            const prevIndex =
              currentIndex <= 0 ? links.length - 1 : currentIndex - 1;
            links[prevIndex].focus();
            break;
          case "Home":
            e.preventDefault();
            links[0].focus();
            break;
          case "End":
            e.preventDefault();
            links[links.length - 1].focus();
            break;
        }
      });

      // Detectar cambio de tamaño de ventana
      window.addEventListener("resize", () => {
        const wasDesktop = isDesktop;
        isDesktop = window.innerWidth >= 768;

        // Si cambió de móvil a desktop o viceversa, limpiar estado
        if (wasDesktop !== isDesktop) {
          closeDropdown();
          isHovering = false;
          clearTimeout(hoverTimeout);
        }
      });
    }
  });
}

// Animaciones de scroll
function initializeAnimations() {
  // Intersection Observer para animaciones
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Observar elementos que queremos animar
  const animateElements = document.querySelectorAll(".animate-on-scroll");
  animateElements.forEach((el) => observer.observe(el));
}

// Funcionalidad de formularios
function initializeForms() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

// Manejar envío de formulario
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  // Mostrar estado de carga
  submitButton.disabled = true;
  submitButton.innerHTML = '<div class="spinner"></div> Enviando...';

  try {
    const response = await fetch("php/contact-handler.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      showNotification("Mensaje enviado correctamente!", "success");
      form.reset();
    } else {
      showNotification(result.message || "Error al enviar el mensaje", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    showNotification("Error al enviar el mensaje. Intenta de nuevo.", "error");
  } finally {
    // Restaurar botón
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

// Sistema de notificaciones
function showNotification(message, type = "info") {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 max-w-sm transform transition-all duration-300 translate-x-full`;

  // Estilos según el tipo
  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  notification.className += ` ${styles[type]}`;
  notification.textContent = message;

  // Agregar al DOM
  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Remover después de 5 segundos
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Utilidades
function smoothScrollTo(element) {
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Manejar enlaces de hash
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      smoothScrollTo(target);
    }
  }
});

// Lazy loading para imágenes
if ("IntersectionObserver" in window) {
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

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
