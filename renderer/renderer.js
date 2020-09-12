const { dialog } = require("electron").remote;

const [convertButton, destFormatDropdown] = ["convert-files-btn", "dest-format-dropdown"].map(id =>
  document.getElementById(id)
);

var destinationFormat;

// Get elements by id
const [filePickerDiv, filesModal, selectedFilesDiv, addMoreBtn] = [
  "file-picker",
  "file-modal",
  "selected-files",
  "add-more-files-btn",
].map(id => document.getElementById(id));

const filePaths = new Set();

const showFiles = () => {
  if (!filePaths) {
    filePickerDiv.classList.remove("hidden");
    filesModal.classList.add("hidden");
    return;
  }

  // Add file paths to the selected file div
  selectedFilesDiv.innerHTML = [...filePaths].map(path => `<div>${path}</div>`).join("");

  filesModal.do = filePickerDiv.classList.add("hidden");
  filesModal.classList.remove("hidden");
};

const addFiles = e => {
  // Open file selector dialog
  const selectedFiles = dialog.showOpenDialogSync({
    title: "Select files to convert",
    filters: [
      { name: "Images", extensions: ["jpg", "png", "jpeg", "webp", "tiff", "bmp"] },
      { name: "Audio", extensions: ["mp3", "wav", "ogg", "pcm"] },
      { name: "Video", extensions: ["mkv", "avi", "mp4", "wmv", "webm", "mov"] },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: ["openFile", "multiSelections"],
  });

  var input_extension = getCommonFileExtension(selectedFiles);
  console.log(selectedFiles);
  console.log(input_extension);
  if (IMAGE_FORMATS.includes(input_extension.toLowerCase().slice(1, input_extension.length))) {
    fillOptions(input_extension.split(".")[1]);
    convertButton.disabled = false;
  } else if (
    AUDIO_VIDEO_FORMATS.includes(input_extension.toLowerCase().slice(1, input_extension.length))
  ) {
    fillAudioOptions(input_extension.split(".")[1]);
    convertButton.disabled = false;
  } else if (!selectedFiles || selectedFiles.length === 0) {
    console.log("No files selected.");
    return;
  } else if (!input_extension) {
    // all extensions are not the same
    // TODO: Show error to user with message:
    // "Please add files with same format"
  }

  console.log(selectedFiles);
  selectedFiles.forEach(filePath => filePaths.add(filePath));
  showFiles();
};

destFormatDropdown.addEventListener("click", e => {
  destinationFormat = destFormatDropdown.options[destFormatDropdown.selectedIndex].value;
});

convertButton.addEventListener("click", e => {
  // default value
  if (!destinationFormat) destinationFormat = destFormatDropdown.options[0].value;
  if (IMAGE_FORMATS.includes(destinationFormat))
    filePaths.forEach(fP => sharpConvert(fP, destinationFormat));
  if (AUDIO_VIDEO_FORMATS.includes(destinationFormat))
    filePaths.forEach(fP => ffmpegAudioConvert(fP, destinationFormat));
});

[filePickerDiv, addMoreBtn].forEach(elem => elem.addEventListener("click", addFiles));
