# Manual de Diseño y Despliegue
## Sistema de Gestión de Contactos (Leads Tracker)

---

## 📋 Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
3. [Diseño Visual](#diseño-visual)
4. [Requisitos Técnicos](#requisitos-técnicos)
5. [Instalación Local](#instalación-local)
6. [Configuración de AWS](#configuración-de-aws)
7. [Despliegue en EC2](#despliegue-en-ec2)
8. [Operaciones de Base de Datos](#operaciones-de-base-de-datos)
9. [Acceso y Uso](#acceso-y-uso)
10. [Mantenimiento](#mantenimiento)

---

## 🎯 Resumen Ejecutivo

**Leads Tracker** es una aplicación web profesional desarrollada en Python con Flask para automatizar el registro y seguimiento de clientes potenciales (leads). La aplicación está desplegada en la nube de Amazon Web Services (AWS) y utiliza un servidor web de aplicaciones (EC2), una base de datos gestionada (RDS MySQL) y un diseño responsivo con Tailwind CSS.

### Objetivos
- Capturar información de contactos potenciales de forma segura
- Almacenar datos en una base de datos relacional en la nube
- Proporcionar una interfaz intuitiva y profesional
- Permitir gestión completa de leads (CRUD)
- Asegurar disponibilidad y escalabilidad

---

## 🏗️ Arquitectura de la Aplicación

### Stack Tecnológico

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                │
│              HTML5 + Tailwind CSS                   │
└────────────────────┬────────────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────────────┐
│          AWS EC2 (Ubuntu/Debian)                     │
│  ┌──────────────────────────────────────────────┐   │
│  │     Flask Application Server                 │   │
│  │  • app.py (Python 3.8+)                      │   │
│  │  • Routes (GET, POST, DELETE)                │   │
│  │  • Templates (Jinja2)                        │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────┘
                     │ TCP/IP (Puerto 3306)
┌────────────────────▼────────────────────────────────┐
│       AWS RDS MySQL (Instancia gestionada)          │
│  ┌──────────────────────────────────────────────┐   │
│  │     Base de Datos: eads_db                   │   │
│  │     Tabla: leads                             │   │
│  │     • Información de contactos               │   │
│  │     • Timestamps automáticos                 │   │
│  │     • Índices optimizados                    │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

### Componentes Principales

1. **Frontend**: HTML5 + Tailwind CSS (Responsive Design)
2. **Backend**: Python Flask 3.0
3. **Base de Datos**: MySQL 8.0 en AWS RDS
4. **Servidor Web**: Python Flask (producción: Gunicorn)
5. **Hosting**: AWS EC2 (T2.micro)

---

## 🎨 Diseño Visual

### Paleta de Colores

| Color | Hexadecimal | Uso |
|-------|------------|-----|
| Azul Primario | #2563EB | Encabezados, botones |
| Azul Oscuro | #1E40AF | Fondos, acentos |
| Gris Oscuro | #1E293B | Fondo principal |
| Blanco | #FFFFFF | Texto, tarjetas |
| Verde | #10B981 | Éxito, confirmación |
| Rojo | #EF4444 | Errores, eliminación |

### Tipografía

- **Encabezados**: Fuentes sans-serif (Tailwind default)
- **Cuerpo**: Sans-serif, tamaño 14-16px
- **Peso**: Regular (400) y Bold (700)

### Componentes UI

#### 1. Página de Registro (/)
- Formulario centrado y responsivo
- Header con degradado azul
- Campos con validación HTML5
- Iconos de Font Awesome
- Mensajes de alerta contextuales

#### 2. Página de Listado (/leads)
- Tabla responsiva con scroll horizontal
- Estadísticas resumidas
- Colores por tipo de servicio
- Acciones (eliminar)
- Diseño mobile-first

### Responsividad

```
Tamaños soportados:
- Mobile: 320px - 480px
- Tablet: 481px - 768px
- Desktop: 769px+
```

---

## 🔧 Requisitos Técnicos

### Software Local

```
- Python 3.8+
- pip (Gestor de paquetes)
- git
- MySQL Client (opcional)
```

### Dependencias Python

```
Flask==3.0.0
mysql-connector-python==8.2.0
python-dotenv==1.0.0
Werkzeug==3.0.1
```

### Cuenta AWS con:

- Acceso a EC2
- Acceso a RDS
- Acceso a VPC y Security Groups
- Permisos para crear instancias

---

## 🚀 Instalación Local

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/LuisTorresBenavente/trabajo-de-juana-.git
cd trabajo-de-juana-
```

### Paso 2: Crear entorno virtual

```bash
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

### Paso 3: Instalar dependencias

```bash
pip install -r requirements.txt
```

### Paso 4: Configurar variables de entorno

Crear archivo `.env`:

```
DB_HOST=servidor-web.csmouoomzfkk.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASS=tu_contraseña
DB_NAME=eads_db
DB_PORT=3306
FLASK_ENV=development
SECRET_KEY=tu_clave_secreta
```

### Paso 5: Ejecutar aplicación

```bash
python app.py
```

Acceder a: `http://127.0.0.1:5000`

---

## ☁️ Configuración de AWS

### 1. Crear Instancia EC2

**Pasos:**

1. Ir a AWS Console → EC2
2. Launch Instance
3. Seleccionar: **Ubuntu 22.04 LTS** (t2.micro - Gratis)
4. Configurar Security Group:
   - Puerto 22 (SSH): 0.0.0.0/0
   - Puerto 80 (HTTP): 0.0.0.0/0
   - Puerto 443 (HTTPS): 0.0.0.0/0
5. Crear/usar Key Pair (PEM)
6. Launch

### 2. Crear RDS MySQL

**Pasos:**

1. Ir a AWS Console → RDS
2. Create Database
3. Opción: **MySQL 8.0.28**
4. Instancia: db.t2.micro
5. Database Name: `eads_db`
6. Master Username: `admin`
7. Password: Contraseña fuerte
8. VPC Security Group: Crear uno nuevo
9. Configurar inbound rules en el Security Group:
   - Port 3306 (MySQL)
   - Source: Security Group de EC2

### 3. IP Elástica (EIP)

1. EC2 Dashboard → Elastic IPs
2. Allocate Elastic IP
3. Associate con la instancia EC2

---

## 📦 Despliegue en EC2

### Paso 1: Conectar a la instancia

```bash
ssh -i ruta/a/key.pem ubuntu@IP_ELASTICA
```

### Paso 2: Actualizar sistema

```bash
sudo apt update
sudo apt upgrade -y
```

### Paso 3: Instalar dependencias

```bash
sudo apt install -y python3-pip python3-venv git
```

### Paso 4: Clonar repositorio

```bash
git clone https://github.com/LuisTorresBenavente/trabajo-de-juana-.git
cd trabajo-de-juana-
```

### Paso 5: Crear entorno virtual

```bash
python3 -m venv venv
source venv/bin/activate
```

### Paso 6: Instalar dependencias

```bash
pip install -r requirements.txt
pip install gunicorn
```

### Paso 7: Crear archivo .env

```bash
nano .env
```

Agregar:

```
DB_HOST=endpoint-rds.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASS=tu_contraseña
DB_NAME=eads_db
DB_PORT=3306
FLASK_ENV=production
SECRET_KEY=clave_secreta_fuerte
```

### Paso 8: Ejecutar con Gunicorn

```bash
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
```

### Paso 9: (Opcional) Configurar Systemd para ejecución permanente

```bash
sudo nano /etc/systemd/system/leads-tracker.service
```

Contenido:

```ini
[Unit]
Description=Leads Tracker Application
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/trabajo-de-juana-
Environment="PATH=/home/ubuntu/trabajo-de-juana-/venv/bin"
ExecStart=/home/ubuntu/trabajo-de-juana-/venv/bin/gunicorn --bind 0.0.0.0:5000 --workers 4 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Activar:

```bash
sudo systemctl daemon-reload
sudo systemctl start leads-tracker
sudo systemctl enable leads-tracker
```

---

## 📊 Operaciones de Base de Datos (CRUD)

Ver archivo `database.sql` para:

### CREATE
```sql
INSERT INTO leads (nombre, email, telefono, interes) 
VALUES ('Juan Pérez', 'juan@ejemplo.com', '+34 123 456 789', 'Consultoría');
```

### READ
```sql
SELECT * FROM leads;
SELECT * FROM leads WHERE interes = 'Consultoría';
SELECT COUNT(*) FROM leads;
```

### UPDATE
```sql
UPDATE leads SET nombre = 'Juan Carlos Pérez' 
WHERE email = 'juan@ejemplo.com';
```

### DELETE
```sql
DELETE FROM leads WHERE email = 'juan@ejemplo.com';
```

---

## 🌐 Acceso y Uso

### URL de Acceso

**Producción**: `http://IP_ELASTICA`

Ejemplo: `http://54.123.45.67`

### Funcionalidades

1. **Registro de Leads** (GET /)
   - Formulario de captura
   - Validaciones en tiempo real
   - Confirmación de éxito

2. **Listado de Leads** (GET /leads)
   - Tabla con todos los registros
   - Estadísticas por tipo
   - Eliminación de leads

3. **Eliminación** (POST /delete/<id>)
   - Confirmación de acción
   - Feedback visual

---

## 🔒 Seguridad

### Mejores Prácticas Implementadas

- Variables de entorno para credenciales
- Validación de entrada (HTML5 + Python)
- Protección contra SQL Injection (Prepared Statements)
- CSRF Protection (Flask)
- Mensajes de error genéricos
- Timeout de conexión

### Recomendaciones Adicionales

- Usar HTTPS con certificados SSL (Let's Encrypt)
- Implementar autenticación de usuarios
- Usar WAF (Web Application Firewall)
- Backup regular de base de datos
- Monitoring y logs

---

## 🛠️ Mantenimiento

### Logs

```bash
# Ver logs de la aplicación
sudo journalctl -u leads-tracker -f

# Ver logs de Gunicorn
tail -f gunicorn.log
```

### Backup de Base de Datos

```bash
mysqldump -h RDS_ENDPOINT -u admin -p eads_db > backup.sql
```

### Actualizar Aplicación

```bash
git pull
pip install -r requirements.txt
sudo systemctl restart leads-tracker
```

---

## 📞 Soporte y Contacto

Para preguntas o problemas, contactar al equipo de desarrollo.

---

**Última actualización**: 29 de noviembre de 2025
**Versión**: 1.0.0
**Estado**: Production Ready
