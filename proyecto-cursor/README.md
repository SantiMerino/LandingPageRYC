# R&CNetworks - Landing Page

Una landing page moderna y responsive para una empresa de soluciones digitales, construida con HTML, JavaScript puro, Tailwind CSS y PHP.

## 🚀 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- **Múltiples Páginas**: Home, Servicios, Nosotros, Contacto y Blog
- **Formulario de Contacto**: Con validación y procesamiento PHP
- **Animaciones**: Efectos suaves y transiciones modernas
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Cumple con estándares de accesibilidad web
- **Performance**: Carga rápida y optimizada

## 📁 Estructura del Proyecto

```
R&Cnetworks/
├── index.html              # Página principal
├── servicios.html          # Página de servicios
├── nosotros.html           # Página sobre nosotros
├── contacto.html           # Página de contacto
├── blog.html              # Página del blog
├── assets/
│   ├── css/
│   │   └── style.css      # Estilos personalizados
│   ├── js/
│   │   └── main.js        # JavaScript principal
│   ├── php/
│   │   └── contact.php    # Procesamiento del formulario
│   └── images/            # Imágenes del proyecto
└── README.md              # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y moderna
- **CSS3**: Estilos con Tailwind CSS y CSS personalizado
- **JavaScript**: Funcionalidades interactivas y validaciones
- **PHP**: Procesamiento del formulario de contacto
- **Tailwind CSS**: Framework CSS para diseño rápido

## 🚀 Instalación y Configuración

### Requisitos Previos

- Servidor web con soporte PHP (Apache, Nginx, etc.)
- PHP 7.4 o superior
- Navegador web moderno

### Pasos de Instalación

1. **Clonar o descargar el proyecto**

   ```bash
   git clone https://github.com/tu-usuario/R&Cnetworks.git
   cd R&Cnetworks
   ```

2. **Configurar el servidor web**

   - Coloca los archivos en el directorio raíz de tu servidor web
   - Asegúrate de que PHP esté habilitado

3. **Configurar el formulario de contacto**

   - Edita `assets/php/contact.php`
   - Cambia el email de destino en la línea 58:
     ```php
     $to = 'tu-email@dominio.com';
     ```

4. **Configurar base de datos (opcional)**
   - Si quieres guardar los contactos en base de datos, descomenta la línea 95 en `contact.php`
   - Crea la tabla `contactos` en tu base de datos:
     ```sql
     CREATE TABLE contactos (
         id INT AUTO_INCREMENT PRIMARY KEY,
         nombre VARCHAR(100) NOT NULL,
         apellido VARCHAR(100) NOT NULL,
         email VARCHAR(255) NOT NULL,
         telefono VARCHAR(20),
         empresa VARCHAR(100),
         servicio VARCHAR(50),
         mensaje TEXT NOT NULL,
         fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

## 📧 Configuración del Formulario de Contacto

El formulario de contacto incluye:

- **Validación del lado del cliente**: JavaScript
- **Validación del lado del servidor**: PHP
- **Envío de emails**: Notificación al administrador y confirmación al usuario
- **Protección contra spam**: Validaciones básicas
- **Almacenamiento en BD**: Opcional

### Personalización del Email

Edita las variables en `assets/php/contact.php`:

```php
// Email de destino
$to = 'info@R&Cnetworks.com';

// Asunto del email
$subject = 'Nuevo mensaje de contacto - R&CNetworks';
```

## 🎨 Personalización

### Colores y Estilos

Los colores principales se pueden modificar en `assets/css/style.css`:

```css
/* Colores principales */
:root {
  --primary-color: #3b82f6; /* Azul */
  --secondary-color: #8b5cf6; /* Púrpura */
  --accent-color: #fbbf24; /* Amarillo */
}
```

### Contenido

- **Textos**: Edita directamente en los archivos HTML
- **Imágenes**: Reemplaza las imágenes en `assets/images/`
- **Información de contacto**: Actualiza en todas las páginas

## 📱 Responsive Design

El sitio está optimizado para:

- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Funcionalidades JavaScript

### Navegación

- Menú móvil responsive
- Scroll suave entre secciones
- Navbar con efecto de scroll

### Formularios

- Validación en tiempo real
- Mensajes de error/éxito
- Loader durante el envío

### Animaciones

- Animaciones al hacer scroll
- Efectos hover
- Transiciones suaves

## 🚀 Optimización

### Performance

- CSS y JS minificados (en producción)
- Imágenes optimizadas
- Lazy loading de imágenes
- Caché de navegador

### SEO

- Meta tags optimizados
- Estructura semántica HTML5
- URLs amigables
- Sitemap (opcional)

## 🔒 Seguridad

- Validación de datos en cliente y servidor
- Sanitización de inputs
- Headers de seguridad
- Protección CSRF (implementar según necesidades)

## 📊 Analytics y Tracking

Para agregar Google Analytics:

1. Obtén tu ID de seguimiento
2. Agrega el código en el `<head>` de todas las páginas:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda:

- **Email**: info@R&Cnetworks.com
- **Documentación**: [Wiki del proyecto](link-al-wiki)
- **Issues**: [GitHub Issues](link-a-issues)

## 🗺️ Roadmap

- [ ] Integración con CRM
- [ ] Panel de administración
- [ ] Blog con CMS
- [ ] Chat en vivo
- [ ] Integración con redes sociales
- [ ] PWA (Progressive Web App)

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) por el framework CSS
- [Heroicons](https://heroicons.com/) por los iconos
- Comunidad de desarrolladores web

---

**Desarrollado con ❤️ por el equipo de R&CNetworks**
