const { dialog } = require("electron").remote;

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
      { name: "Audio", extensions: ["mp3", "pcm", "wav"] },
      { name: "Video", extensions: ["mkv", "avi", "mp4", "wmv", "webm"] },
      { name: "Images", extensions: ["jpg", "png", "jpeg", "webp", "tiff", "bmp"] },
      { name: "All Files", extensions: ["*"] },
    ],
    properties: ["openFile", "multiSelections"],
  });

  // If no files have been selected, return
  if (!selectedFiles) {
    console.log("No files selected.");
    return;
  }

  console.log(selectedFiles);
  selectedFiles.forEach(filePath => filePaths.add(filePath));
  showFiles();
};

[filePickerDiv, addMoreBtn].forEach(elem => elem.addEventListener("click", addFiles));
