let userAudio, providedAudio;
let userAnalyser, providedAnalyser;
let userDataArray, providedDataArray;

document.getElementById('loadButton').addEventListener('click', async () => {
    const userAudioUrl = document.getElementById('userAudioUrl').value;
    const providedAudioUrl = document.getElementById('providedAudioUrl').value;

    if (userAudioUrl && providedAudioUrl) {
        try {
            // Crear elementos de audio nativos
            userAudio = new Audio(`/proxy?url=${encodeURIComponent(userAudioUrl)}`);
            providedAudio = new Audio(`/proxy?url=${encodeURIComponent(providedAudioUrl)}`);

            // Configurar Web Audio API para el análisis de audio
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

            // User Audio
            const userSource = audioCtx.createMediaElementSource(userAudio);
            userAnalyser = audioCtx.createAnalyser();
            userSource.connect(userAnalyser);
            userAnalyser.connect(audioCtx.destination);
            userAnalyser.fftSize = 256;
            const bufferLength = userAnalyser.frequencyBinCount;
            userDataArray = new Uint8Array(bufferLength);

            // Provided Audio
            const providedSource = audioCtx.createMediaElementSource(providedAudio);
            providedAnalyser = audioCtx.createAnalyser();
            providedSource.connect(providedAnalyser);
            providedAnalyser.connect(audioCtx.destination);
            providedAnalyser.fftSize = 256;
            providedDataArray = new Uint8Array(bufferLength);

            document.getElementById('mixerControls').style.display = 'block';
        } catch (error) {
            console.error('Error al cargar los archivos de audio:', error);
            alert('Hubo un problema al cargar los archivos de audio. Verifique las URLs y vuelva a intentarlo.');
        }
    } else {
        alert('Por favor introduce ambas URLs de audio.');
    }
});

document.getElementById('playButton').addEventListener('click', () => {
    if (userAudio && providedAudio) {
        userAudio.play();
        providedAudio.play();
        updateVuMeter(userAnalyser, userDataArray, 'userVuFill');
        updateVuMeter(providedAnalyser, providedDataArray, 'providedVuFill');
    } else {
        alert('Primero debe cargar las pistas de audio.');
    }
});

document.getElementById('pauseButton').addEventListener('click', () => {
    if (userAudio && providedAudio) {
        userAudio.pause();
        providedAudio.pause();
    } else {
        alert('Primero debe cargar las pistas de audio.');
    }
});

document.getElementById('userVolume').addEventListener('input', (event) => {
    if (userAudio) {
        userAudio.volume = event.target.value;
    }
});

document.getElementById('providedVolume').addEventListener('input', (event) => {
    if (providedAudio) {
        providedAudio.volume = event.target.value;
    }
});

function updateVuMeter(analyser, dataArray, fillId) {
    analyser.getByteFrequencyData(dataArray);
    const sum = dataArray.reduce((a, b) => a + b, 0);
    const average = sum / dataArray.length;
    const fill = document.getElementById(fillId);
    fill.style.height = `${average / 2}%`;

    requestAnimationFrame(() => updateVuMeter(analyser, dataArray, fillId));
}
