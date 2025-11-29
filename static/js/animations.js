// ============================================
// ANIMACIONES DOM - ContactHub Pro
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
    
    // Efectos especiales ContactHub Pro
    efectosEspeciales();
});

// ============================================
// 1. ANIMACIÓN DE ELEMENTOS AL CARGAR
// ============================================
function animarElementosAlCargar() {
    const elementos = document.querySelectorAll('.bg-white, .bg-gradient-to-r, .max-w-lg, .max-w-7xl');
    
    elementos.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.animation = `fadeInUp 0.8s ease forwards`;
        elemento.style.animationDelay = `${index * 0.15}s`;
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
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 20px rgba(124, 58, 237, 0.3)';
            this.style.transition = 'all 0.3s ease';
            
            // Efecto brillante
            this.classList.add('shimmer-effect');
        });
        
        // Remover animación al desenfocar
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.classList.remove('shimmer-effect');
        });
        
        // Validación en tiempo real
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#7c3aed';
                this.style.background = 'linear-gradient(to right, white, #f3f4f6)';
            } else {
                this.style.borderColor = '#d1d5db';
                this.style.background = 'white';
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
        fila.style.animationDelay = `${index * 0.1}s`;
        
        // Hover effect mejorado
        fila.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        fila.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// ============================================
// 4. ANIMACIÓN DE MENSAJES FLASH
// ============================================
function animarMensajesFlash() {
    const mensajes = document.querySelectorAll('.mb-6');
    
    mensajes.forEach(mensaje => {
        if (mensaje.textContent.trim() !== '') {
            mensaje.style.animation = 'slideDownFade 0.5s ease forwards';
            
            // Auto-hide después de 5 segundos
            setTimeout(() => {
                mensaje.style.animation = 'slideUpFade 0.5s ease forwards';
                setTimeout(() => mensaje.remove(), 500);
            }, 5000);
        }
    });
}

// ============================================
// 5. ANIMACIÓN DE BOTONES
// ============================================
function animarBotones() {
    const botones = document.querySelectorAll('button, .bg-gradient-to-r');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            // Efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// 6. EFECTOS ESPECIALES CONTACTHUB PRO
// ============================================
function efectosEspeciales() {
    // Efecto de gema brillante
    const gemas = document.querySelectorAll('.fa-gem');
    gemas.forEach(gema => {
        gema.classList.add('gem-shine');
        
        setInterval(() => {
            gema.style.animation = 'none';
            setTimeout(() => gema.style.animation = 'gemShine 2s ease-in-out infinite', 100);
        }, 8000);
    });
    
    // Efecto parallax en partículas
    window.addEventListener('mousemove', function(e) {
        const particulas = document.querySelectorAll('.absolute.w-72, .absolute.w-96');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        particulas.forEach((particula, index) => {
            const speed = (index + 1) * 0.5;
            const moveX = (x - 0.5) * speed * 50;
            const moveY = (y - 0.5) * speed * 50;
            
            particula.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Contador animado en estadísticas
    const contadores = document.querySelectorAll('.text-3xl.font-bold');
    contadores.forEach(contador => {
        const valor = parseInt(contador.textContent) || 0;
        animarContador(contador, 0, valor, 2000);
    });
    
    // Efecto de escritura automática en títulos
    const titulos = document.querySelectorAll('h1');
    titulos.forEach(titulo => {
        if (titulo.textContent.includes('ContactHub Pro')) {
            efectoEscritura(titulo, 'ContactHub Pro', 100);
        }
    });
}

// ============================================
// 7. FUNCIONES AUXILIARES
// ============================================

// Animación de contador
function animarContador(elemento, inicio, fin, duracion) {
    const incremento = (fin - inicio) / (duracion / 16);
    let actual = inicio;
    
    const timer = setInterval(() => {
        actual += incremento;
        if (actual >= fin) {
            elemento.textContent = fin;
            clearInterval(timer);
        } else {
            elemento.textContent = Math.floor(actual);
        }
    }, 16);
}

// Efecto de escritura
function efectoEscritura(elemento, texto, velocidad) {
    let i = 0;
    elemento.textContent = '';
    
    const escribir = () => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
            setTimeout(escribir, velocidad);
        }
    };
    
    escribir();
}

// ============================================
// 8. ANIMACIONES CSS ADICIONALES
// ============================================

// Agregar estilos de animación dinámicamente
const estilosAnimacion = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideUpFade {
        to {
            transform: translateY(-20px);
            opacity: 0;
        }
    }
    
    .shine {
        background: linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%);
        background-size: 200% 200%;
        animation: shine 2s infinite;
    }
    
    @keyframes shine {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = estilosAnimacion;
document.head.appendChild(styleSheet);

// ============================================
// 9. EVENTOS DE INTERACTIVIDAD
// ============================================

// Smooth scroll para enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Feedback háptico en dispositivos móviles
if ('vibrate' in navigator) {
    document.querySelectorAll('button').forEach(boton => {
        boton.addEventListener('click', () => {
            navigator.vibrate(50);
        });
    });
}