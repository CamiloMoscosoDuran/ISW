from flask import Flask, render_template, request, redirect, url_for, flash
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# --- CARGAR VARIABLES DE ENTORNO ---
load_dotenv()

# --- CONFIGURACIÓN DE LA BASE DE DATOS ---
DB_HOST = os.getenv('DB_HOST', 'isw.c0u8dgzrembt.us-east-1.rds.amazonaws.com')
DB_USER = os.getenv('DB_USER', 'admin')
DB_PASS = os.getenv('DB_PASS', 'CamiloTech')
DB_NAME = os.getenv('DB_NAME', 'eads_db')
DB_PORT = int(os.getenv('DB_PORT', 3306))

# --- APLICACIÓN FLASK ---
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'mi_clave_secreta')

# --- FUNCIÓN DE CONEXIÓN A RDS ---
def get_db_connection():
    """
    Establece conexión con la base de datos RDS MySQL.
    Retorna la conexión o None si hay error.
    """
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS,
            database=DB_NAME,
            port=DB_PORT,
            connection_timeout=10
        )
        return conn
    except Error as err:
        print(f"Error de conexión a BD: {err}")
        return None

# Ruta principal con formulario de captura premium
@app.route('/', methods=['GET', 'POST'])
def index():
    """
    Ruta principal que muestra el formulario y procesa el registro de prospectos premium.
    """
    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        email = request.form.get('email', '').strip()
        telefono = request.form.get('telefono', '').strip()
        interes = request.form.get('interes', '').strip()

        # Validaciones para prospectos premium
        if not nombre or not email:
            flash("El nombre y email son requeridos para capturar el prospecto", "error")
            return redirect(url_for('index'))

        try:
            conn = get_db_connection()
            if conn is None:
                flash("Error: Sistema temporalmente no disponible", "error")
                return redirect(url_for('index'))
            
            cursor = conn.cursor(buffered=True)
            sql = "INSERT INTO leads (nombre, email, telefono, interes) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (nombre, email, telefono, interes))
            conn.commit()
            cursor.close()
            conn.close()
            flash("¡Prospecto capturado exitosamente! Nos contactaremos pronto.", "success")
            return redirect(url_for('index'))
        except mysql.connector.errors.IntegrityError:
            flash("Este email ya está registrado en nuestro sistema premium", "error")
        except Exception as e:
            flash(f"Error al procesar el prospecto: {str(e)}", "error")

    return render_template('index.html')


# Ruta para dashboard de prospectos premium
@app.route('/leads', methods=['GET'])
def listar_leads():
    """
    Muestra el dashboard ejecutivo con todos los prospectos premium registrados.
    """
    try:
        conn = get_db_connection()
        if conn is None:
            flash("Error: Sistema temporalmente no disponible", "error")
            return redirect(url_for('index'))
        
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM leads ORDER BY fecha_registro DESC")
        leads = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return render_template('leads.html', leads=leads)
    except Exception as e:
        flash(f"Error al cargar el dashboard: {str(e)}", "error")
        return redirect(url_for('index'))


# Ruta para eliminar un prospecto premium
@app.route('/delete/<int:lead_id>', methods=['POST'])
def eliminar_lead(lead_id):
    """
    Elimina un prospecto específico del sistema premium.
    """
    try:
        conn = get_db_connection()
        if conn is None:
            flash("Error: Sistema temporalmente no disponible", "error")
            return redirect(url_for('listar_leads'))
        
        cursor = conn.cursor(buffered=True)
        cursor.execute("DELETE FROM leads WHERE id = %s", (lead_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        flash("Prospecto removido exitosamente del sistema", "success")
    except Exception as e:
        flash(f"Error al eliminar el prospecto: {str(e)}", "error")
    
    return redirect(url_for('listar_leads'))

# --- MANEJO DE ERRORES PREMIUM ---
@app.errorhandler(404)
def no_encontrado(error):
    """Maneja errores 404 con estilo premium"""
    flash("Página no disponible en ProspectHub", "error")
    return redirect(url_for('index'))

@app.errorhandler(500)
def error_servidor(error):
    """Maneja errores 500 con mensaje profesional"""
    flash("Sistema temporalmente no disponible. Intente nuevamente.", "error")
    return redirect(url_for('index'))

# --- EJECUTAR PROSPECTHUB ELITE ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
