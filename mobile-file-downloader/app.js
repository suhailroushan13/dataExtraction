const adb = require('adbkit');
const fs = require('fs');

const client = adb.createClient();

// Replace with the path to the directory where you want to save the downloaded files
const downloadDirectory = './downloads';

// Replace with the filename you want to download
const filenameOnDevice = '/';

client.listDevices()
  .then((devices) => {
    if (devices.length === 0) {
      console.error('No connected devices found.');
      return;
    }

      const device = devices[0]; // Assuming there is one device connected
      console.log(device)

    // Create the download directory if it doesn't exist
    if (!fs.existsSync(downloadDirectory)) {
      fs.mkdirSync(downloadDirectory);
    }

    // Start the file download
    client.pull(device.id, filenameOnDevice)
      .then((transfer) => {
        return new Promise((resolve, reject) => {
          transfer.pipe(fs.createWriteStream(`${downloadDirectory}/${transfer.name}`));
          transfer.on('end', resolve);
          transfer.on('error', reject);
        });
      })
      .then(() => {
        console.log(`File downloaded to ${downloadDirectory}/${transfer.name}`);
      })
      .catch((err) => {
        console.error('Error downloading file:', err);
      });
  })
  .catch((err) => {
    console.error('Error connecting to ADB:', err);
  });
