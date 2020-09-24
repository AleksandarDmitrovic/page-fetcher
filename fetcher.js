const { argv, rawListeners } = require('process');
const request  = require('request');
const fs       = require('fs');
const readline       = require('readline');
// const readline = require('linebyline');

const userInput = argv.slice(2);
const url = userInput[0]
const localDownloadPath = userInput[1]


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetchAndWrite = function() {
  request(url , (error, response, body) => {
    // console.log('error, response :', error, response);
      
      if(error || response.statusCode !== 200) {
         return console.log("Error: Webpage does not exist");
      }
      if (fs.existsSync(localDownloadPath)) {
        rl.question("File already exists do you want to overwrite? (y + enter to ) ", (answer) => {
          if (answer === 'y') {
            console.log('Now I will overwrite the file')
            writingFile(body);
          }
          rl.close();
          
        });
      } else {
        writingFile(body);
  
      }
    });   
};

const writingFile = function(body) {
  fs.writeFile(localDownloadPath, body, (err) => {
          
    if (err) {
      return console.log("Error: File path does not exist")
    }
    // console.log(body.length);
    fs.stat(localDownloadPath, (err, fileStats) => {
      if(err) throw err;
      
      const fileBytes = fileStats.size;
      console.log(`Downloaded and saved ${fileBytes} bytes to ${localDownloadPath}`)
    });
  });
};

if (url && localDownloadPath) {
  fetchAndWrite();

} else {
  console.log('url or file path not found');
  process.exit();

}

// if (url && localDownloadPath) {
//   request(url , (error, response, body) => {
//   // console.log('error, response :', error, response);
    
//     if(error || response.statusCode !== 200) {
//        return console.log("Error: Webpage does not exist");
//     }
//     if (fs.existsSync(localDownloadPath)) {
//       rl.question("File already exists do you want to overwrite? (y + enter to ) ", (answer) => {
//         if (answer === 'y') {
//           console.log('now i need to write file')
//         }
//         rl.close();
        
//       });
//     } else {
//       fs.writeFile(localDownloadPath, body, (err) => {
        
//         if (err) {
//           return console.log("Error: File path does not exist")
//         }
//         // console.log(body.length);
//         fs.stat(localDownloadPath, (err, fileStats) => {
//           if(err) throw err;
          
//           const fileBytes = fileStats.size;
//           console.log(`Downloaded and saved ${fileBytes} bytes to ${localDownloadPath}`)
//         });
//       });

//     }
//   });  
// } else {
//   console.log('url or file path not found')
// }