import fs from "fs/promises";
import path from "path";
import drivelist from "drivelist";
import mtp from "node-mtp";

async function listUSBContents() {
  try {
    // Initialize MTP (Media Transfer Protocol).
    const mtpDevice = new mtp.Device();

    // Connect to MTP devices.
    await mtpDevice.connect();

    // Get a list of available drives, including USB drives.
    const drives = await drivelist.list();

    // Find the USB drive, assuming it's the first one in the list.
    const usbDrive = drives.find((drive) => drive.isUSB);

    if (!usbDrive) {
      throw new Error("No USB drive found.");
    }

    let usbName = usbDrive.description;

    // Get the drive letter (e.g., 'D:') for the USB drive.
    const driveLetter = usbDrive.mountpoints[0].path;

    // List all folders and files on the USB drive.
    const usbContents = await fs.readdir(driveLetter);

    // Log the list of folders and files.
    if (usbName) {
      console.log("Detected USB Device:", usbName);
    }

    console.log("Folders and files on USB drive:");
    for (const item of usbContents) {
      const itemPath = path.join(driveLetter, item);
      const stat = await fs.stat(itemPath);
      const isDirectory = stat.isDirectory();
      console.log(`${isDirectory ? "Folder" : "File"}: ${item}`);
    }

    // Close the MTP connection.
    await mtpDevice.close();
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Call the function to list USB contents.
listUSBContents();
