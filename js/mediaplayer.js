document.addEventListener("DOMContentLoaded", function(){ initializeMediaPlayer(); }, false);

var mediaPlayer;

function initializeMediaPlayer(){
  mediaPlayer = document.getElementById('media-video');
	$("#media-player").hide();
  mediaPlayer.controls = false;
}

function togglePlayPause() {
   var btn = document.getElementById('play-pause-button');
	 var seconds = document.getElementById("play-duration-seconds");
   if (mediaPlayer.paused || mediaPlayer.ended) {
      btn.title = 'pause';
      btn.innerHTML = 'pause';
      btn.className = 'pause';
			// mediaPlayer.duration();
      mediaPlayer.play();
   }
   else {
      btn.title = 'play';
      btn.innerHTML = 'play';
      btn.className = 'play';
      mediaPlayer.pause();
   }
}

function changeButtonType(btn, value) {
   btn.title = value;
   btn.innerHTML = value;
   btn.className = value;
}

function changeVolume(direction) {
   if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
   else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
   mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}
function replayMedia() {
   resetPlayer();
   mediaPlayer.play();
}
function resetPlayer() {
   mediaPlayer.currentTime = 0;
   changeButtonType(playPauseBtn, 'play');
}
mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);

function updateProgressBar() {
   var progressBar = document.getElementById('progress-bar');
   var percentage = Math.floor((100 / mediaPlayer.duration) *
   mediaPlayer.currentTime);
   progressBar.value = percentage;
   progressBar.innerHTML = percentage + '% played';
}
function canPlayVideo(ext) {
   var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
   if (ableToPlay == '') return false;
   else return true;
}
function loadVideo() {
	$("#media-player").show();
	console.log("about to hit for loop: "+arguments.length);
   for (var i = 0; i < arguments.length; i++) {
      // var file = arguments[i].split('.');
      // var ext = file[file.length - 1];
      // if (canPlayVideo(ext)) {
				console.log("LOAD VIDEO:");
         // resetPlayer();
         mediaPlayer.src = "http://"+arguments[i];
				 console.log(mediaPlayer.src);
				 $("#media-source").attr('src', "http://"+arguments[i]);
				 mediaPlayer.load();
				 
         // break;
      // }
   }
}



mediaPlayer.addEventListener('play', function() {
   var btn = document.getElementById('play-pause-button');
   changeButtonType(btn, 'pause');
}, false);

mediaPlayer.addEventListener('pause', function() {
   var btn = document.getElementById('play-pause-button');
   changeButtonType(btn, play);
}, false);

mediaPlayer.addEventListener('volumechange', function(e) {
   var btn = document.getElementById('mute-button');
   if (mediaPlayer.muted) changeButtonType(btn, 'unmute');
   else changeButtonType(btn, 'mute');
}, false);