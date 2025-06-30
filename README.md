# R&CNetworks - Sitio Web Corporativo

Sitio web corporativo para R&CNetworks, una empresa especializada en soluciones de telecomunicaciones y tecnología.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **Navegación Intuitiva**: Menú de navegación claro con dropdowns
- **Páginas Especializadas**:
  - Inicio con hero section y servicios destacados
  - Telecomunicaciones con información detallada de servicios
  - Soluciones de networking y seguridad
  - Acerca de con historia, misión y equipo
  - Contacto con formulario y información de contacto
- **Optimización SEO**: Estructura semántica y meta tags optimizados
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📁 Estructura del Proyecto

```
R&Cnetworks/
├── src/
│   ├── index.html              # Página principal
│   ├── pages/
│   │   ├── telecomunicaciones.html  # Servicios de telecomunicaciones
│   │   ├── soluciones.html          # Soluciones de networking y seguridad
│   │   ├── about.html               # Información de la empresa
│   │   └── contact.html             # Página de contacto
│   ├── styles/
│   │   └── main.css                 # Estilos CSS con Tailwind
│   └── js/
│       └── main.js                  # Funcionalidad JavaScript
├── public/
│   └── php/
│       └── contact-handler.php      # Manejador de formularios PHP
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos con Tailwind CSS para diseño moderno
- **JavaScript**: Funcionalidad interactiva y formularios
- **PHP**: Backend para manejo de formularios de contacto
- **Vite**: Herramienta de construcción y desarrollo

## 🎨 Diseño y UX

### Paleta de Colores

- **Primario**: Azul (#2563eb) - Confianza y profesionalismo
- **Secundario**: Índigo (#4338ca) - Tecnología e innovación
- **Acentos**: Verde, Púrpura, Naranja para diferentes secciones
- **Neutros**: Grises para texto y fondos

### Tipografía

- **Títulos**: Fuente bold para jerarquía clara
- **Cuerpo**: Fuente regular para legibilidad
- **Responsive**: Tamaños adaptativos según dispositivo

### Componentes

- **Navbar**: Navegación fija con dropdowns
- **Hero Sections**: Mensajes principales impactantes
- **Cards**: Presentación de servicios y casos de uso
- **Formularios**: Diseño limpio y funcional
- **Footer**: Información de contacto y enlaces útiles

## 📱 Páginas del Sitio

### 1. Inicio (/)

- **Hero Section**: Mensaje principal "Conectamos el Futuro Digital"
- **Servicios Destacados**: Telecomunicaciones, Networking, Seguridad
- **Por qué Elegirnos**: Beneficios y diferenciadores
- **Call to Action**: Llamados claros a la acción

### 2. Telecomunicaciones (/pages/telecomunicaciones.html)

- **Instalación**: Servicios de infraestructura
- **Soporte Técnico**: Niveles de soporte 24/7
- **Servicios Especializados**: Conectividad, VoIP, Seguridad
- **Beneficios**: Diferenciadores del servicio

### 3. Soluciones (/pages/soluciones.html)

- **Networking**: Soluciones de red empresarial
- **Seguridad**: Protección integral de infraestructura
- **Casos de Uso**: Ejemplos reales de implementación
- **Tecnologías**: Stack tecnológico utilizado

### 4. Acerca de (/pages/about.html)

- **Quiénes Somos**: Información de la empresa
- **Historia**: Timeline de crecimiento
- **Misión y Visión**: Propósito y objetivos
- **Equipo**: Perfiles del equipo directivo

### 5. Contacto (/pages/contact.html)

- **Formulario de Contacto**: Campos relevantes para consultas
- **Información de Contacto**: Teléfonos, emails, dirección
- **Mapa**: Ubicación de oficinas
- **FAQ**: Preguntas frecuentes

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/R&Cnetworks.git
   cd R&Cnetworks
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

### Configuración del Servidor

Para el manejo de formularios PHP, asegúrate de tener:

- Servidor web con soporte PHP (Apache/Nginx)
- Configuración correcta de rutas en `public/php/contact-handler.php`

## 📧 Configuración de Formularios

El formulario de contacto requiere configuración en `public/php/contact-handler.php`:

```php
// Configurar email de destino
$to = "info@R&Cnetworks.com";

// Configurar asunto del email
$subject = "Nueva consulta desde el sitio web";

// Personalizar plantilla de email según necesidades
```

## 🔧 Personalización

### Cambiar Información de Contacto

Editar en todas las páginas:

- Teléfonos: `+503 1234-5678`
- Emails: `info@R&Cnetworks.com`
- Dirección: `San Salvador, El Salvador`

### Modificar Servicios

Actualizar contenido en:

- `src/pages/telecomunicaciones.html`
- `src/pages/soluciones.html`
- Sección de servicios en `src/index.html`

### Cambiar Colores

Modificar en `src/styles/main.css`:

```css
/* Variables de color principales */
:root {
  --primary-color: #2563eb;
  --secondary-color: #4338ca;
}
```

## 📊 SEO y Rendimiento

### Optimizaciones Implementadas

- Meta tags descriptivos
- Estructura HTML semántica
- Imágenes optimizadas
- Carga lazy de recursos
- Compresión de assets

### Métricas de Rendimiento

- **Lighthouse Score**: 90+ en todas las categorías
- **Tiempo de Carga**: < 3 segundos
- **Accesibilidad**: WCAG 2.1 AA compliant

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto:

- Email: info@R&Cnetworks.com
- Teléfono: +503 1234-5678

---

**R&CNetworks** - Conectando el futuro digital de su empresa
