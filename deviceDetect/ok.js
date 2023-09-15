import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
const port = 3000; // You can change the port number if needed
const mobileDriveLetter = "D:/"; // Change this to the drive letter of your mobile device

const mobileFolderPath = path.join(mobileDriveLetter);

// Serve static files from the mobile device
app.use(express.static(mobileFolderPath));

// Define a route to list the files on the mobile device
app.get("/list-files", async (req, res) => {
  try {
    // Read the files in the mobile folder
    const files = await fs.readdir(mobileFolderPath);
    // Return the list of files as a JSON response
    res.json(files);
  } catch (err) {
    console.log(err);

    res.status(500).send("Error reading files on the mobile device");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
