export class Clock {
      constructor() {
        this.time = new Date();
        this.isDark = false;
        this.interval = null;
        this.alarmTime = null;
        this.alarmTimeout = null;
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.currentAudio = null;
      }

      toggleTheme() {
        this.isDark = !this.isDark;
        document.documentElement.classList.toggle('dark', this.isDark);
      }

      updateTime() {
        this.time = new Date();
        this.clockElement.querySelector('.time').textContent = this.getFormattedTime();
        this.checkAlarm();
      }

      getFormattedTime() {
        const hours = this.time.getHours().toString().padStart(2, '0');
        const minutes = this.time.getMinutes().toString().padStart(2, '0');
        const seconds = this.time.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
      }

      playSound() {
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
        }

        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        this.currentAudio = audio;

        audio.play();

        audio.addEventListener('ended', () => {
          this.currentAudio = null;
        });
      }

      render() {
        this.clockElement = document.createElement('div');
        this.clockElement.className = 'text-center animate-fade-in p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800';

        const timeElement = document.createElement('div');
        timeElement.className = 'text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 time';
        timeElement.textContent = this.getFormattedTime();

        const themeButton = document.createElement('button');
        themeButton.className = 'px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center';
        themeButton.innerHTML = '<i class="fas fa-sun mr-2"></i> Toggle Theme';
        themeButton.addEventListener('click', () => this.toggleTheme());

        // Alarm Input
        const alarmContainer = document.createElement('div');
        alarmContainer.className = 'mb-4';

        const alarmLabel = document.createElement('label');
        alarmLabel.className = 'block text-gray-700 dark:text-gray-300 mb-2';
        alarmLabel.innerHTML = '<i class="fas fa-clock mr-2"></i> Set Alarm Time (HH:MM):';

        const alarmInput = document.createElement('input');
        alarmInput.type = 'time';
        alarmInput.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-200';
        alarmInput.id = 'alarmTime';
        alarmContainer.appendChild(alarmLabel);
        alarmContainer.appendChild(alarmInput);

        const setAlarmButton = document.createElement('button');
        setAlarmButton.className = 'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-700 transition-colors flex items-center justify-center';
        setAlarmButton.innerHTML = '<i class="fas fa-bell mr-2"></i> Set Alarm';
        setAlarmButton.addEventListener('click', () => {
          this.setAlarm(alarmInput.value);
        });

        alarmContainer.appendChild(setAlarmButton);

        // Timer Input
        const timerContainer = document.createElement('div');
        timerContainer.className = 'mb-4';

        const timerLabel = document.createElement('label');
        timerLabel.className = 'block text-gray-700 dark:text-gray-300 mb-2';
        timerLabel.innerHTML = '<i class="fas fa-stopwatch mr-2"></i> Set Timer (seconds):';

        const timerInput = document.createElement('input');
        timerInput.type = 'number';
        timerInput.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:text-gray-200';
        timerInput.id = 'timerSeconds';
        timerContainer.appendChild(timerLabel);
        timerContainer.appendChild(timerInput);

        const setTimerButton = document.createElement('button');
        setTimerButton.className = 'px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700 transition-colors flex items-center justify-center';
        setTimerButton.innerHTML = '<i class="fas fa-play mr-2"></i> Set Timer';
        setTimerButton.addEventListener('click', () => {
          this.setTimer(timerInput.value);
        });

        timerContainer.appendChild(setTimerButton);

        // Test Sound Button
        const testSoundButton = document.createElement('button');
        testSoundButton.className = 'px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-700 transition-colors flex items-center justify-center';
        testSoundButton.innerHTML = '<i class="fas fa-volume-up mr-2"></i> Test Sound';
        testSoundButton.addEventListener('click', () => {
          this.playSound();
        });

        this.clockElement.appendChild(timeElement);
        this.clockElement.appendChild(themeButton);
        this.clockElement.appendChild(alarmContainer);
        this.clockElement.appendChild(timerContainer);
        this.clockElement.appendChild(testSoundButton);

        this.interval = setInterval(() => this.updateTime(), 1000);
        return this.clockElement;
      }

      setAlarm(time) {
        this.alarmTime = time;
        console.log(`Alarm set for ${this.alarmTime}`);
      }

      checkAlarm() {
        if (!this.alarmTime) return;

        const now = new Date();
        const [hours, minutes] = this.alarmTime.split(':');
        const alarm = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

        if (now.getTime() >= alarm.getTime()) {
          this.playSound();
          alert('Alarm! Time to wake up!');
          this.alarmTime = null; // Clear the alarm
        }
      }

      setTimer(seconds) {
        this.timerSeconds = parseInt(seconds, 10);
        if (isNaN(this.timerSeconds) || this.timerSeconds <= 0) {
          alert('Please enter a valid number of seconds for the timer.');
          return;
        }

        alert(`Timer set for ${this.timerSeconds} seconds`);
        try {
          this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            if (this.timerSeconds <= 0) {
              clearInterval(this.timerInterval);
              this.playSound();
              alert('Timer finished!');
            }
            console.log(`Timer remaining: ${this.timerSeconds} seconds`);
          }, 1000);
        } catch (error) {
          console.error("Error in setTimer:", error);
        }
      }
    }
