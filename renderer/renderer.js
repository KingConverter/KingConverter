// const { fillOptions } = require("./convert");

const { dialog } = require("electron").remote;

const [filePickerDiv, convertButton, destFormatDropdown] = [
  "file-picker",
  "convert-button",
  "dest-format-button",
].map(id => document.getElementById(id));

var filePaths, destinationFormat;

filePickerDiv.addEventListener("click", e => {
  // Open file selector dialog
  filePaths = dialog.showOpenDialogSync({
    title: "Select files to convert",
    properties: ["openFile", "multiSelections"],
  });

  var input_extension = getCommonFileExtension(filePaths);
  console.log(filePaths);
  console.log(input_extension);
  if (input_extension) {
    console.log(filePaths);
    fillOptions(input_extension);
    convertButton.disabled = false;
  } else if (!filePaths || filePaths.length === 0) {
    console.log("No files selected.");
    return;
  } else if (!input_extension) {
    // all extensions are not the same
    // TODO: Show error to user with message:
    // "Please add files with same format"
  }
});

destFormatDropdown.addEventListener("click", e => {
  destinationFormat = destFormatDropdown.options[destFormatDropdown.selectedIndex].value;
});

convertButton.addEventListener("click", e => {
  // default value
  if (!destinationFormat) destinationFormat = destFormatDropdown.options[0].value;

  for (var i = 0; i < filePaths.length; i++) {
    convert(filePaths[i], destinationFormat);
  }

  filePaths = undefined;
  convertButton.disabled = true;
});
