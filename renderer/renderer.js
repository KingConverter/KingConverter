const { dialog } = require("electron").remote;

const filePickerDiv = document.getElementById("file-picker");

filePickerDiv.addEventListener("click", e => {
  // Open file selector dialog
  filePaths = dialog.showOpenDialogSync({
    title: "Select files to convert",
    properties: ["openFile", "multiSelections"],
  });

  // If no files have been selected, return
  if (!filePaths) {
    console.log("No files selected.");
    return;
  }

  console.log(filePaths);
});
