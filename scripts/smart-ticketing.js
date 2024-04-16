function buyTickets(){
  const paribahanSection = document.getElementById('paribahan-section');
  paribahanSection.scrollIntoView();
}

const seats = document.getElementsByClassName('seat-no');
let count = 0;
let remainSeat = 40;

for(const seat of seats){
  seat.addEventListener('click', function (event){
    if (count < 4) { 
      count += 1;
      remainSeat -= 1;

      // seat count
      setInnerText('seat-count', count);

      // remain seat
      if(remainSeat >= 0){
        setInnerText('remain-seat', remainSeat);
      }

      setBackgroundColor(event.currentTarget);
      const currentSeat = event.currentTarget.id;

      const selectedSeatContainer = document.getElementById('selected-seat-container');
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center gap-16 lg:gap-28 text-xl font-semibold';
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

      calculatePrice('total-price', parseInt(p3Text));
      calculatePrice('grand-total-price', parseInt(p3Text));

      applyCoupon();
      document.getElementById('phone-no').addEventListener('input', toggleNextButton);
     
    } else{
      alert('Can buy maximum 4 seats.');
    }
  });
}

// Apply Coupon
function applyCoupon(){
  const couponInput = document.getElementById('coupon-input');
  const applyButton = document.getElementById('apply-button');
  const couponContainer = document.querySelector('.flex.justify-between.items-center.py-3');

  applyButton.addEventListener('click', function (){
    const couponValue = couponInput.value;

    const grandTotalPriceText = document.getElementById('grand-total-price').innerText;
    let grandTotalPrice = parseInt(grandTotalPriceText);
    let discountAmount = 0;

    // buying seat is greater than or equal to 4 and less than or equal to 4
    if(count >= 4 && count <= 4){
      if(couponValue === 'NEW15'){
        // Apply 15% discount
        discountAmount = grandTotalPrice * 0.15;
        grandTotalPrice -= discountAmount;
        couponContainer.innerHTML = `<p>You have got ${discountAmount} BDT discount.</p>`;
      } else if(couponValue === 'Couple 20'){
        // Apply 20% discount
        discountAmount = grandTotalPrice * 0.20;
        grandTotalPrice -= discountAmount;
        couponContainer.innerHTML = `<p>You have got ${discountAmount} BDT discount.</p>`;
      }

      // Update grand total price
      setInnerText('grand-total-price', grandTotalPrice);

      

      couponInput.value = '';
    } else{
      alert('You can apply coupon buying 4 seats');
    }
  });

  couponInput.addEventListener('keyup', function (){
    const couponValue = couponInput.value;
    if(couponValue === 'NEW15' || couponValue === 'Couple 20'){
      applyButton.classList.remove('pointer-events-none', 'disabled');
      applyButton.classList.add('bg-lime-400', 'text-white');
      applyButton.disabled = false;
    } else{
      applyButton.classList.remove('bg-lime-400', 'text-white');
      applyButton.classList.add('pointer-events-none', 'disabled');
      applyButton.disabled = true;
    }
  });
}

//Enabled next button on the basis of buying at least 1 seat and input phone no
function toggleNextButton(){
  const phoneNumberInput = document.getElementById('phone-no');
  const nextButton = document.getElementById('next-button');

  if(count >= 1 && phoneNumberInput.value.trim().length === 11){
    nextButton.classList.remove('pointer-events-none', 'disabled');
    nextButton.classList.add('bg-lime-400', 'text-white');
    nextButton.disabled = false;

    nextButton.addEventListener('click', function(){
      const modalContainer = createModal();
      const continueButton = modalContainer.querySelector('#continueButton');
      
      continueButton.addEventListener('click', function(){
        modalContainer.style.display = 'none';
        window.location.reload();
      });
    });
  } else{
    nextButton.classList.remove('bg-lime-400', 'text-white');
    nextButton.classList.add('pointer-events-none', 'disabled');
    nextButton.disabled = true;
  }
}

//display modal
function createModal(){
  const modalHTML = `
    <div class="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50">
      <div class="flex flex-col justify-center items-center bg-white rounded-lg w-full lg:w-1/2 p-4 lg:p-10 m-10">
        <img src="images/success.png" class="lg:w-[100px] lg:h-[100px] rounded-md mb-4" alt="Success Image">
        <h2 class="text-2xl font-extrabold mb-4 text-[#27AE60] py-6 lg:py-4">SUCCESS</h2>
        <p class="text-md lg:text-lg font-semibold mb-4 text-center">Thank you for Booking Our Bus Seats. We are working hard to find the best service and deals for you.</p>
        <p class="text-md text-gray-600 mb-4">Shortly you will find a confirmation in your email.</p>
        <button id="continueButton" class="btn bg-[#27AE60] text-white font-extrabold px-16 py-1 rounded-full">Continue</button>
      </div>
    </div>
  `;

  // Create div element for the modal content
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;

  const continueButton = modalContainer.querySelector('button');
  continueButton.addEventListener('click', function(){
    document.body.removeChild(modalContainer);
  });
  // Append the modal container to the body
  document.body.appendChild(modalContainer);

  return modalContainer;
}