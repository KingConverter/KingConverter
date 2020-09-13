const openDirectory = dirPath => {
  let command;
  if (process.platform === "darwin") command = `open -R ${dirPath}`;
  else if (process.platform === "win32")
    command = `${
      process.env.SystemRoot ? path.join(process.env.SystemRoot, "explorer.exe") : "explorer.exe"
    } ${dirPath}`;
  else command = `xdg-open ${path.dirname(dirPath)}`;
  exec(command);
};
