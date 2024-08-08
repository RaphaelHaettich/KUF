const fs = require('fs');
const path = require('path');

// Define a function to modify the file
function modifyFile(filePath) {
    // Read the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        if (!data.includes("throw new Error('The Url is an unknown URL. Expect localhost or .admin.ch');")) {           
            console.error('The file is not the expected one' + filePath);
        }else{
            console.log('The file is the expected one' + filePath);
        }

        // Modify the file content
        const modifiedData = data.replace("throw new Error('The Url is an unknown URL. Expect localhost or .admin.ch');", 'return window.location.hostname;');

        // Write the modified content back to the file
        fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing the modified file:', err);
                return;
            }
            console.log('File modified successfully');
        });
    });
}

//"C:\Projects\glauxgroup.edi.esubventionen\Src\820_GlauxGroup.EDI.eSubventionen.Portal\node_modules\@oblique\oblique\esm2022\lib\service-navigation\timeout\service-navigation-timeout-cookie.service.mjs"
const filePath = path.join(__dirname, '..', 'node_modules', '@oblique\\oblique\\esm2022\\lib\\service-navigation\\timeout\\service-navigation-timeout-cookie.service.mjs');
const filePath1 = path.join(__dirname, '..', 'node_modules', '@oblique\\oblique\\fesm2022\\oblique.mjs');
const filePath2 = path.join(__dirname, '..', 'node_modules', '@oblique\\oblique\\fesm2022\\oblique.mjs.map');

// Call the function with the file path
modifyFile(filePath);
modifyFile(filePath1);
modifyFile(filePath2);