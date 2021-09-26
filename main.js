let countdownMinutes = 5;
let countdownSeconds = 0;
let countDownOn = false;
let timeInSeconds = 0;
let timeout;
let startButton = document.getElementsByClassName('startButton');
let stopButton = document.getElementsByClassName('stopButton');
function loadFile(event, competitor) {
    let output = document.getElementById(competitor);
    output.src = URL.createObjectURL(event.target.files[0]);
    console.log(URL.createObjectURL(event.target.files[0]));
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}
function refreshText(id, value){
    console.log(id, value);
    let text = document.getElementById(id);
    text.innerText = value;
}
// function changeCountdownValues(minutes, seconds){
//     countdownMinutes = minutes;
//     countdownSeconds = seconds;
//     updateCountdownString();
// }
function changeCountdownValues(){
    countDownOn = false;
    countdownMinutes = document.getElementById('minute-input').value;
    countdownSeconds = document.getElementById('seconds-input').value;
    updateCountdownString();
}
function updateCountdownString(){
    const countdown = document.getElementById('countdown-string');
    let countdownString = '' + addZeroIfNeeded(countdownMinutes) + ':' + addZeroIfNeeded(countdownSeconds);
    countdown.innerText = countdownString;
}
function addZeroIfNeeded(value){
    if(value < 10){
        return '0' + value;
    }
    return value;
}
function calculateTimeFromSeconds(){
    countdownMinutes = Math.floor(timeInSeconds / 60);
    countdownSeconds = timeInSeconds - (countdownMinutes * 60);
}
function startCountDown(){
    if(!countDownOn){
        console.log(startButton.innerText );
        startButton.innerText = "ASDASDAS";
        console.log(startButton);
        console.log(startButton.textContent );
        countdownMinutes = parseInt(countdownMinutes, 10);
        countdownSeconds = parseInt(countdownSeconds, 10);
        timeInSeconds = (countdownMinutes * 60) + countdownSeconds;
        console.log('START WITH MIN:', countdownMinutes);
        console.log('START WITH SEC:', countdownSeconds);
        console.log('START WITH TIMEINSECONDS:', timeInSeconds);
        timeInSeconds++;
        countDownOn = true;
        timeCount();
    }
}
function timeCount(){
    timeInSeconds--;
    calculateTimeFromSeconds();
    updateCountdownString();
    if(timeInSeconds != 0){
        if(countDownOn){
            timeout = setTimeout(timeCount, 1000);
        }
    } else {
        countDownOn = false;
    }
}
function changeTime(){

}
function stopCountDown(){
    if(countDownOn){
        clearTimeout(timeout);
        countDownOn = false;
    }
}
function resetCountDown(){
    if(countDownOn){
        clearTimeout(timeout);
        countDownOn = false;
    }
    changeCountdownValues();
}
