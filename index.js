/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

console.log("---------------------------");
console.log("URL -> QR Code Generator");
console.log("---------------------------");

inquirer
    .prompt([
        /* Pass your questions in here */
        {
            type: "input",
            name: "url",
            message: "Enter your URL:",
        },
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        generateQRCode(answers.url);
        fs.writeFileSync("URL.txt", answers.url);
    })
    .catch((error) => {
        console.log(error);
    });

function generateQRCode(url) {
    const qr_png = qr.image(url, { type: "png", parse_url: true });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));
}
