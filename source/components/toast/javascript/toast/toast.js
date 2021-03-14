const TOAST = '[js-hook-toast]'
const TOAST_CONTENT = '[js-hook-toast-content]'

class Toast {
  constructor() {
    this.toast = document.querySelector(TOAST)
    this.toast_content = document.querySelector(TOAST_CONTENT)
    this.status = null
  }

  /**
   * Show toast function accepts
   * 2 parameters for text, status
   * and duration.
   *
   * Based on the status applies
   * the correct class
   *
   * @param {string} text
   * @param {string} status
   * @param {number} duration
   */
  show(text, status, duration = 5000) {
    this.toast_content.innerHTML = text
    this.toast.classList.add('toast--is-showing')

    switch (status) {
      case 'success':
        this.status = 'toast--success'
        break
      case 'warning':
        this.status = 'toast--warning'
        break
      case 'error':
        this.status = 'toast--error'
        break
    }

    this.toast.classList.add(this.status)

    setTimeout(() => this.clearToast(), duration)
  }

  /**
   * Clears the toast classes
   * and content after
   * displaying.
   */
  clearToast() {
    this.toast.classList.remove('toast--is-showing', this.status)
    this.toast_content.innerHTML = ''
  }
}

export default new Toast()
