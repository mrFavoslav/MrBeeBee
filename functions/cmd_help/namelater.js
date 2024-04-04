const fs = require('fs')
const path = require('path')

function sortList(diratr) {
  const dir = diratr;
  const files = fs.readdirSync(dir);
  const list = [];

  files.forEach(file => {
    try {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        return console.log("[Function sortList] Stat is dir. Skipping...");
      } else {
          const info = require(filePath);

          const name = info.name /*!== undefined ? info.name : return*/;
          const showName = info.showName;
          const description = info.description;
          const legend = info.legend && info.legend.length > 0 ? info.legend.join("\r\n") : undefined;
  
          list.push({ name: name, showName: showName, description: description, legend: legend });
      }
    } catch (err) {
      // console.error(`Error processing file: ${file}`);
      // console.error(err);
      return err;
      //return sortList;
    }
  });

  // Create an array to store the sorted lists
  const sortedLists = [];

  // Define the number of objects in each segment
  const maxObjectsInFirstSegment = 4;
  const objectsInMiddleSegments = 3;
  const objectsInLastSegment = 4;

  // Start with the first segment
  let currentIndex = 0;

  // Process the first segment
  sortedLists.push(
    list.slice(currentIndex, currentIndex + maxObjectsInFirstSegment)
  );
  currentIndex += maxObjectsInFirstSegment;

  // Process the middle segments
  while (currentIndex < list.length - objectsInLastSegment) {
    sortedLists.push(list.slice(currentIndex, currentIndex + objectsInMiddleSegments));
    currentIndex += objectsInMiddleSegments;
  }

  // Process the last segment
  sortedLists.push(list.slice(currentIndex, currentIndex + objectsInLastSegment));
  return sortedLists;
}

module.exports = sortList;
