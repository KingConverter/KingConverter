const sharpConvert = (input_path, destinationFormat, outputDirectory) => {
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

  const filtered_formats = IMAGE_FORMATS.filter(element => !input_format.includes(element));

  // Clear all options first
  const length = destFormatDropdown.options.length;
  for (let i = length - 1; i >= 0; i--) {
    destFormatDropdown.options[i] = null;
  }

  for (let i = 0; i < filtered_formats.length; i++) {
    const opt = document.createElement("option");
    opt.value = filtered_formats[i];
    opt.innerHTML = filtered_formats[i];
    destFormatDropdown.appendChild(opt);
  }
};

const getCommonFileExtension = files => {
  if (!files || files.length === 0) return false;

  const ext = path.extname(files[0]);
  for (let i = 1; i < files.length; i++) {
    if (path.extname(files[i]) !== ext) return false;
  }

  return ext.toLowerCase().split(".")[1];
};
