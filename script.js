document.addEventListener("DOMContentLoaded", function() {
    console.log('Script Started');

    // Simulate loading delay
    setTimeout(function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }, 3000);

    const sounds = [];
    let pausedSounds = [];

    for (let i = 1; i <= 8; i++) {
        sounds.push(document.getElementById(`sound${i}`));
    }

    console.log('Starting Server..');

    function playSound(soundId) {
        stopAllSounds();
        const sound = document.getElementById(soundId);
        const visualizer = document.getElementById('visualizer');

        sound.currentTime = 0;
        sound.play();

        visualizer.style.opacity = 1;

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

    console.log("This Website Made By Rishmika Sandanu");

    // Disable right-click and inspect element shortcut
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(event) {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
            event.preventDefault();
        }
    });

    // Detect footer changes
    const footer = document.querySelector('footer');
    const observer = new MutationObserver(() => {
        console.warn('Footer has been modified! The site will break.');
        
        // Break the website functionality
        document.body.innerHTML = '<h1>Website has been corrupted By Rishmika Sandanu</h1>';
        
        // Display random text
        const randomText = document.createElement('p');
        randomText.textContent = 'Random Text: ' + Math.random().toString(36).substring(2, 15);
        document.body.appendChild(randomText);
        
        // Random refresh
        setTimeout(() => {
            location.reload();
        }, Math.random() * 5000 + 2000); // Randomly refresh between 2 and 7 seconds
    });

    // Start observing the footer for changes
    observer.observe(footer, {
        childList: true, 
        subtree: true,
        attributes: true,
        characterData: true
    });
});
