# Configuración de Seguridad AWS
## Sistema de Gestión de Contactos (Leads Tracker)

---

## 🔐 Credenciales de Base de Datos

### RDS MySQL Endpoint
**Endpoint**: `servidor-web.csmouoomzfkk.us-east-1.rds.amazonaws.com`

**Port**: `3306`

### Credenciales (Cambiar después del despliegue)

```
Usuario: admin
Contraseña: [Consultar documento seguro en Classroom]
Base de Datos: eads_db
```

**⚠️ IMPORTANTE**: Cambiar la contraseña inmediatamente después de crear la base de datos.

---

## 🗝️ Archivos de Acceso EC2

### Key Pair para SSH

**Archivo**: `leads-tracker-key.pem` (Disponible en Classroom)

**Ubicación segura**: Descargar y guardar en:
- Windows: `C:\Users\[Usuario]\.ssh\`
- Linux/Mac: `~/.ssh/`

**Permisos**:
```bash
chmod 400 leads-tracker-key.pem
```

**Uso**:
```bash
ssh -i /ruta/a/leads-tracker-key.pem ubuntu@[IP_ELASTICA]
```

---

## 🌐 Security Groups AWS

### EC2 Security Group

| Protocolo | Puerto | Origen | Propósito |
|-----------|--------|--------|-----------|
| SSH | 22 | 0.0.0.0/0 | Acceso administrativo |
| HTTP | 80 | 0.0.0.0/0 | Acceso web |
| HTTPS | 443 | 0.0.0.0/0 | Acceso web seguro |
| Egress | ALL | 0.0.0.0/0 | Salida general |

### RDS Security Group

| Protocolo | Puerto | Origen | Propósito |
|-----------|--------|--------|-----------|
| MySQL | 3306 | EC2 SG | Acceso desde EC2 |
| MySQL | 3306 | IP Local | Acceso administrativo |

---

## 📝 Variables de Entorno

### Archivo `.env` (NO subir a GitHub)

```env
# Configuración de Base de Datos
DB_HOST=servidor-web.csmouoomzfkk.us-east-1.rds.amazonaws.com
DB_USER=admin
DB_PASS=tu_contraseña_segura_aqui
DB_NAME=eads_db
DB_PORT=3306

# Configuración Flask
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=clave_secreta_muy_larga_y_aleatoria_12345678

# Configuración Gunicorn (Producción)
WORKERS=4
BIND=0.0.0.0:5000
```

### Generador de SECRET_KEY

```python
import secrets
print(secrets.token_urlsafe(32))
```

---

## 🔒 Mejores Prácticas de Seguridad

### 1. Credenciales

- ✅ Usar variables de entorno para todas las credenciales
- ❌ NO hardcodear contraseñas en el código
- ✅ Cambiar contraseña por defecto inmediatamente
- ✅ Usar contraseñas de al menos 20 caracteres

### 2. Acceso AWS

- ✅ Usar IAM Roles en lugar de claves de acceso directas
- ✅ Mantener archivos `.pem` en ubicación segura (fuera de Git)
- ✅ Usar `chmod 400` en archivos `.pem`
- ❌ NO compartir archivos `.pem` por email o GitHub

### 3. Aplicación

- ✅ Validar toda entrada de usuario
- ✅ Usar prepared statements (SQLAlchemy)
- ✅ Habilitar HTTPS en producción
- ✅ Implementar rate limiting
- ✅ Mantener logs de acceso

### 4. Base de Datos

- ✅ Realizar backups automáticos (AWS RDS)
- ✅ Usar Multi-AZ para alta disponibilidad
- ✅ Cifrar datos en reposo
- ✅ Auditar accesos a la base de datos

---

## 📋 Checklist de Seguridad Preproducción

### Antes de Desplegar

- [ ] Cambiar contraseña de RDS
- [ ] Generar nueva SECRET_KEY
- [ ] Verificar Security Groups
- [ ] Habilitar HTTPS
- [ ] Configurar backups automáticos
- [ ] Implementar logging
- [ ] Validar todas las rutas
- [ ] Pruebas de seguridad básicas
- [ ] Documentar credenciales de forma segura

### Monitoreo Continuo

- [ ] Monitorear logs de EC2
- [ ] Revisar CloudWatch alarms
- [ ] Verificar uso de recursos
- [ ] Auditar cambios en Security Groups
- [ ] Revisar logs de acceso a RDS

---

## 🚨 Procedimiento en Caso de Incidente

### Compromiso de Contraseña

1. Cambiar inmediatamente contraseña RDS
   ```sql
   ALTER USER 'admin'@'%' IDENTIFIED BY 'nueva_contraseña';
   FLUSH PRIVILEGES;
   ```

2. Actualizar variable `.env` en EC2
3. Reiniciar aplicación
4. Revisar logs de acceso

### Pérdida de Archivo `.pem`

1. Terminar instancia EC2 actual
2. Crear nueva instancia con nuevo key pair
3. Reasignar IP Elástica
4. Restaurar aplicación desde backup

### Acceso No Autorizado

1. Revisar CloudTrail logs
2. Verificar Security Groups
3. Cambiar todas las credenciales
4. Auditar datos de leads
5. Contactar a AWS Support

---

## 📞 Contacto

Para incidentes de seguridad: [email de contacto]

---

**Documento confidencial - Custodiar adecuadamente**
**Última actualización**: 29 de noviembre de 2025
