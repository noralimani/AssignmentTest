class Validation {
  /**
   * Starts the validation
   */
  observe() {
    this.validateOnEntry()
  }

  /**
   * Accept's an array of fields
   * to be validated
   *
   * @param {Array} fields
   */
  setFields(fields = []) {
    this.fields = fields
  }

  /**
   * Queries all the fields and
   * listens to a an input event
   * and validates the field
   */
  validateOnEntry() {
    let self = this
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', () => {
        self.validateFields(input)
      })
    })
  }

  /**
   * Validate fields
   *
   * @param {Node} field
   */
  validateFields(field) {
    if (field.value.trim() === '') {
      this.setStatus(field, 'error')
    } else {
      this.setStatus(field, 'success')
    }

    if (field.type === 'email') {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, 'success')
      } else {
        this.setStatus(field, 'error')
      }
    }
  }

  /**
   * Adds or removes classes
   * based on the status.
   *
   * @param {Node} field
   * @param {string} status
   */
  setStatus(field, status) {
    const successClass = 'form__item--success'
    const errorClass = 'form__item--error'

    const parentSelector = field.parentElement.parentElement

    if (status === 'success') {
      parentSelector.classList.add(successClass)
      parentSelector.classList.remove(errorClass)
    }

    if (status === 'error') {
      parentSelector.classList.add(errorClass)
      parentSelector.classList.remove(successClass)
    }
  }
}

export default new Validation()
