import './style.css'
    import { Clock } from './components/Clock.js'

    const app = document.getElementById('app')
    const clock = new Clock()
    app.appendChild(clock.render())
