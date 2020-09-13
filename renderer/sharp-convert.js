var sharp = require("sharp");
var path = require("path");

var sharpConvert = (input_path, destinationFormat, outputDirectory) => {
  const { name } = path.parse(input_path);
  return sharp(input_path).toFile(path.join(outputDirectory, name + "." + destinationFormat));
};

const fillSharpOptions = input_format => {
  // handle jpeg and jpg format
  if (input_format === "jpg" || input_format == "jpeg") {
    input_format = ["jpeg", "jpg"];
  }

  // convert to array
  if (!Array.isArray(input_format)) input_format = [input_format];

  var filtered_formats = IMAGE_FORMATS.filter(element => !input_format.includes(element));

  // Clear all options first
  var length = destFormatDropdown.options.length;
  for (i = length - 1; i >= 0; i--) {
    destFormatDropdown.options[i] = null;
  }

  for (var i = 0; i < filtered_formats.length; i++) {
    var opt = document.createElement("option");
    opt.value = filtered_formats[i];
    opt.innerHTML = filtered_formats[i];
    destFormatDropdown.appendChild(opt);
  }
};

const getCommonFileExtension = files => {
  if (!files || files.length === 0) return false;

  var ext = path.extname(files[0]);
  for (var i = 1; i < files.length; i++) {
    if (path.extname(files[i]) !== ext) return false;
  }

  return ext.toLowerCase().split(".")[1];
};
