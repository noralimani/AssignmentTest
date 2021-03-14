import Events from '@utilities/events'
import Validation from '@utilities/validation/'
import API from '@utilities/api'
import Toast from '@components/toast'

const FORM_SECTION = '[js-hook-form-section]'
const FORM_ERROR = '[js-hook-form-error]'
const FORM_BUTTON_BACK = '[js-hook-form-back]'
const FORM_BUTTON = '[js-hook-submit-form]'
const FIELDS = ['first-name', 'last-name', 'email']

class Newsletter {
  constructor() {
    this.bindModalEvents()

    Events.$trigger('modal[toast]::open')
  }

  init() {
    this.email = document.querySelector('#email')
    this.form_section = document.querySelector(FORM_SECTION)
    this.form_error = document.querySelector(FORM_ERROR)
    this.submit_button = document.querySelector(FORM_BUTTON)
    this.form_button_back = document.querySelector(FORM_BUTTON_BACK)

    /**
     * This function handles
     * all the validation logic
     */
    this.handleValidation()

    /**
     * Handle form submit
     *
     */
    this.submit_button.addEventListener('click', () => this.handleSubmit())
  }

  handleValidation() {
    /**
     * Display first name
     * last name section
     * when user types on email field
     */
    this.email.addEventListener('input', () => {
      this.form_section.classList.remove('hidden')
      this.form_section.classList.add('visible')
    })

    /**
     * Handle form error
     * button
     *
     */
    this.form_button_back.addEventListener('click', () => {
      this.form_error.style.display = 'none'
    })

    /**
     * Validate and observe
     * fields
     */
    Validation.setFields(FIELDS)
    Validation.observe()
  }

  /**
   * Handles the form submit
   * and displays toast or
   * error message
   */
  handleSubmit() {
    API.post(
      'https://jsonplaceholder.typicode.com/posts/',
      {
        first_name: 'First Name',
        last_name: 'Last Name',
        email: 'email@email.com',
      },
      'local',
    )
      .then(response => {
        /**
         * Close the modal
         */
        Events.$trigger('modal[newsletter]::close')

        Toast.show('Bedankt voor uw aanmelding!🎉', 'success')
      })
      .catch(error => {
        /**
         * Display the form
         * error
         */
        this.form_error.style.display = 'flex'
      })
  }

  /**
   * Clears the input
   * of all fields
   * if the modal closes
   */
  clearFields() {
    FIELDS.forEach(field => {
      document.getElementById(field).value = ''
    })
  }

  /**
   * Here we listen to modal events
   * so we can trigger play or pause
   * on the video element
   */
  bindModalEvents() {
    Events.$on('modal[newsletter]::open', () => {
      // Pause the video
      Events.$trigger('video[video-1]::pause')

      // Init the class on modal open
      this.init()
    })
    Events.$on(`modal[newsletter]::close`, () => {
      // Continue playing the video on modal close
      Events.$trigger('video[video-1]::play')

      // Clear the fields
      this.clearFields()
    })
  }
}

export default new Newsletter()
