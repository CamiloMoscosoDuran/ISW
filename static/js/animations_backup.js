// ============================================
// ANIMACIONES DOM - Leads Tracker
// ============================================

// 1. ANIMACIONES DE CARGA
document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos al cargar
    animarElementosAlCargar();
    
    // Animar formularios
    animarFormulario();
    
    // Animar tabla
    animarTabla();
    
    // Animar mensajes flash
    animarMensajesFlash();
    
    // Animar botones
    animarBotones();
});

// ============================================
// 1. ANIMACIÓN DE ELEMENTOS AL CARGAR
// ============================================
function animarElementosAlCargar() {
    const elementos = document.querySelectorAll('.bg-white, .bg-gradient-to-r, .max-w-lg, .max-w-6xl');
    
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.animation = `fadeInUp 0.6s ease forwards`;
        elemento.style.animationDelay = `${index * 0.1}s`;
    });
}

// ============================================
// 2. ANIMACIÓN DE FORMULARIO
// ============================================
function animarFormulario() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Animar al enfocar
        input.addEventListener('focus', function() {
            this.style.animation = 'inputFocus 0.3s ease forwards';
            this.parentElement.style.animation = 'parentGlow 0.3s ease forwards';
        });
        
        // Remover animación al desenfocar
        input.addEventListener('blur', function() {
            this.style.animation = '';
            this.parentElement.style.animation = '';
        });
        
        // Animar cuando hay contenido
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.parentElement.classList.add('has-content');
            } else {
                this.parentElement.classList.remove('has-content');
            }
        });
    });
}

// ============================================
// 3. ANIMACIÓN DE TABLA
// ============================================
function animarTabla() {
    const filas = document.querySelectorAll('tbody tr');
    
    filas.forEach((fila, index) => {
        fila.style.opacity = '0';
        fila.style.transform = 'translateX(-20px)';
        fila.style.animation = `slideInLeft 0.5s ease forwards`;
        fila.style.animationDelay = `${index * 0.05}s`;
        
        // Hover en filas
        fila.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        fila.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = '';
        });
    });
}

// ============================================
// 4. ANIMACIÓN DE MENSAJES FLASH
// ============================================
function animarMensajesFlash() {
    const mensajes = document.querySelectorAll('.bg-green-50, .bg-red-50');
    
    mensajes.forEach((mensaje, index) => {
        mensaje.style.opacity = '0';
        mensaje.style.transform = 'translateY(-10px)';
        mensaje.style.animation = `slideDownFade 0.5s ease forwards`;
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            mensaje.style.animation = 'slideUpFade 0.5s ease forwards';
            setTimeout(() => {
                mensaje.style.display = 'none';
            }, 500);
        }, 5000);
    });
}

// ============================================
// 5. ANIMACIÓN DE BOTONES
// ============================================
function animarBotones() {
    const botones = document.querySelectorAll('button, a.bg-');
    
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonBounce 0.6s ease';
        });
        
        boton.addEventListener('click', function() {
            this.style.animation = 'buttonClick 0.4s ease';
        });
    });
}

// ============================================
// 6. ANIMACIÓN DE VALIDACIÓN DE FORMULARIO
// ============================================
function animarValidacion(inputElement) {
    if (!inputElement.validity.valid) {
        inputElement.style.animation = 'shake 0.5s ease';
        inputElement.classList.add('border-red-500');
        
        setTimeout(() => {
            inputElement.style.animation = '';
            inputElement.classList.remove('border-red-500');
        }, 500);
    }
}

// ============================================
// 7. ANIMACIÓN AL ENVIAR FORMULARIO
// ============================================
function animarEnvioFormulario(event) {
    const form = event.target;
    const boton = form.querySelector('button[type="submit"]');
    
    if (boton) {
        boton.style.animation = 'buttonSubmit 0.6s ease forwards';
        boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        boton.disabled = true;
    }
}

// ============================================
// 8. ANIMACIÓN AL ELIMINAR UN ELEMENTO
// ============================================
function animarEliminacion(elemento) {
    elemento.style.animation = 'slideOutLeft 0.5s ease forwards';
    
    setTimeout(() => {
        elemento.remove();
    }, 500);
}

// ============================================
// 9. ANIMACIÓN DE ESTADÍSTICAS
// ============================================
function animarEstadisticas() {
    const numeros = document.querySelectorAll('.text-3xl.font-bold');
    
    numeros.forEach(numero => {
        const valor = parseInt(numero.textContent);
        let contador = 0;
        
        const intervalo = setInterval(() => {
            contador += Math.ceil(valor / 30);
            
            if (contador >= valor) {
                numero.textContent = valor;
                clearInterval(intervalo);
            } else {
                numero.textContent = contador;
            }
        }, 30);
        
        numero.style.animation = 'popIn 0.5s ease';
    });
}

// Ejecutar animación de estadísticas cuando se carga la página de leads
if (window.location.pathname === '/leads') {
    window.addEventListener('load', animarEstadisticas);
}

// ============================================
// 10. ANIMACIÓN DE ONDAS (RIPPLE EFFECT)
// ============================================
function crearRippleEffect(event) {
    const boton = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = boton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    boton.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Agregar ripple effect a botones
document.querySelectorAll('button').forEach(boton => {
    boton.addEventListener('click', crearRippleEffect);
});

// ============================================
// ESTILOS DE ANIMACIÓN (Se agregan en CSS)
// ============================================
// Ver archivo: animations.css
