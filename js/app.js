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
  })

  return valid
}

const validateCardNumber = (cardNumber) => {
  cardNumber = cardNumber.replace(/\s/g, '').replace('/[^0-9]/g', '')

  if (cardNumber.length < 13 || cardNumber.length > 16) return false
  if (typeof cardNumber.value !== 'number') return false

  const isDoubleDigit = (index) => index % 2 === 1
  const sum = cardNumber.reduce((accumulator, digit, index) => {
    let number = parseInt(digit)

    if (isDoubleDigit(index)) {
      number *= 2
      if (number > 9) {
        num -= 9
      }
    }

    return accumulator + number
  }, 0)

  return sum % 10 === 0
}

const addErrorMessage = (field, message) => {
  const span = document.createElement('span')
  span.innerHTML = message
  span.classList.add('error-text')
  field.insertAdjacentElement('afterend', span)
}

form.addEventListener('submit', handleSubmit)
