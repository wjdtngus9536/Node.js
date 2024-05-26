const fs = require('fs');
fs.readFile('../../../password.json', 'utf8', (err, jsonString) => {
    if (err) {
      console.error('Error reading JSON file:', err);
    } else {
      try {
        const data = JSON.parse(jsonString);
        const password = data[0].password
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    }
  });