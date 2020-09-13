function ffmpegConvert(inputPath, destinationFormat, outputFormat) {
  const { name } = path.parse(inputPath);
  const des = path.join(outputFormat, name + "." + destinationFormat);

  //Spwan Child Process and Notify When Done
  const processAud = spawn(`${ffmpegPath}`, [`-i`, `${inputPath}`, `${des}`]);
  processAud.on("close", code => {
    console.log(`child process exited with code ${code}`);
    return code;
  });
}

const fillFFmpegOptions = inputFormat => {
  const filteredFormats = AUDIO_VIDEO_FORMATS.filter(element => !inputFormat.includes(element));

  const length = destFormatDropdown.options.length;
  for (let i = length - 1; i >= 0; i--) {
    destFormatDropdown.options[i] = null;
  }

  for (let i = 0; i < filteredFormats.length; i++) {
    const opt = document.createElement("option");
    opt.value = filteredFormats[i];
    opt.innerHTML = filteredFormats[i];
    destFormatDropdown.appendChild(opt);
  }
};
