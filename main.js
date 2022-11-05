let countdownMinutes = 5;
let countdownSeconds = 0;
let countDownOn = false;
let timeInSeconds = 0;
let timeout;

let roundsTime = [];

let imageUrls = [];
let modalOpen = false;

window.addEventListener("keydown", (event) => {
    if (modalOpen && event.key === 'Escape') {
        closeModal();
    }
})

function loadFile(event, competitor) {
    let output = document.getElementById(competitor);
    output.src = URL.createObjectURL(event.target.files[0]);
    imageUrls.push(output.src);
    // output.onload = function () {
    //     URL.revokeObjectURL(output.src)
    // }
}

function refreshText(id, value) {
    console.log(id, value);
    let text = document.getElementById(id);
    text.innerText = value;
}

function changeCountdownValues() {
    countDownOn = false;
    countdownMinutes = document.getElementById('minute-input').value;
    countdownSeconds = document.getElementById('seconds-input').value;
    updateCountdownString();
}

function updateCountdownString() {
    const countdown = document.getElementById('countdown-string');
    let countdownString = '' + addZeroIfNeeded(countdownMinutes) + ':' + addZeroIfNeeded(countdownSeconds);
    countdown.innerText = countdownString;
}

function addZeroIfNeeded(value) {
    if (value < 10) {
        return '0' + value;
    }
    return value;
}

function calculateTimeFromSeconds() {
    countdownMinutes = Math.floor(timeInSeconds / 60);
    countdownSeconds = timeInSeconds - (countdownMinutes * 60);
}

function startCountDown() {
    if (!countDownOn) {
        countdownMinutes = parseInt(countdownMinutes, 10);
        countdownSeconds = parseInt(countdownSeconds, 10);
        timeInSeconds = (countdownMinutes * 60) + countdownSeconds;
        timeInSeconds++;
        countDownOn = true;
        timeCount();
    }
}

function timeCount() {
    timeInSeconds--;
    calculateTimeFromSeconds();
    updateCountdownString();
    if (timeInSeconds != 0) {
        if (countDownOn) {
            timeout = setTimeout(timeCount, 1000);
        }
    } else {
        countDownOn = false;
    }
}

function stopCountDown() {
    if (countDownOn) {
        clearTimeout(timeout);
        countDownOn = false;
    }
}

function resetCountDown() {
    if (countDownOn) {
        clearTimeout(timeout);
        countDownOn = false;
    }
    changeCountdownValues();
}

function resetSettings() {
    const inputs = document.getElementsByTagName("input");
    for (const [key, entry] of Object.entries(inputs)) {
        entry.value = '';
    }
    let comp1 = document.getElementById(Competitors.COMPETITOR1);
    let comp2 = document.getElementById(Competitors.COMPETITOR2);
    comp1.src = 'assets/no_image.png';
    comp2.src = 'assets/no_image.png';

    refreshText(Texts.COMPETITOR1_NAME, 'Competitor1');
    refreshText(Texts.COMPETITOR2_NAME, 'Competitor2');
    refreshText(Texts.COMPETITOR1_TEAM, 'Team');
    refreshText(Texts.COMPETITOR2_TEAM, 'Team');

    imageUrls.forEach(url => {
        URL.revokeObjectURL(url);
    })
}

function closeModal() {
    const winnerOverlay = document.getElementById('winner-overlay');
    winnerOverlay.style.opacity = 0;
    setTimeout(() => {
        winnerOverlay.style.visibility = 'hidden';
        modalOpen = false;
    }, 500);
    const winnerButtons = document.getElementsByClassName('winner-button');
    for (const [key, entry] of Object.entries(winnerButtons)) {
        entry.style.opacity = 1;
        entry.style.cursor = 'pointer';
    }
}

function openModal() {
    const winnerOverlay = document.getElementById('winner-overlay');
    winnerOverlay.style.visibility = 'visible';
    winnerOverlay.style.opacity = 1;

    const winnerButtons = document.getElementsByClassName('winner-button');
    for (const [key, entry] of Object.entries(winnerButtons)) {
        entry.style.opacity = 0;
        entry.style.cursor = 'default';
    }
    modalOpen = true;
}

function showWinner(competitor) {
    const picture = document.getElementById(competitor);
    const teamId = competitor === Competitors.COMPETITOR1 ? Texts.COMPETITOR1_TEAM : Texts.COMPETITOR2_TEAM;
    const nameId = competitor === Competitors.COMPETITOR1 ? Texts.COMPETITOR1_NAME : Texts.COMPETITOR2_NAME;
    const team = document.getElementById(teamId);
    const name = document.getElementById(nameId);

    const winnerPicture = document.getElementById('winner-image');
    winnerPicture.src = picture.src;
    console.log('pic src', picture.src);
    refreshText('winner-name', name.innerText);
    refreshText('winner-team', team.innerText);
    const color = document.getElementById('winner-color');
    const red = '#ce1919';
    const blue = '#1919ce';
    color.style.background = competitor === Competitors.COMPETITOR1 ? red : blue;
    openModal();
}

function stopPropagationOnClick(event) {
    event.stopPropagation()
}

const Competitors = {
    COMPETITOR1: 'competitor1',
    COMPETITOR2: 'competitor2',
};

const Texts = {
    COMPETITOR1_NAME: 'competitor1-name',
    COMPETITOR2_NAME: 'competitor2-name',
    COMPETITOR1_TEAM: 'competitor1-team',
    COMPETITOR2_TEAM: 'competitor2-team',
}