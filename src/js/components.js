/**
 * Component Loader Utility
 * Loads reusable components (navbar, footer) dynamically
 */

class ComponentLoader {
  constructor() {
    this.components = new Map();
    this.loadedComponents = new Set();
  }

  /**
   * Load a component from a file and insert it into the specified element
   * @param {string} componentName - Name of the component (navbar, footer)
   * @param {string} targetSelector - CSS selector for the target element
   * @param {Object} options - Additional options
   */
  async loadComponent(componentName, targetSelector, options = {}) {
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
      console.error(`Target element not found: ${targetSelector}`);
      return;
    }

    // Check if component is already loaded
    if (this.loadedComponents.has(componentName)) {
      console.log(`Component ${componentName} already loaded`);
      return;
    }

    try {
      // Determine the correct path based on current page location
      const currentPath = window.location.pathname;
      const isInPages = currentPath.includes("/pages/");
      const basePath = isInPages ? "../" : "./";

      const componentPath = `${basePath}components/${componentName}.html`;

      const response = await fetch(componentPath);

      if (!response.ok) {
        throw new Error(
          `Failed to load component: ${response.status} ${response.statusText}`
        );
      }

      let html = await response.text();

      // Adjust paths in the component HTML based on current location
      html = this.adjustPaths(html, isInPages);

      // Insert the component HTML
      targetElement.innerHTML = html;

      // Mark as loaded
      this.loadedComponents.add(componentName);

      // Store component reference
      this.components.set(componentName, {
        element: targetElement,
        html: html,
        options: options,
      });

      // Initialize component-specific functionality
      this.initializeComponent(componentName);

      console.log(`Component ${componentName} loaded successfully`);
    } catch (error) {
      console.error(`Error loading component ${componentName}:`, error);
      targetElement.innerHTML = `<div class="text-red-500 p-4">Error loading ${componentName} component</div>`;
    }
  }

  /**
   * Adjust paths in component HTML based on current page location
   * @param {string} html - The component HTML
   * @param {boolean} isInPages - Whether we're in the pages directory
   * @returns {string} - Adjusted HTML
   */
  adjustPaths(html, isInPages) {
    if (isInPages) {
      // If we're in pages directory, adjust paths to go up one level
      html = html.replace(/href="pages\//g, 'href="../pages/');
      html = html.replace(/href="index\.html"/g, 'href="../index.html"');
      html = html.replace(/href="\.\/components\//g, 'href="../components/');
      html = html.replace(/href="\.\/js\//g, 'href="../js/');
      html = html.replace(/href="\.\/styles\//g, 'href="../styles/');
    } else {
      // If we're in root directory, ensure paths are correct
      html = html.replace(/href="\.\.\/pages\//g, 'href="pages/');
      html = html.replace(/href="\.\.\/index\.html"/g, 'href="index.html"');
      html = html.replace(/href="\.\.\/components\//g, 'href="./components/');
      html = html.replace(/href="\.\.\/js\//g, 'href="./js/');
      html = html.replace(/href="\.\.\/styles\//g, 'href="./styles/');
    }

    return html;
  }

  /**
   * Initialize component-specific functionality
   * @param {string} componentName - Name of the component
   */
  initializeComponent(componentName) {
    switch (componentName) {
      case "navbar":
        this.initializeNavbar();
        break;
      case "footer":
        this.initializeFooter();
        break;
      default:
        console.log(
          `No specific initialization for component: ${componentName}`
        );
    }
  }

  /**
   * Initialize navbar functionality
   */
  initializeNavbar() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Dropdown functionality
    this.initializeDropdowns();

    // Update active navigation link
    this.updateActiveNavLink();
  }

  /**
   * Initialize dropdown functionality
   */
  initializeDropdowns() {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown, index) => {
      const button = dropdown.querySelector("button");
      const content = dropdown.querySelector(".dropdown-content");

      if (button && content) {
        // Set item indices for staggered animations
        const items = content.querySelectorAll("a");
        items.forEach((item, itemIndex) => {
          item.style.setProperty("--item-index", itemIndex);
        });

        // Click to toggle
        button.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          // Close other dropdowns
          dropdowns.forEach((otherDropdown, otherIndex) => {
            if (otherIndex !== index) {
              const otherButton = otherDropdown.querySelector("button");
              const otherContent =
                otherDropdown.querySelector(".dropdown-content");
              if (otherButton && otherContent) {
                otherContent.classList.remove("show");
                otherButton.setAttribute("aria-expanded", "false");
              }
            }
          });

          // Toggle current dropdown
          const isExpanded = button.getAttribute("aria-expanded") === "true";
          content.classList.toggle("show", !isExpanded);
          button.setAttribute("aria-expanded", !isExpanded);
        });

        // Keyboard navigation
        button.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            button.click();
          }
        });
      }
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdowns.forEach((dropdown) => {
          const button = dropdown.querySelector("button");
          const content = dropdown.querySelector(".dropdown-content");
          if (button && content) {
            content.classList.remove("show");
            button.setAttribute("aria-expanded", "false");
          }
        });
      }
    });

    // Close dropdowns on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        dropdowns.forEach((dropdown) => {
          const button = dropdown.querySelector("button");
          const content = dropdown.querySelector(".dropdown-content");
          if (button && content) {
            content.classList.remove("show");
            button.setAttribute("aria-expanded", "false");
          }
        });
      }
    });
  }

  /**
   * Update active navigation link based on current page
   */
  updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        // Remove any existing active classes
        link.classList.remove("text-blue-600", "font-semibold");

        // Check if this link matches the current page
        if (
          currentPath.endsWith(href) ||
          (currentPath === "/" && href === "index.html") ||
          currentPath.includes(href.replace(".html", ""))
        ) {
          link.classList.add("text-blue-600", "font-semibold");
        }
      }
    });
  }

  /**
   * Initialize footer functionality
   */
  initializeFooter() {
    // Add current year to copyright
    const copyrightElement = document.querySelector("footer .border-t p");
    if (copyrightElement) {
      const currentYear = new Date().getFullYear();
      copyrightElement.innerHTML = copyrightElement.innerHTML.replace(
        "2025",
        currentYear
      );
    }
  }

  /**
   * Load both navbar and footer components
   * @param {Object} options - Options for component loading
   */
  async loadLayout(options = {}) {
    const navbarOptions = options.navbar || {};
    const footerOptions = options.footer || {};

    await Promise.all([
      this.loadComponent("navbar", "#navbar-container", navbarOptions),
      this.loadComponent("footer", "#footer-container", footerOptions),
    ]);
  }

  /**
   * Reload a specific component
   * @param {string} componentName - Name of the component to reload
   */
  async reloadComponent(componentName) {
    this.loadedComponents.delete(componentName);
    this.components.delete(componentName);

    const targetSelector =
      componentName === "navbar" ? "#navbar-container" : "#footer-container";
    await this.loadComponent(componentName, targetSelector);
  }

  /**
   * Get component information
   * @param {string} componentName - Name of the component
   * @returns {Object|null} Component information
   */
  getComponent(componentName) {
    return this.components.get(componentName) || null;
  }

  /**
   * Check if a component is loaded
   * @param {string} componentName - Name of the component
   * @returns {boolean} True if component is loaded
   */
  isComponentLoaded(componentName) {
    return this.loadedComponents.has(componentName);
  }
}

// Create global instance
window.ComponentLoader = new ComponentLoader();

// Auto-load components when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Load navbar if container exists
  if (document.getElementById("navbar-container")) {
    window.ComponentLoader.loadComponent("navbar", "#navbar-container");
  }

  // Load footer if container exists
  if (document.getElementById("footer-container")) {
    window.ComponentLoader.loadComponent("footer", "#footer-container");
  }
});

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ComponentLoader;
}
