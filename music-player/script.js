const musicContainer = document.getElementById("music-container"),
  playBtn = document.getElementById("play"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  audio = document.getElementById("audio"),
  progress = document.getElementById("progress"),
  progressContainer = document.getElementById("progress-container"),
  title = document.getElementById("title"),
  cover = document.getElementById("cover"),
  songs = ["hey", "summer", "ukulele"];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  console.log("🚀 ~ updateProgress ~ e.srcElement:", e.srcElement);
  console.log("🚀 ~ updateProgress ~  currentTime:", currentTime);
  console.log("🚀 ~ updateProgress ~ duration:", duration);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  console.log(e.srcElement);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
  console.log(width);
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);

//Click on progress bar
progressContainer.addEventListener("click", setProgress);

//Song ends
audio.addEventListener("ended", nextSong);
