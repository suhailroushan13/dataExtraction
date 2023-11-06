import { exec } from "child_process";

const pullCommand = "adb -s 192.168.0.247:5555 pull /sdcard/Movies ./local_sdcard/";




try {
  exec(pullCommand, (error, stdout, stderr) => {
    if (error) {
      throw new Error(`exec error: ${error}`);
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
} catch (err) {
  console.error(`Error executing command: ${err.message}`);
}
