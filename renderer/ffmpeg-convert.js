const ffmpegPath = require("ffmpeg-static-electron").path;
const { spawn } = require("child_process");
var path = require("path");

function ffmpegConvert(inputPath, destinationFormat, outputFormat) {
  var { name } = path.parse(inputPath);
  var des = path.join(outputFormat, name + "." + destinationFormat);

  //Spwan Child Process and Notify When Done
  const processAud = spawn(`${ffmpegPath}`, [`-i`, `${inputPath}`, `${des}`]);
  processAud.on("close", code => {
    console.log(`child process exited with code ${code}`);
    return code;
  });
}

const fillFFmpegOptions = inputFormat => {
  var filteredFormats = AUDIO_VIDEO_FORMATS.filter(element => !inputFormat.includes(element));

  var length = destFormatDropdown.options.length;
  for (i = length - 1; i >= 0; i--) {
    destFormatDropdown.options[i] = null;
  }

  for (var i = 0; i < filteredFormats.length; i++) {
    var opt = document.createElement("option");
    opt.value = filteredFormats[i];
    opt.innerHTML = filteredFormats[i];
    destFormatDropdown.appendChild(opt);
  }
};
