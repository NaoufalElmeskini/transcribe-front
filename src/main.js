import { createApp } from 'vue'
import App from './App.vue'

// Importer le CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importer le JS de Bootstrap (si nécessaire)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/_variables.scss';

createApp(App).mount('#app')
