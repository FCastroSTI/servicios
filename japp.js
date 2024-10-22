function mostrarResumen() {
    const servicios = [
        { nombre: 'Pinta Caritas', cantidad: obtenerCantidad('pintaCaritas'), precio: 10000 },
        { nombre: 'Carritos Dinosaurios', cantidad: obtenerCantidad('carritosDino'), precio: 15000 },
        { nombre: 'Bicicletas', cantidad: obtenerCantidad('bicicletas'), precio: 15000 }
    ];

    const productos = [
        { nombre: 'Tazón', cantidad: obtenerCantidad('tazones'), precio: 5000 },
        { nombre: 'Polera', cantidad: obtenerCantidad('poleras'), precio: 8000 },
        { nombre: 'Gorra', cantidad: obtenerCantidad('gorras'), precio: 8000 },
        { nombre: 'Polerón', cantidad: obtenerCantidad('polerones'), precio: 12000 }
    ];

    let total = 0;
    let detalle = '';

    [...servicios, ...productos].forEach(item => {
        if (item.cantidad > 0) {
            detalle += `<p>${item.cantidad} x ${item.nombre} - $${(item.cantidad * item.precio).toLocaleString()}</p>`;
            total += item.cantidad * item.precio;
        }
    });

    if (detalle === '') {
        detalle = '<p>No has seleccionado ningún servicio o producto.</p>';
    }

    document.getElementById('detalleCompra').innerHTML = detalle;
    document.getElementById('totalCompra').textContent = `$${total.toLocaleString()}`;

    // Asegúrate de inicializar correctamente el modal de Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('resumenModal'));
    modal.show();
}

function obtenerCantidad(id) {
    const input = document.getElementById(id);
    return input ? parseInt(input.value) || 0 : 0;
}

function generarResumenPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    try {
        // Obtener los servicios seleccionados
        const pintaCaritas = document.getElementById("pintaCaritas").value;
        const totalCompra = calcularTotalCompra();

        let yPosition = 10;

        // Título del PDF
        doc.setFontSize(18);
        doc.text("Resumen de Compra", 10, yPosition);
        yPosition += 10;

        // Detalle de Servicios
        doc.setFontSize(12);
        doc.text(`Pinta Caritas: ${pintaCaritas} x $10,000`, 10, yPosition);
        yPosition += 10;

        // Total de la Compra
        doc.setFontSize(16);
        doc.text(`Total: $${totalCompra}`, 10, yPosition + 10);

        // Generar QR Code
        const qr = new QRious({
            value: `Compra total: $${totalCompra}`,
            size: 100
        });

        // Agregar QR al PDF
        const qrDataURL = qr.toDataURL();
        doc.addImage(qrDataURL, 'PNG', 150, 20, 50, 50);

        // Descargar PDF
        doc.save("resumen_compra.pdf");

    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el PDF.");
    }
}

function calcularTotalCompra() {
    const pintaCaritas = parseInt(document.getElementById("pintaCaritas").value) || 0;
    const total = pintaCaritas * 10000;
    return total;
}

