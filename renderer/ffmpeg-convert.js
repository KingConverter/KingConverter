const ffmpegPath = require("ffmpeg-static-electron").path;
const { spawn } = require("child_process");
var path = require("path");

const AUDIO_VIDEO_FORMATS = [
  "pcm",
  "opus",
  "wav",
  "mp3",
  "ogg",
  "aac",
  "aiff",
  "au",
  "flac",
  "mkv",
  "avi",
  "mp4",
  "wmv",
  "webm",
  "mov",
];

function ffmpegAudioConvert(inputPath, destinationFormat) {
  var { dir, name } = path.parse(inputPath);
  var des = path.join(dir, name + "." + destinationFormat);
  //Spwan Child Process and Notify When Done
  const processAud = spawn(`${ffmpegPath}`, [`-i`, `${inputPath}`, `${des}`]);
  processAud.on("close", code => {
    console.log(`child process exited with code ${code}`);
    if (code) console.log("ERROR");
  });
}

const fillAudioOptions = inputFormat => {
  var filteredFormats = AUDIO_VIDEO_FORMATS.filter(element => !inputFormat.includes(element));

  var length = dropdown.options.length;
  for (i = length - 1; i >= 0; i--) {
    dropdown.options[i] = null;
  }

  for (var i = 0; i < filteredFormats.length; i++) {
    var opt = document.createElement("option");
    opt.value = filteredFormats[i];
    opt.innerHTML = filteredFormats[i];
    dropdown.appendChild(opt);
  }
  dropdown.disabled = false;
};
