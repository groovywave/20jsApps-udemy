const video = document.getElementById("video");
console.log("🚀 ~ video:", video);
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

//Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = "<i class= 'fa fa-play fa-2x'></i>";
  } else {
    play.innerHTML = "<i class= 'fa fa-pause fa-2x'></i>";
  }
}

function updateProgress() {
  console.log(video.currentTime);
  progress.value = (video.currentTime / video.duration) * 100;

  //get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  console.log("🚀 ~ updateProgress ~ secs:", secs);
  console.log("🚀 ~ updateProgress ~ mins:", mins);
  timestamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop video
function stopVideo() {
  //   video.stop();
  video.currentTime = 0;
  video.pause();
}

//Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
