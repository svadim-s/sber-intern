import {encoded, translations} from './data.js'

console.log("Let's rock")
// console.log(encoded, translations)

function decodedProperty(encoded, translations) {
  const uniqueIdList = new Set();

  for (let item = 0; item < encoded.length; item++) {
    for (const [key, val] of Object.entries(encoded[item])) {
      if (key.toLowerCase().includes("id") && key !== "groupId") {
        if (Object.keys(translations).includes(val)) {
          encoded[item][key] = translations[val];
        } else if (encoded[item][key] !== null) {
          uniqueIdList.add(val);
        }
      }
    }
  }

  return [encoded, uniqueIdList];
}

const decoded = decodedProperty(encoded, translations)

console.log(decoded)
