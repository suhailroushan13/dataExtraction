// import diskinfo from "node-disk-info";

// const getDriveList = () => {
//   try {
//     const drives = diskinfo.getDiskInfoSync();
//     const driveList = drives.map((drive) => ({
//       device: drive.mounted,
//       driveLetter: drive.filesystem,
//     }));
//     return driveList;
//   } catch (error) {
//     console.error("Error getting drive list:", error.message);
//     return [];
//   }
// };

// // Example usage:
// const driveList = getDriveList();
// console.log("Drive List:", driveList);
// // import usbDetect from "usb-detection";

// // const getRemovableDiskNames = () => {
// //   usbDetect.startMonitoring();

// //   return new Promise((resolve, reject) => {
// //     usbDetect.find((err, devices) => {
// //       if (err) {
// //         usbDetect.stopMonitoring();
// //         reject(err);
// //       } else {
// //         const removableDisks = devices.filter(
// //           (device) =>
// //             device.deviceName && device.deviceName.includes("USB Disk")
// //         );

// //         const diskNames = removableDisks.map((disk) => disk.deviceName);

// //         usbDetect.stopMonitoring();
// //         resolve(diskNames);
// //       }
// //     });
// //   });
// // };

// // // Example usage:
// // getRemovableDiskNames()
// //   .then((diskNames) => {
// //     console.log("Removable Disk Names:", diskNames);
// //   })
// //   .catch((error) => {
// //     console.error("Error:", error);
// //   });

import usbDetect from "usb-detection";
import diskinfo from "node-disk-info";

const getDriveList = () => {
  try {
    const drives = diskinfo.getDiskInfoSync();
    const driveList = drives.map((drive) => ({
      device: drive.mounted,
      driveLetter: drive.filesystem,
    }));
    return driveList;
  } catch (error) {
    console.error("Error getting drive list:", error.message);
    return [];
  }
};

const getConnectedDevices = () => {
  return new Promise((resolve, reject) => {
    usbDetect.find((err, devices) => {
      if (err) {
        reject(err);
      } else {
        resolve(devices);
      }
    });
  });
};

// Example usage:
Promise.all([getDriveList(), getConnectedDevices()])
  .then(([driveList, connectedDevices]) => {
    console.log("Drive List:", driveList);
    console.log("Connected Devices:", connectedDevices);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
