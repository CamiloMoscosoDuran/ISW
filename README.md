# ProspectHub Elite - Sistema de Gestión Premium de Oportunidades

![Version](https://img.shields.io/badge/version-2.0.0-purple.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-gold.svg)
![Flask](https://img.shields.io/badge/flask-3.0.0-purple.svg)
![License](https://img.shields.io/badge/license-Premium-gold.svg)

## 💎 Descripción

**ProspectHub Elite** es una plataforma de gestión avanzada para capturar y administrar oportunidades de negocio de alto valor. Con un diseño premium púrpura/dorado y funcionalidades empresariales, esta aplicación está diseñada para profesionales que buscan maximizar sus conversiones de prospectos.

## 🚀 Características Elite

- ✨ **Captura Premium**: Formulario elegante optimizado para conversión
- 💎 **Dashboard Ejecutivo**: Interfaz de control con métricas en tiempo real
- 🏆 **Gestión Avanzada**: CRUD completo con categorización inteligente
- ☁️ **Infraestructura en Nube**: Base de datos RDS MySQL en AWS
- 📱 **Diseño Responsivo**: Experiencia perfecta en todos los dispositivos
- 🛡️ **Seguridad Empresarial**: Protecciones avanzadas y validaciones
- 📊 **Analytics Integrados**: Estadísticas de rendimiento por categoría
- 🎨 **Tema Premium**: Diseño moderno con animaciones fluidas

## 🛠️ Stack Tecnológico Premium

### Backend Elite
- **Python 3.8+** - Motor de aplicación
- **Flask 3.0.0** - Framework web premium
- **MySQL Connector** - Conectividad empresarial
- **Gunicorn** - Servidor de producción optimizado

### Frontend Premium
- **HTML5** - Estructura semántica avanzada
- **Tailwind CSS** - Framework de diseño moderno
- **CSS Animations** - Efectos premium personalizados
- **Font Awesome Pro** - Iconografía profesional

### Infraestructura Cloud
- **AWS EC2** - Instancias escalables (Ubuntu 22.04 LTS)
- **AWS RDS** - Base de datos MySQL gestionada
- **AWS EIP** - Dirección IP dedicada
- **AWS CloudFront** - CDN global (opcional)

## 📚 Estructura Premium del Proyecto

```
prospect-hub-elite/
├── app.py                      # Aplicación Flask principal
├── requirements.txt            # Dependencias del sistema
├── database.sql               # Esquema de base de datos
├── .env.example              # Plantilla de configuración
├── MANUAL_DESPLIEGUE.md      # Guía de implementación
├── README.md                 # Documentación principal
├── templates/
│   ├── index.html            # Página de captura premium
│   └── leads.html            # Dashboard ejecutivo
├── static/
│   ├── css/
│   │   └── animations.css    # Animaciones personalizadas
│   ├── js/                   # Scripts interactivos
│   └── img/                  # Assets visuales
└── venv/                     # Entorno virtual (local)
```

## ⚙️ Instalación del Entorno Premium

### Requisitos del Sistema

```bash
- Python 3.8+
- pip (gestor de paquetes)
- git (control de versiones)
- MySQL 8.0+ (desarrollo local)
```

### Implementación Rápida

1. **Clonar repositorio premium**
```bash
git clone https://github.com/TU-USUARIO/prospect-hub-elite.git
cd prospect-hub-elite
```

2. **Configurar entorno virtual**
```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno**
```bash
copy .env.example .env
# Editar .env con tus valores
```

5. **Ejecutar aplicación**
```bash
python app.py
```

6. **Acceder**
```
http://localhost:5000
```

## 🌐 Despliegue en AWS

### Configuración Rápida (EC2 + RDS)

**Ver documento completo**: `MANUAL_DESPLIEGUE.md`

Resumen:
1. Crear instancia EC2 (Ubuntu 22.04 LTS, t2.micro)
2. Crear RDS MySQL (db.t2.micro)
3. Clonar repositorio en EC2
4. Configurar variables de entorno
5. Ejecutar con Gunicorn
6. Asignar IP Elástica

### URL de Producción

```
http://[IP_ELASTICA]
```

## 📊 Base de Datos

### Tabla de Leads

```sql
CREATE TABLE leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    interes VARCHAR(50) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_fecha (fecha_registro)
);
```

### Operaciones CRUD

Ver `database.sql` para ejemplos completos de:
- **CREATE**: Insertar nuevos leads
- **READ**: Consultar leads
- **UPDATE**: Actualizar información
- **DELETE**: Eliminar leads

## 🎨 Diseño Visual

### Paleta de Colores

| Elemento | Color | Código |
|----------|-------|--------|
| Primario | Azul | #2563EB |
| Secundario | Gris Oscuro | #1E293B |
| Éxito | Verde | #10B981 |
| Error | Rojo | #EF4444 |
| Fondo | Blanco | #FFFFFF |

### Páginas

1. **Página de Inicio** (`/`)
   - Formulario de registro
   - Validaciones en tiempo real
   - Botón para ver todos los leads

2. **Gestión de Leads** (`/leads`)
   - Tabla responsiva
   - Estadísticas por tipo de servicio
   - Opción de eliminar leads

## 🔒 Seguridad

- ✅ Variables de entorno para credenciales
- ✅ Validación de entrada
- ✅ Protección contra SQL Injection
- ✅ CSRF Protection
- ✅ Manejo de excepciones robusto

## 📝 Archivos Importantes

### `database.sql`
Script SQL completo con:
- Creación de base de datos
- Definición de tabla
- Ejemplos de CRUD
- Consultas útiles

### `MANUAL_DESPLIEGUE.md`
Guía paso a paso para:
- Configuración de AWS
- Despliegue en EC2
- Configuración de RDS
- Mantenimiento

### `.env.example`
Plantilla de variables de entorno. **NUNCA** subir `.env` a GitHub.

## 🚀 Uso de la Aplicación

### Registrar un Lead

1. Acceder a la página principal
2. Completar formulario:
   - Nombre Completo (requerido)
   - Correo Electrónico (requerido, único)
   - Teléfono (opcional)
   - Interés/Servicio (requerido)
3. Hacer clic en "Enviar Registro"
4. Confirmación de éxito

### Ver Leads

1. Hacer clic en "Ver Todos los Leads"
2. Visualizar tabla con estadísticas
3. Opción de eliminar leads

## 🐛 Resolución de Problemas

### Error: No se puede conectar a la base de datos
- Verificar credenciales en `.env`
- Confirmar que RDS está activo
- Validar Security Group de RDS

### Error: Puerto 5000 ya en uso
```bash
lsof -i :5000  # Ver proceso
kill -9 PID    # Matar proceso
```

### Error: Módulo no encontrado
```bash
pip install -r requirements.txt
```

## 📞 Soporte

Para reportar bugs o sugerencias:
1. Crear un issue en GitHub
2. Contactar al equipo de desarrollo

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Desarrollado por: **Luis Torres Benavente**

---

## 📚 Documentación Adicional

- [Manual Completo de Despliegue](MANUAL_DESPLIEGUE.md)
- [Script SQL](database.sql)
- [Variables de Entorno](.env.example)

---

**Última actualización**: 29 de noviembre de 2025
**Versión**: 1.0.0
**Estado**: Production Ready ✅

```
⭐ Si te resulta útil, por favor dale una estrella al repositorio
```
