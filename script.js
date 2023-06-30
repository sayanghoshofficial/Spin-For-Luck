const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const maxScore = document.getElementById("max-score");

let valueArray = [];

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },
  ];

  //Size of each piece
const data = [16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = [
    "#0039a6",
    "#13274F",
    "#3457D5",
    "#002D62",
    "#2a52be",
    "#041E42",
  ];