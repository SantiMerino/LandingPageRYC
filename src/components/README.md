# Reusable Components System

This directory contains reusable components for the R&CNetworks website that can be embedded across all pages.

## Components

### Navbar (`navbar.html`)

- **Location**: `src/components/navbar.html`
- **Container ID**: `#navbar-container`
- **Features**:
  - Responsive navigation with mobile menu
  - Dropdown menus for Telecomunicaciones and Soluciones
  - Automatic active link highlighting
  - Keyboard navigation support
  - Path adjustment for different page locations

### Footer (`footer.html`)

- **Location**: `src/components/footer.html`
- **Container ID**: `#footer-container`
- **Features**:
  - Company information and social links
  - Service links organized by category
  - Contact information
  - Automatic copyright year update

## Usage

### Basic Implementation

1. **Add component containers to your HTML**:

```html
<!-- Navbar Component Container -->
<div id="navbar-container"></div>

<!-- Your page content -->

<!-- Footer Component Container -->
<div id="footer-container"></div>
```

2. **Load the component system**:

```html
<!-- Load component system first -->
<script src="./js/components.js"></script>
<!-- Then load any page-specific scripts -->
<script src="./js/main.js"></script>
```

3. **Components will load automatically** when the DOM is ready.

### For Pages in Subdirectories

If your page is in a subdirectory (like `pages/`), adjust the script paths:

```html
<script src="../js/components.js"></script>
<script src="../js/main.js"></script>
```

The component system will automatically detect the page location and adjust internal paths accordingly.

### Manual Loading

You can also load components manually:

```javascript
// Load individual components
await window.ComponentLoader.loadComponent("navbar", "#navbar-container");
await window.ComponentLoader.loadComponent("footer", "#footer-container");

// Or load both at once
await window.ComponentLoader.loadLayout();
```

## Component System Features

### Automatic Path Adjustment

The system automatically adjusts paths based on the current page location:

- **Root pages**: Uses `./` relative paths
- **Subdirectory pages**: Uses `../` relative paths

### Component Management

- **Caching**: Components are cached after first load
- **Reloading**: Components can be reloaded if needed
- **Error Handling**: Graceful fallbacks if components fail to load

### JavaScript Integration

Components automatically initialize their JavaScript functionality:

- Mobile menu toggles
- Dropdown interactions
- Active link highlighting
- Keyboard navigation

## File Structure

```
src/
├── components/
│   ├── navbar.html          # Navbar component
│   ├── footer.html          # Footer component
│   └── README.md           # This documentation
├── js/
│   ├── components.js       # Component loader system
│   └── main.js            # Main site functionality
├── styles/
│   └── main.css           # Styles including component styles
└── templates/
    └── page-template.html  # Template for new pages
```

## Customization

### Adding New Components

1. Create your component HTML file in `src/components/`
2. Add initialization logic to `initializeComponent()` in `components.js`
3. Use the same loading pattern as existing components

### Modifying Existing Components

- **Navbar**: Edit `src/components/navbar.html`
- **Footer**: Edit `src/components/footer.html`
- **Styles**: Edit `src/styles/main.css` (component styles are included)

### Component Options

Components can accept options when loaded:

```javascript
await window.ComponentLoader.loadComponent("navbar", "#navbar-container", {
  // Custom options here
});
```

## Browser Support

The component system works in all modern browsers that support:

- ES6+ JavaScript
- Fetch API
- CSS Grid and Flexbox
- CSS Custom Properties

## Troubleshooting

### Common Issues

1. **Components not loading**: Check browser console for errors
2. **Wrong paths**: Ensure script paths are correct for your page location
3. **Styling issues**: Verify CSS file is loaded correctly

### Debug Mode

Enable debug logging by setting:

```javascript
window.ComponentLoader.debug = true;
```

## Performance

- Components are loaded asynchronously
- HTML is cached after first load
- Minimal JavaScript overhead
- Optimized for fast loading

## Accessibility

Components include:

- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure
