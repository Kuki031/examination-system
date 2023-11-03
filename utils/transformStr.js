'use strict';

module.exports = function (string) {
    string = string.trim();
    if (string.split(" ").length > 1) {
        let wordsMap = string.split(" ");
        let map = wordsMap.map(el => el.toLowerCase());
        let t = map.map(el => el.replace(el[0], el[0].toUpperCase())).join(" ");
        return t;
    }
    let firstLetter = string.split("")[0];
    let map = string.split("").map(el => el.toLowerCase()).join("");
    let output = map.replace(map[0], firstLetter.toUpperCase());
    return output;
}
