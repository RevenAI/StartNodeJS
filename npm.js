const fs = require('fs');
const path = require('path');

const proFileDir = path.join(__dirname, '../../../NodeJS/Documentation/NpmLesson/modules');
/* if (fs.existsSync(proFileDir)){
    console.log(proFileDir);
} else {
    console.error('Dir doesn\'t exist.');
} */
 
 /*    
 if (!fs.existsSync(proFileDir)) {
    fs.mkdir(proFileDir, (err) => {
        if (err) {
            console.error('Failure to create modules directory:', err); 
        } else {
            console.log('Modules directory created successfully.'); 
        }
    });
} else {
    console.log('Modules directory already exists.');
} 
 */

/* if (!fs.existsSync(proFileDir)) {
    fs.rmdir(proFileDir, (err) => {
        if (err) {
            console.error('Failure to delete modules directory:', err); 
        } else {
            console.log('Modules directory deleted successfully.'); 
        }
    });
} else {
    console.log('Modules directory already deleted.');
} */

     if (fs.existsSync(proFileDir)) {
        fs.rm(proFileDir, { recursive: true, force: true }, (err) => {
            if (err) {
                console.error('Failure to delete modules directory:', err); 
            } else {
                console.log('Modules directory deleted successfully.'); 
            }
        });
    } else {
        console.log('Modules directory already deleted.');
    }
     
    