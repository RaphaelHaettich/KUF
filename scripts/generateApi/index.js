const fs = require('fs');
const http = require('http');
const https = require('https');
const {exec} = require('child_process');

function downloadFile(url, outputPath) {
    const protocol = url.startsWith('https') ? https : http;

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);

        const options = {
            rejectUnauthorized: false,
        };
        const request = protocol.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                reject(`Failed to download file. Status code: ${response.statusCode}`);
                return;
            }

            response.pipe(file);

            response.on('end', () => {
                file.close();
                resolve();
            });

            response.on('error', (err) => {
                fs.unlink(outputPath, () => {});
                reject(err);
            });
        });

        request.on('error', (err) => {
            reject(err);
        });
    });
}


const fileUrl = 'http://localhost:8282/swagger/docs/V1';
const outputPath = 'scripts/generateApi/schema.json';

downloadFile(fileUrl, outputPath)
    .then(() => {
        console.log('File downloaded successfully!');
        exec('npm run orval', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing orval: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`orval command stderr: ${stderr}`);
                return;
            }
            console.log(`orval command stdout: ${stdout}`);
        });
    })
    .catch((err) => {
        console.error('Error downloading file:', err);
    });
