const os = require("os");
const path = require("path");
const { exec, spawn } = require("child_process");

const sharp = require("sharp");
const { dialog } = require("electron").remote;
const ffmpegPath = require("ffmpeg-static-electron").path.replace("app.asar", "app.asar.unpacked");

const ALL_FORMATS = [
  "jpg",
  "png",
  "jpeg",
  "webp",
  "tiff",
  "bmp",
  "pcm",
  "opus",
  "wav",
  "mp3",
  "ogg",
  "aac",
  "aiff",
  "au",
  "flac",
  "mkv",
  "avi",
  "mp4",
  "wmv",
  "webm",
  "mov",
];

const AUDIO_VIDEO_FORMATS = [
  "pcm",
  "opus",
  "wav",
  "mp3",
  "ogg",
  "aac",
  "aiff",
  "au",
  "flac",
  "mkv",
  "avi",
  "mp4",
  "wmv",
  "webm",
  "mov",
];

const IMAGE_FORMATS = ["png", "jpg", "jpeg", "tiff", "webp", "bmp"];
