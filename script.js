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
    }
    else { //stop
        recoder.stop();
        recordBtn.classList.remove("anime-record");
    }
})