function sortManualArray(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
    }
  }
  return array;
}

function sortString(str) {
  str = str.split("");
  str = sortManualArray(str);
  str = str.join("");
  return str;
}

function anagrams(words) {
  const anagramObject = {};
  const output = [];
  words.forEach((word) => {
    const sortedWord = sortString(word);
    if (!anagramObject[sortedWord]) {
      anagramObject[sortedWord] = [];
    }
    anagramObject[sortedWord].push(word);
  });
  for (const key in anagramObject) {
    output.push(anagramObject[key]);
  }
  return output;
}

console.log(anagrams(["kita", "atik", "tika", "aku", "kia", "makan", "kua"]));
console.log(
  anagrams(["kita", "atik", "tika", "aku", "kia", "makan", "kua", "auk"])
);
