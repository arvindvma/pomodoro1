class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // Timer durations in minutes
        this.durations = {
            pomodoro: 25,
            shortBreak: 5,
            longBreak: 15
        };

        this.currentMode = 'pomodoro';

        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
        this.updateTitle();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoroButton = document.getElementById('pomodoro');
        this.shortBreakButton = document.getElementById('short-break');
        this.longBreakButton = document.getElementById('long-break');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoroButton.addEventListener('click', () => this.setTimer('pomodoro'));
        this.shortBreakButton.addEventListener('click', () => this.setTimer('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setTimer('longBreak'));
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        this.updateTitle();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.updateTitle();
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    alert('Timer completed!');
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        this.updateTitle();
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations.pomodoro * 60;
        this.updateDisplay();
    }

    setTimer(mode) {
        this.pause();
        this.currentMode = mode;
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();
        
        // Update active button
        [this.pomodoroButton, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        
        switch(mode) {
            case 'pomodoro':
                this.pomodoroButton.classList.add('active');
                break;
            case 'shortBreak':
                this.shortBreakButton.classList.add('active');
                break;
            case 'longBreak':
                this.longBreakButton.classList.add('active');
                break;
        }
    }

    updateTitle() {
        if (!this.isRunning) {
            document.title = 'Pomodoro Timer';
            return;
        }
        
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const time = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        const mode = {
            pomodoro: 'Pomodoro',
            shortBreak: 'Short Break',
            longBreak: 'Long Break'
        }[this.currentMode];
        
        document.title = `${mode} - ${time}`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new PomodoroTimer();
}); 