//Set text
function setInnerText(elementId, value){
 const element = document.getElementById(elementId);
  element.innerText = value;
}

//set selected seat background color
function setBackgroundColor(element){
  element.classList.add('bg-lime-400');
  element.style.color = '#FFFFFF';
  element.style.pointerEvents = 'none';
}

// total price
function calculatePrice(elementId, value) {
  // calculate total price
  const totalPriceText = document.getElementById(elementId).innerText;
  let totalPrice = parseInt(totalPriceText);
  totalPrice = totalPrice + parseInt(value);
  setInnerText(elementId, totalPrice);
}