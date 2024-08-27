document.addEventListener("DOMContentLoaded", function() {
    // Simulate loading delay
    console.log('Script Started')
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }, 3000); // Adjust the time to match your desired loading screen duration
});

const sounds = [];
let pausedSounds = [];

for (let i = 1; i <= 8; i++) {
    sounds.push(document.getElementById(`sound${i}`));
}

 console.log('Starting Server..')
function playSound(soundId) {
    stopAllSounds();  // Stop any currently playing sounds
    const sound = document.getElementById(soundId);
    const visualizer = document.getElementById('visualizer');

    // Reset and play sound
    sound.currentTime = 0;
    sound.play();

    // Show visualizer animation
    visualizer.style.opacity = 1;

    // Stop visualizer when sound ends
    sound.addEventListener('ended', () => {
        visualizer.style.opacity = 0;
    });
}

function pauseAllSounds() {
    pausedSounds = [];
    sounds.forEach(sound => {
        if (!sound.paused) {
            pausedSounds.push({ sound, time: sound.currentTime });
            sound.pause();
        }
    });
}

function resumeAllSounds() {
    pausedSounds.forEach(({ sound, time }) => {
        sound.currentTime = time;
        sound.play();
    });
    pausedSounds = [];
}

function stopAllSounds() {
    sounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    document.getElementById('visualizer').style.opacity = 0;
    pausedSounds = [];
}

function changeVolume(value) {
    const volume = value / 250;
    sounds.forEach(sound => {
        sound.volume = volume;
    });
}

console.log("This Website Made By Rishmika Sandanu")

// Disable right-click and inspect element shortcut
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (event) {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault();
    }
});