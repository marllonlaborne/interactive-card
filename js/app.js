const form = document.querySelector('.card-form')

const handleSubmit = (event) => {
  event.preventDefault()
  validateFields()
}

const validateFields = () => {
  let valid = true
  const fields = form.querySelectorAll('.validate')
  const errorTexts = form.querySelectorAll('.error-text')
  
  errorTexts.forEach(text => text.remove())
  
  fields.forEach(field => {
    if (!field.value) {
      addErrorMessage(field, "Can't be blank")
      field.style.borderColor = 'var(--input-errors)'
      valid = false
    } else {
      field.style.borderColor = 'var(--light-grayish-violet)'
      valid = true
    } 
    
    if (field.classList.contains('card-number')) {
      if (!validateCardNumber(field.value)) valid = false
    }

    if (field.classList.contains('month')) {
      if (!validateMonth(field.value)) valid = false
    }
  })

  return valid
}


const validateMonth = (month) => {
  let valid = true
  const monthInput = form.querySelector('.month')
  month = month.trim()

  if (!/^\d+$/.test(month)) {
    addErrorMessage(monthInput, 'Invalid month')
    monthInput.style.borderColor = 'var(--input-errors)'
    valid = false
  }

  const monthValue = parseInt(month, 10)

  if (monthValue < 1 || monthValue > 12) {
    addErrorMessage(monthInput, 'Month must be between 1 and 12')
    monthInput.style.borderColor = 'var(--input-errors)'
    valid = false
  }

  if (month.length > 3) {
    addErrorMessage(monthInput, 'Month must be less than 3 digits')
    monthInput.style.borderColor = 'var(--input-errors)'
    valid = false
  }

  return valid
}

const validateCardNumber = (cardNumber) => {
  let valid = true
  const cardNumberInput = form.querySelector('.card-number')
  cardNumber = cardNumber.replace(/\s/g, '').replace(/[^0-9]/g, '')

  if (cardNumber.length < 13 || cardNumber.length > 16) {
    addErrorMessage(cardNumberInput, 'Card number must be between 13 and 16 digits')
    valid = false
  }

  if (!/^[0-9]+$/.test(cardNumber)) {
    addErrorMessage(cardNumberInput, 'Wrong format, numbers only')
    valid = false
  }

  const isDoubleDigit = (index) => index % 2 === 1
  const digits = cardNumber.split('').map(Number)
  const sum = digits.reduce((accumulator, digit, index) => {
    let number = digit

    if (isDoubleDigit(index)) {
      number *= 2
      if (number > 9) {
        number -= 9
      }
    }

    return accumulator + number
  }, 0)

  if (sum % 10 !== 0) {
    addErrorMessage(cardNumberInput, 'Invalid card number')
    cardNumberInput.style.borderColor = 'var(--input-errors)'
    valid = false
  }

  return valid
}

const addErrorMessage = (field, message) => {
  const span = document.createElement('span')
  span.innerHTML = message
  span.classList.add('error-text')
  field.insertAdjacentElement('afterend', span)
}

form.addEventListener('submit', handleSubmit)
