const numbersNeededForConversionToText = {
    ones: ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
    teens: ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
    tens: ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
    thousands: ["", "Thousand", "Million", "Billion"]
  };
  const userInput = document.querySelector('.user-input')
  const outcome = document.querySelector('.outcome.hidden')
  
  function convertHundreds(num) {
    let hundreds = Math.floor(num / 100);
    let remainder = num % 100;
    let textNumber = "";
    if (hundreds > 0) {
      textNumber += numbersNeededForConversionToText.ones[hundreds] + " Hundred";
    }
    if (remainder > 0) {
        if (hundreds > 0) {
        textNumber += " and ";
      }
      if (remainder < 10) {
        textNumber += numbersNeededForConversionToText.ones[remainder];
      } else if (remainder >= 11 && remainder < 20) {
        textNumber += numbersNeededForConversionToText.teens[remainder - 11];
      } else if (remainder >= 20 && remainder < 100) {
        let calculatedTens = Math.floor(remainder / 10)
        let calculatedOnes = remainder % 10
        textNumber += numbersNeededForConversionToText.tens[calculatedTens];
        if (calculatedOnes > 0) {
          textNumber += "-" + numbersNeededForConversionToText.ones[calculatedOnes];
        }
      }
    }
    return textNumber.trim();
  }
  
  function convertToText(num) {
    if (num === 0) return "Zero"
  
    let words = "";
    let index = 0;
    while (num > 0) {
      let number = num % 1000;
      if (number !== 0) {
        let hundreds = convertHundreds(number)
             if (numbersNeededForConversionToText.thousands[index]) {
                  words = hundreds + " " + numbersNeededForConversionToText.thousands[index] + " " + words;
              } else {
                  words = hundreds + " " + words;
              }
          }
          index++;
          num = Math.floor(num / 1000);
      }
  
      return words.trim();
  }
  userInput.addEventListener("input",function(e){
  const inputNumber = e.target.value;
  const main = convertToText(inputNumber)
  outcome.classList.remove('hidden');
  outcome.textContent = main;
  if(inputNumber<0){
  outcome.textContent = "Please enter a number higher than 0"
  }
  
  })
  