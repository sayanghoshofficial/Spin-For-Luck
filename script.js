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

  //Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
      //Labels(values which are to be displayed on chart)
      labels: [1, 2, 3, 4, 5, 6],
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
      //   maxScore.innerHTML = `${Math.max(...valueArray)}`;
        finalValue.innerHTML = `<p>Value: ${
          i.value
        }</p> <p>Max Score : ${Math.max(...valueArray)}</p>`;
        console.log(valueArray);
        console.log(Math.max(...valueArray));
        break;
      }
    }
  };