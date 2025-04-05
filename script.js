const passwordField = document.getElementById('password-field')
const copyPasswordButton = document.getElementById('copy-password')
const passwordLengthSlider = document.getElementById('password-length-slider')
const includeNumber = document.getElementById('include-numbers')
const includeLetters = document.getElementById('include-letters')
const includeMixedCase = document.getElementById('include-mixed-case')
const includePunctuation = document.getElementById('include-punchuation')
const passwordLengthDisplay = document.getElementById('password-length')
const successMessage = document.querySelector('.success-message')
const errorMessage = document.querySelector('.error-message')

// Required numbers, letters, mixedCase, punchuations
const numbers = '1234567890'
const letters = 'abcdefghijklmnopqrstuvwxyz'
const mixedCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const punchuation = '!@#$%^&*'

// Requred variables for the password generation
let selectedCharacters = ""
let password = ""
let passwordLength;

// Function to update the slider length dynamically
const updateSliderLength = () => {
  passwordLengthDisplay.textContent = passwordLengthSlider.value;
  passwordLength = passwordLengthSlider.value;
  handleInputChange();
}

// When the DOM will loaded, it will show the password based on the given length
document.addEventListener('DOMContentLoaded', () => {
  updateSliderLength();
})

// on change the slider, change the length 
passwordLengthSlider.addEventListener('change', () => {
  updateSliderLength();
})

// Generate a random number between 0 to the given length
const generateRandomIndex = (length) => {
  return Math.floor(Math.random() * length)
}

// Generate the password
const generatePassword = () => {
  selectedCharacters = "";  // Reset before generation
  password = "";

  if(includeNumber.checked) selectedCharacters += numbers;
  if(includeLetters.checked) selectedCharacters += letters;
  if(includeMixedCase.checked) selectedCharacters += mixedCase;
  if(includePunctuation.checked) selectedCharacters += punchuation;

  for(let i = 0; i < passwordLength; i++) {
    const randomIndex = generateRandomIndex(selectedCharacters.length);
    password += selectedCharacters[randomIndex];
  }
  passwordField.value = password;
}

// Function to handle the input on changing the inputs
const handleInputChange = () => {
  if (!includeNumber.checked && !includeLetters.checked && !includeMixedCase.checked && !includePunctuation.checked) {
    errorMessage.classList.remove('hidden');
    password= "";
    passwordField.value = "";
  } else {
    errorMessage.classList.add('hidden');
    generatePassword();
  }
}

includeNumber.addEventListener('change', handleInputChange);
includeLetters.addEventListener('change', handleInputChange);
includeMixedCase.addEventListener('change', handleInputChange);
includePunctuation.addEventListener('change', handleInputChange);

// On clicking the copy button, password will be copied to the clipboard
copyPasswordButton.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordField.value);
  passwordField.select();
  successMessage.classList.remove('hidden')
  setTimeout(() => {
    successMessage.classList.add('hidden')
  }, 3000)
})