import usbDetect from "usb-detection";
import fs from "fs";
import path from "path";

// Function to list files and folders in a directory
const listFilesAndFolders = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const items = files.map((file) => path.join(directoryPath, file));
        resolve(items);
      }
    });
  });
};

// Function to access files and folders on a connected mobile device
const accessMobileDeviceFiles = (deviceName) => {
  return new Promise((resolve, reject) => {
    // Specify the path to the mounted device, you may need to adjust this based on your device's mount point
    const devicePath = `E:/`; // Replace 'D:' with the appropriate drive letter

    // List files and folders in the specified path
    listFilesAndFolders(devicePath)
      .then((items) => {
        resolve(items);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Example usage:
usbDetect.startMonitoring();

usbDetect.on("add", async (device) => {
  if (device.deviceName && device.deviceName.includes("YourDeviceName")) {
    try {
      const deviceFilesAndFolders = await accessMobileDeviceFiles(
        device.deviceName
      );

      console.log(
        `Files and folders on device ${device.deviceName}:`,
        deviceFilesAndFolders
      );
    } catch (error) {
      console.error("Error accessing device files:", error);
    }
  }
});

// usbDetect.on("remove", (device) => {
//   console.log(`Device removed: ${device.deviceName}`);
// });

// // Handle Ctrl+C to stop monitoring gracefully
// process.on("SIGINT", () => {
//   usbDetect.stopMonitoring();
//   process.exit();
// });
