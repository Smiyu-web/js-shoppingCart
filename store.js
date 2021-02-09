if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

const cartItems = document.getElementsByClassName('cart-items')[0];

function ready() {
  const removeItemButtons = document.getElementsByClassName('btn-danger');
    for (let removeButton of removeItemButtons) {
    removeButton.addEventListener('click', removeCartItem)
  }

  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let input of quantityInputs) {
    input.addEventListener('change', quantityChanged)
  }

  const addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let cartButton of addToCartButtons) {
    cartButton.addEventListener('click', addToCart)
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for shopping with us!')
  while(cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal();
}

function removeCartItem(e) {
  const removeButtonClicked = e.target;
  removeButtonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(e) {
  const inputNum = e.target;
  if (isNaN(inputNum.value) || inputNum.value <= 0) {
    inputNum.value = 1;
  }
  updateCartTotal();
}

function addToCart(e) {
  const addButtonClicked = e.target;
  const shopItem = addButtonClicked.parentElement.parentElement;
  const title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  // to get what inside of cart
  const cartItemNames = document.getElementsByClassName('cart-item-title')
  for (let cartItemName of cartItemNames) {
    if(cartItemName.innerText === title) {
      alert('This item is alredy added to the cart.')
      return 
    }
  }

  cartRow.innerHTML = `
          <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>`

  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  const cartRows = cartItems.getElementsByClassName('cart-row');
  let total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    // get a price and remove a $ sign
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = `$ ${total}`;
}
