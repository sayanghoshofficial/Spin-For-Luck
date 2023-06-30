const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const maxScore = document.getElementById("max-score");
const scoreBoard = document.getElementById("score-board");

let valueArray = [];

//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 20 },
  { minDegree: 31, maxDegree: 90, value: 10 },
  { minDegree: 91, maxDegree: 150, value: 60 },
  { minDegree: 151, maxDegree: 210, value: 50 },
  { minDegree: 211, maxDegree: 270, value: 40 },
  { minDegree: 271, maxDegree: 330, value: 30 },
  { minDegree: 331, maxDegree: 360, value: 20 },
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

//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: [10, 20, 30, 40, 50, 60],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    // if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      valueArray.push(i.value); // Add the new value to the array
      spinBtn.disabled = false;
      spinBtn.innerHTML = `<img id="spin-btn" class="try-again" src="./icon/refresh-button.png" alt="try-again"/>`;
      maxScore.innerHTML = `${Math.max(...valueArray)}`;
      finalValue.innerHTML = `<p>Value: ${i.value}</p> `;
      console.log(valueArray);
      console.log(Math.max(...valueArray));
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});


function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  
    scoreBoard.innerHTML = ""; // Clear existing content in the scoreBoard element
  
    valueArray.forEach((score, index) => {
      const listItem = document.createElement("li");
      const ordinalNumber = getOrdinalNumber(index + 1);
      listItem.textContent = `${ordinalNumber} score: ${score}`;
      scoreBoard.appendChild(listItem);
    });
  }
  
  // Function to get ordinal number suffix
  function getOrdinalNumber(number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;
    const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    return `${number}${suffix}`;
  }
  
  