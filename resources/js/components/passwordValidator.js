export default () => ({
  password: '',
  showRules: false,
  rules: {
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false,
  },
  validatePassword() {
    this.rules.minLength = this.password.length >= 8
    this.rules.hasUppercase = /[A-Z]/.test(this.password)
    this.rules.hasLowercase = /[a-z]/.test(this.password)
    this.rules.hasNumber = /[0-9]/.test(this.password)
    this.rules.hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(this.password)
  },
  get isValid() {
    return Object.values(this.rules).every((rule) => rule)
  },
})
