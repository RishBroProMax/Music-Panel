document.addEventListener("DOMContentLoaded", function () {
    console.log('Script Started');

    // Loading screen delay and transition effect
    setTimeout(function () {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('content').classList.remove('hidden');
        }, 1000); // Adjust fade-out duration
    }, 3000);

    const sounds = [];
    let pausedSounds = [];

    for (let i = 1; i <= 12; i++) {
        sounds.push(document.getElementById(`sound${i}`));
    }

    function playSound(soundId) {
        stopAllSounds();
        const sound = document.getElementById(soundId);
        const visualizer = document.getElementById('visualizer');

        sound.currentTime = 0;
        sound.play();

        // Start visualizer animation
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
        const volume = value / 100;
        sounds.forEach(sound => {
            sound.volume = volume;
        });
    }

    // Disable right-click and inspect element
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function (event) {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
            event.preventDefault();
        }
    });

    // Footer security with tamper detection
    const correctFooterText = "Rishmika Sandanu";
    const correctFooterLink = "https://github.com/RishBroProMax";

    function checkFooterIntegrity() {
        const footerLinkElement = document.querySelector('#footer .footer-content a');
        const footerText = footerLinkElement ? footerLinkElement.textContent.trim() : "";
        const footerLink = footerLinkElement ? footerLinkElement.getAttribute('href') : "";

        if (footerText !== correctFooterText || footerLink !== correctFooterLink) {
            alert("Unauthorized modification detected! Access denied.");
            document.body.innerHTML = '<h1>⚠ Access Denied ⚠</h1><p>The footer has been altered. Access is restricted.</p>';
        }
    }

    const footer = document.querySelector('#footer');
    const observer = new MutationObserver(() => {
        checkFooterIntegrity();
    });

    observer.observe(footer, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });

    checkFooterIntegrity();
});
