import '../css/app.css'
import Alpine from 'alpinejs'
import passwordValidator from './components/passwordValidator'

window.Alpine = Alpine

// Register component before starting Alpine
Alpine.data('passwordValidator', passwordValidator)

Alpine.start()
