let cartItems = [];
let total = 0;

function addToCart(name, price) {
  // Find if item already in cart
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: name, price: price, quantity: 1 });
  }

  total += price;
  updateCartDisplay();

  // Show animation
  showCartMessage(`${name} added to cart!`);
}

function updateCartDisplay() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  let totalInCart = 0;

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    totalInCart += subtotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      ${item.name} x${item.quantity} - $${subtotal}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });

  document.getElementById('cart-total').textContent = totalInCart;
}

function removeFromCart(index) {
  const item = cartItems[index];
  total -= item.price * item.quantity;
  cartItems.splice(index, 1);
  updateCartDisplay();
}

function checkout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Save to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartTotal', total);

  // Redirect
  window.location.href = 'invoice.html';
}

function showCartMessage(message) {
  const msg = document.getElementById('cart-message');
  msg.textContent = message;
  msg.classList.add('show');

  setTimeout(() => {
    msg.classList.remove('show');
  }, 2000);
}
function filterProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const name = product.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      product.style.display = '';
    } else {
      product.style.display = 'none';
    }
  });
}
function goToThankYou() {
  // Validate fields first if needed
  const name = document.getElementById('customer-name').value.trim();
  const phone = document.getElementById('customer-phone').value.trim();
  const address = document.getElementById('customer-address').value.trim();

  if (!name || !phone || !address) {
    alert('Please fill in all customer details before continuing.');
    return;
  }

  // Optionally save details to sessionStorage or localStorage if needed
  sessionStorage.setItem('customerName', name);

  // Redirect to thank you page
  window.location.href = 'thankyou.html';
}