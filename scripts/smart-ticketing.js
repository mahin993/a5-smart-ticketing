function buyTickets(){
  const paribahanSection = document.getElementById('paribahan-section');
  paribahanSection.scrollIntoView();
}

const seats = document.getElementsByClassName('seat-no');
let count = 0;
let remainSeat = 40;

for (const seat of seats) {
  seat.addEventListener('click', function (event) {
    if (count < 4) { 
      count += 1;
      remainSeat -= 1;

      // seat count
      setInnerText('seat-count', count);

      // remain seat
      if (remainSeat >= 0) {
        setInnerText('remain-seat', remainSeat);
      }

      setBackgroundColor(event.currentTarget);
      const currentSeat = event.currentTarget.id;

      const selectedSeatContainer = document.getElementById('selected-seat-container');
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center gap-36 text-xl font-semibold';
      const p = document.createElement('p');
      p.innerText = currentSeat;
      const p2 = document.createElement('p');
      p2.innerText = 'Economy';

      setInnerText('seat-price', 550);
      const p3 = document.createElement('p');
      const p3Text = document.getElementById('seat-price').innerText;
      p3.innerText = p3Text;

      li.appendChild(p);
      li.appendChild(p2);
      li.appendChild(p3);
      selectedSeatContainer.appendChild(li);

      calculateTotalPrice('total-price', parseInt(p3Text));
      calculateGrandTotal('grand-total-price', parseInt(p3Text));

      applyCoupon();
      document.getElementById('phone-no').addEventListener('input', toggleNextButton);
     
    } else {
      alert('Can buy maximum 4 seats.');
    }
  });
}

// total price
function calculateTotalPrice(elementId, value) {
  // calculate total price
  const totalPriceText = document.getElementById(elementId).innerText;
  let totalPrice = parseInt(totalPriceText);
  totalPrice = totalPrice + parseInt(value);
  setInnerText(elementId, totalPrice);
}

// grand total
function calculateGrandTotal(elementId, value) {
  // calculate grand total price
  const grandTotalPriceText = document.getElementById(elementId).innerText;
  let grandTotalPrice = parseInt(grandTotalPriceText);
  grandTotalPrice += parseInt(value);
  setInnerText(elementId, grandTotalPrice);
}

// coupon apply
function applyCoupon() {
  const couponInput = document.getElementById('coupon-input');
  const applyButton = document.getElementById('apply-button');

  applyButton.addEventListener('click', function () {
    const couponValue = couponInput.value;

    const grandTotalPriceText = document.getElementById('grand-total-price').innerText;
    let grandTotalPrice = parseInt(grandTotalPriceText);

    // buying seat is greater than or equal to 4 and less than or equal to 4
    if (count >= 4 && count <= 4) {
      if (couponValue === 'NEW15') {
        // Apply 15% discount
        grandTotalPrice = Math.round(grandTotalPrice * 0.85);
      } else if (couponValue === 'Couple 20') {
        // Apply 20% discount
        grandTotalPrice = Math.round(grandTotalPrice * 0.80);
      }
  
      // Update grand total price
      setInnerText('grand-total-price', grandTotalPrice);
  
      // Disable apply button after applying coupon
      applyButton.disabled = true;
      applyButton.classList.remove('bg-lime-400', 'text-white');
      applyButton.classList.add('pointer-events-none', 'disabled');
      couponInput.value = '';
    } else {
      alert('You can apply coupon buying maximum 4');
    }
    
  });

  couponInput.addEventListener('keyup', function () {
    const couponValue = couponInput.value;
    if (couponValue === 'NEW15' || couponValue === 'Couple 20') {
      applyButton.classList.remove('pointer-events-none', 'disabled');
      applyButton.classList.add('bg-lime-400', 'text-white');
      applyButton.disabled = false;
    } else {
      applyButton.classList.remove('bg-lime-400', 'text-white');
      applyButton.classList.add('pointer-events-none', 'disabled');
      applyButton.disabled = true;
    }
  });
}

//Enabled next button on the basis of buying at least 1 seat and input phone no
function toggleNextButton() {
  const phoneNumberInput = document.getElementById('phone-no');
  const nameInput = document.getElementById('name');
  const nextButton = document.getElementById('next-button');

  if (count >= 1 && phoneNumberInput.value.trim().length === 11) {
    nextButton.classList.remove('pointer-events-none', 'disabled');
    nextButton.classList.add('bg-lime-400', 'text-white');
    nextButton.disabled = false;
  } else {
    nextButton.classList.remove('bg-lime-400', 'text-white');
    nextButton.classList.add('pointer-events-none', 'disabled');
    nextButton.disabled = true;
  }
}
