var sharp = require("sharp");
var path = require("path");

const IMAGE_FORMATS = ["png", "jpg", "jpeg", "tiff", "webp", "bmp"];

var sharpConvert = (input_path, destination_format) => {
  var { dir, name } = path.parse(input_path);
  sharp(input_path).toFile(path.join(dir, name + "." + destination_format));
};

var dropdown = document.getElementById("dest-format-dropdown");
const fillOptions = input_format => {
  // handle jpeg and jpg format
  if (input_format === "jpg" || input_format == "jpeg") {
    input_format = ["jpeg", "jpg"];
  }

  // convert to array
  if (!Array.isArray(input_format)) input_format = [input_format];

  var filtered_formats = IMAGE_FORMATS.filter(element => !input_format.includes(element));

  // Clear all options first
  var length = dropdown.options.length;
  for (i = length - 1; i >= 0; i--) {
    dropdown.options[i] = null;
  }

  for (var i = 0; i < filtered_formats.length; i++) {
    var opt = document.createElement("option");
    opt.value = filtered_formats[i];
    opt.innerHTML = filtered_formats[i];
    dropdown.appendChild(opt);
  }
  dropdown.disabled = false;
};

const getCommonFileExtension = filePaths => {
  if (!filePaths || filePaths.length === 0) return false;

  var ext = path.extname(filePaths[0]);
  for (var i = 1; i < filePaths.length; i++) {
    if (path.extname(filePaths[i]) !== ext) return false;
  }

  console.log(ext);
  return ext;
};
