let video = document.querySelector("video");
let recordBtnCont = document.querySelector(".record-btn-cont");
let recordBtn = document.querySelector(".record-btn");
let captureBtnCont = document.querySelector(".capture-btn-cont");
let captureBtn = document.querySelector(".capture-btn");
let recordFlag = false;

let recoder;
let chunks = []; //media data in chunks

let constraints = {
    video: true,
    audio: true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
        video.srcObject = stream;

        recoder = new MediaRecorder(stream);
        recoder.addEventListener("start", (e) => {
            chunks = [];
        });
        recoder.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
        })
        recoder.addEventListener("stop", (e) => {
            // coversion media chunks data to video
            let blob = new Blob(chunks, { type: "video/mp4" });
            let videoURL = window.URL.createObjectURL(blob);

            let a = document.createElement("a");
            a.href = videoURL;
            a.download = "video.mp4";
            a.click();
        });
    });

recordBtnCont.addEventListener("click", (e) => {
    if (!recoder) return;
    recordFlag = !recordFlag;
    if (recordFlag) { //start
        recoder.start();
        recordBtn.classList.add("anime-record");
        startTimer();

    }
    else { //stop
        recoder.stop();
        recordBtn.classList.remove("anime-record");
        stopTimer()
    }

});

let TimerID;
let counter = 0;
let timer = document.querySelector(".timer")
function startTimer() {
    timer.style.display = "block";
    function displayTimer() {
        let totalSecends = counter;

        let hours = Number.parseInt(totalSecends / 3600);
        totalSecends = totalSecends % 3600;

        let minuts = Number.parseInt(totalSecends / 60);
        totalSecends = totalSecends % 60;

        let secends = totalSecends;


        hours = (hours < 10) ? `0${hours}` : hours;
        minuts = (minuts < 10) ? `0${minuts}` : minuts;
        secends = (secends < 10) ? `0${secends}` : secends;

        timer.innerText = `${hours}:${minuts}:${secends}`;
        counter++;
    }
    TimerID = setInterval(displayTimer, 1000);
}
function stopTimer() {
    clearInterval(TimerID);
    timer.style.display = "none";
    timer.innerText = "00:00:00";
}
