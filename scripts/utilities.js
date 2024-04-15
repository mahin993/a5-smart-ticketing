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