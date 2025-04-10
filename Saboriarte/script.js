let cart = {};
let cartCount = 0;
let total = 0;

function addItem(name, price) {
    if (!cart[name]) {
        cart[name] = { quantity: 1, price: price };
    } else {
        cart[name].quantity++;
    }
    updateCart();
}

function removeItem(name, price) {
    if (cart[name]) {
        cart[name].quantity--;
        if (cart[name].quantity <= 0) {
            delete cart[name];
        }
    }
    updateCart();
}

function updateCart() {
    const cartItemsBody = document.getElementById('cartItemsBody');
    cartItemsBody.innerHTML = ''; // Limpiar el contenido anterior
    total = 0;
    cartCount = 0;

    for (const [name, item] of Object.entries(cart)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.quantity}</td><td>${name}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
        cartItemsBody.appendChild(row);
        
        total += item.price * item.quantity;
        cartCount += item.quantity;
    }

    // Actualizar el contenido del botón del carrito
    const cartButton = document.getElementById('cartButton');
    if (cartCount > 0) {
        cartButton.innerHTML = `Carrito (${cartCount}) - Total: $${total.toFixed(2)}`;
    } else {
        cartButton.innerHTML = `Carrito`;
    }

    document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
}

function toggleCart() {
    const cartDiv = document.getElementById('cart');
    const overlay = document.getElementById('overlay');
    
    if (cartDiv.style.display === 'none' || cartDiv.style.display === '') {
        cartDiv.style.display = 'block';
        overlay.style.display = 'block'; // Mostrar el overlay
    } else {
        cartDiv.style.display = 'none';
        overlay.style.display = 'none'; // Ocultar el overlay
    }
}

// Detectar clics fuera del carrito para cerrarlo
window.addEventListener('click', function(event) {
    const cartDiv = document.getElementById('cart');
    const overlay = document.getElementById('overlay');
    const cartButton = document.getElementById('cartButton');
    
    if (cartDiv.style.display === 'block' && !cartDiv.contains(event.target) && !cartButton.contains(event.target) && overlay.style.display === 'block') {
        cartDiv.style.display = 'none';
        overlay.style.display = 'none'; // Ocultar el overlay
    }
});

function checkout() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    if (!name || !address || cartCount === 0) {
        alert('Por favor completa todos los campos y añade al menos un producto.');
        return;
    }

    const message = `Nuevo pedido de ${name}.\nDirección: ${address}\nMétodo de pago: ${paymentMethod}\nDetalles:\n`;

    for (const [name, item] of Object.entries(cart)) {
        message += `${name} - Cantidad: ${item.quantity}\n`;
    }

    const phoneNumber = '3876328644'; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Resetear el carrito
    cart = {};
    total = 0;
    cartCount = 0;
    updateCart();
    toggleCart();
}

function toggleAlias() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const aliasContainer = document.getElementById('aliasContainer');
    aliasContainer.style.display = paymentMethod === 'transferencia' ? 'block' : 'none';
}

function copyAlias() {
    const aliasText = document.getElementById('alias').innerText;
    navigator.clipboard.writeText(aliasText).then(() => {
        alert('Alias copiado: ' + aliasText);
    });
}
