const size = 6,
    popCell = `<input type="radio" class="pop">`,
    popLine = `<div class="line">${Array(size).fill(popCell).join('')}</div>`,
    popItContent = Array(size).fill(popLine).join('')

const context = new AudioContext();
const URL = 'https://freesound.org/data/previews/545/545198_12172648-lq.mp3';
let buffer;

const play = () => {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
}

document.querySelector('.wrapper').innerHTML = popItContent
document.querySelector('.swapSides').addEventListener('click', () => document.forms[0].reset())
document.querySelectorAll('.pop').forEach(pop => pop.addEventListener('change', play.bind(this, buffer)))

window.fetch(URL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        buffer = audioBuffer;
    });
