import express from "express";
import fs from "fs-extra";
import path from "path";
import detection from "usb-detection";

const app = express();
const PORT = 3000;
let connectedDevices = [];

// Detect when a device is added
detection.on("add", (device) => {
  console.log("Device added:", device);
  connectedDevices.push(device);
});

// Detect when a device is removed
detection.on("remove", (device) => {
  console.log("Device removed:", device);
  connectedDevices = connectedDevices.filter(
    (d) => d.deviceName !== device.deviceName
  );
});

console.log(connectedDevices);

app.get("/files/*", async (req, res) => {
  let folderPath = req.params[0] || ".";
  try {
    const fullPath = path.join(__dirname, folderPath);
    const files = await fs.readdir(fullPath);

    let items = await Promise.all(
      files.map(async (file) => {
        let filePath = path.join(fullPath, file);
        let stats = await fs.stat(filePath);
        return {
          name: file,
          type: stats.isDirectory() ? "directory" : "file",
        };
      })
    );

    res.json(items);
  } catch (err) {
    res.status(500).send("Error reading directory");
  }
});

// Endpoint to get connected devices
app.get("/devices", (req, res) => {
  res.json(connectedDevices);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
