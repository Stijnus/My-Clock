export class Clock {
      constructor() {
        this.time = new Date()
        this.isDark = false
        this.interval = null
      }

      toggleTheme() {
        this.isDark = !this.isDark
        document.documentElement.classList.toggle('dark', this.isDark)
      }

      updateTime() {
        this.time = new Date()
        this.clockElement.querySelector('.time').textContent = this.getFormattedTime()
      }

      getFormattedTime() {
        const hours = this.time.getHours().toString().padStart(2, '0')
        const minutes = this.time.getMinutes().toString().padStart(2, '0')
        const seconds = this.time.getSeconds().toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
      }

      render() {
        this.clockElement = document.createElement('div')
        this.clockElement.className = 'text-center animate-fade-in'

        const timeElement = document.createElement('div')
        timeElement.className = 'text-8xl font-bold text-gray-900 dark:text-gray-100 mb-8'
        timeElement.classList.add('time')
        timeElement.textContent = this.getFormattedTime()

        const themeButton = document.createElement('button')
        themeButton.className = 'px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
        themeButton.textContent = 'Toggle Theme'
        themeButton.addEventListener('click', () => this.toggleTheme())

        this.clockElement.appendChild(timeElement)
        this.clockElement.appendChild(themeButton)

        this.interval = setInterval(() => this.updateTime(), 1000)
        return this.clockElement
      }
    }
