// Variables globales para el sistema de donaciones
let selectedMethod = '';

/**
 * Abre el modal de donaciones
 */
function openDonationModal() {
    document.getElementById('donationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de donaciones
 */
function closeDonationModal() {
    document.getElementById('donationModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    resetSelection();
}

/**
 * Selecciona un método de pago
 * @param {string} method - Método de pago seleccionado
 */
function selectMethod(method) {
    selectedMethod = method;
    
    // Remover selección previa
    const methodCards = document.querySelectorAll('.donation-method');
    methodCards.forEach(card => card.classList.remove('selected'));
    
    // Agregar selección actual
    event.target.closest('.donation-method').classList.add('selected');
}

/**
 * Procesa la donación y muestra las instrucciones correspondientes
 */
function processDonation() {
    if (!selectedMethod) {
        alert('Por favor selecciona un método de pago.');
        return;
    }
    
    let message = `¡Gracias por tu generosidad! 🙏\n\n`;
    message += `Método seleccionado: ${getMethodName(selectedMethod)}\n\n`;
    
    switch(selectedMethod) {
        case 'yape':
            message += `Para completar tu donación por Yape:\n`;
            message += `1. Abre tu app Yape\n`;
            message += `2. Escanea el QR o usa el número: 958-685-460\n`;
            message += `3. Ingresa el monto que desees donar\n`;
            message += `4. En el concepto escribe: "Donación Iglesia Shaddai"`;
            break;
        case 'plin':
            message += `Para completar tu donación por Plin:\n`;
            message += `1. Abre tu app Plin\n`;
            message += `2. Selecciona "Enviar dinero"\n`;
            message += `3. Usa el número: 958-685-460\n`;
            message += `4. Ingresa el monto que desees donar\n`;
            message += `5. En el concepto escribe: "Donación Iglesia Shaddai"`;
            break;
        case 'bcp':
            message += `Para completar tu donación por BCP:\n`;
            message += `1. Cuenta de Ahorros BCP: 123-45678901-2-34\n`;
            message += `2. A nombre de: Iglesia Bautista Shaddai\n`;
            message += `3. Ingresa el monto que desees donar\n`;
            message += `4. Concepto: "Donación"`;
            break;
        case 'interbank':
            message += `Para completar tu donación por Interbank:\n`;
            message += `1. Cuenta de Ahorros IBK: 987-65432109-8-76\n`;
            message += `2. A nombre de: Iglesia Bautista Shaddai\n`;
            message += `3. Ingresa el monto que desees donar\n`;
            message += `4. Concepto: "Donación"`;
            break;
        case 'bbva':
            message += `Para completar tu donación por BBVA:\n`;
            message += `1. Cuenta de Ahorros BBVA: 456-78912345-6-78\n`;
            message += `2. A nombre de: Iglesia Bautista Shaddai\n`;
            message += `3. Ingresa el monto que desees donar\n`;
            message += `4. Concepto: "Donación"`;
            break;
        case 'efectivo':
            message += `Para completar tu donación en efectivo:\n`;
            message += `1. Visita nuestra iglesia en los horarios de servicio\n`;
            message += `2. Puedes entregar tu donación directamente al pastor\n`;
            message += `3. O depositarla en las urnas de ofrenda\n`;
            message += `4. Horarios: Dom 10AM, Mié 7PM, Vie 7PM`;
            break;
    }
    
    message += `\n\n¡Que Dios bendiga tu generosidad! 💝`;
    
    alert(message);
    closeDonationModal();
}

/**
 * Obtiene el nombre legible del método de pago
 * @param {string} method - Código del método de pago
 * @returns {string} Nombre del método de pago
 */
function getMethodName(method) {
    const names = {
        'yape': 'Yape',
        'plin': 'Plin',
        'bcp': 'BCP',
        'interbank': 'Interbank',
        'bbva': 'BBVA',
        'efectivo': 'Efectivo'
    };
    return names[method] || method;
}

/**
 * Resetea todas las selecciones del modal de donaciones
 */
function resetSelection() {
    selectedMethod = '';
    
    // Limpiar selecciones visuales
    const methodCards = document.querySelectorAll('.donation-method');
    methodCards.forEach(card => card.classList.remove('selected'));
}

/**
 * Función para navegación suave a las secciones (opcional)
 * @param {string} sectionId - ID de la sección a la que navegar
 */
function smoothScrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        const modal = document.getElementById('donationModal');
        if (event.target === modal) {
            closeDonationModal();
        }
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modal = document.getElementById('donationModal');
            if (modal.style.display === 'block') {
                closeDonationModal();
            }
        }
    });

    // Agregar navegación suave a los enlaces del menú (opcional)
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollToSection(targetId);
        });
    });
});

/**
 * Muestra un mensaje de confirmación antes de procesar la donación
 * @returns {boolean} true si el usuario confirma, false en caso contrario
 */
function confirmDonation() {
    return confirm(`¿Estás seguro de que deseas proceder con la donación mediante ${getMethodName(selectedMethod)}?`);
}

/**
 * Valida que el método de pago esté seleccionado
 * @returns {Object} Objeto con validación y mensaje de error si existe
 */
function validateDonationData() {
    if (!selectedMethod) {
        return {
            isValid: false,
            message: 'Por favor selecciona un método de pago.'
        };
    }
    
    return {
        isValid: true,
        message: ''
    };
}
function processDonationImproved() {
    const validation = validateDonationData();
    
    if (!validation.isValid) {
        alert(validation.message);
        return;
    }
    
    if (confirmDonation()) {
        processDonation();
    }
}
