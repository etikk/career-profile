import classes from "./Linechart.module.css";
import { useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { de } from "date-fns/locale";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "erkki.tikk levels gained by type and month",
    },
  },
  scales: {
    y: {
      title: { display: true, text: "Level" },
    },
    x: {
      adapters: {
        date: { locale: de },
        type: "time",
        distribution: "series",
        time: {
          parser: "",
          unit: "month",
        },
      },
    },
  },
};

export async function getLinechartData(fetchOffset = 0, prevData = []) {
  let transactionData = prevData;
  let queryString = `
    query {
      transaction (where: {userId: {_eq: 290}, type:{_eq:"level"}}, offset:${fetchOffset} limit:20 order_by:{createdAt: asc}) {
          createdAt
          amount
          type
          path
      }
    }
    `;

  fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: queryString,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      data.data.transaction.forEach((element) => {
        // separate data by / and push to transactionData
        transactionData.push(element);
      });

      // if (transactionData.length > 0 && transactionData.length % 20 === 0) {
      if (data.data.transaction.length > 0 && data.data.transaction.length % 20 === 0) {
        getLinechartData(fetchOffset + 20, transactionData);
      }
    });
  return transactionData;
}

function sortLineData(data) {
  if (data.length === 0) {
    console.log("no data");
    return;
  }
  // labels represent the x-axis, formatted as MM-YYYY
  let labels = [];

  // dataSets represent the y-axis, formatted as level
  let dataSets = [[], [], [], []];

  // get starting and ending month from data.createdAt
  let startMonth = new Date(data[0].createdAt);

  // substract 1 month from startMonth
  startMonth.setMonth(startMonth.getMonth() - 1);

  let endMonth = new Date(data[data.length - 1].createdAt);

  // get the difference in months between start and end
  let monthDiff =
    endMonth.getMonth() -
    startMonth.getMonth() +
    12 * (endMonth.getFullYear() - startMonth.getFullYear());

  // create an array of months between start and end, formatted as MM-YYYY
  for (let i = 0; i <= monthDiff; i++) {
    labels.push(new Date(startMonth.getFullYear(), startMonth.getMonth() + i, 1));
  }

  // convert labels to MM-YYYY format
  for (let i = 0; i < labels.length; i++) {
    labels[i] = labels[i].toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
  }

  // create arrays of levels for each type
  let main = [];
  let piscineGo = [];
  let piscineJs = [];
  let piscineRust = [];

  // loop through data and push levels to corresponding type array
  if (data.length > 0) {
    data.forEach((element) => {
      let pathArray = element.path.split("/");
      if (pathArray.length < 5) {
        main.push(element);
      } else if (pathArray.length >= 5 && pathArray[2] === "piscine-go") {
        piscineGo.push(element);
      } else if (pathArray.length >= 5 && pathArray[3] === "piscine-js") {
        piscineJs.push(element);
      } else if (pathArray.length >= 5 && pathArray[3] === "rust") {
        piscineRust.push(element);
      }
    });
  }

  let mainLevel = 0;
  let piscineGoLevel = 0;
  let piscineJsLevel = 0;
  let piscineRustLevel = 0;
  // loop through level arrays and push highest level of each type of current month to type arrays
  for (let i = 0; i < labels.length; i++) {
    dataSets[0].push(mainLevel);
    dataSets[1].push(piscineGoLevel);
    dataSets[2].push(piscineJsLevel);
    dataSets[3].push(piscineRustLevel);

    for (let j = 0; j < main.length; j++) {
      if (
        new Date(main[j].createdAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }) === labels[i]
      ) {
        if (main[j].amount > mainLevel) {
          mainLevel = main[j].amount;
          dataSets[0][i] = mainLevel;
        }
      }
    }
    for (let j = 0; j < piscineGo.length; j++) {
      if (
        new Date(piscineGo[j].createdAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }) === labels[i]
      ) {
        if (piscineGo[j].amount > piscineGoLevel) {
          piscineGoLevel = piscineGo[j].amount;
          dataSets[1][i] = piscineGoLevel;
        }
      }
    }
    for (let j = 0; j < piscineJs.length; j++) {
      if (
        new Date(piscineJs[j].createdAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }) === labels[i]
      ) {
        if (piscineJs[j].amount > piscineJsLevel) {
          piscineJsLevel = piscineJs[j].amount;
          dataSets[2][i] = piscineJsLevel;
        }
      }
    }
    for (let j = 0; j < piscineRust.length; j++) {
      if (
        new Date(piscineRust[j].createdAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }) === labels[i]
      ) {
        if (piscineRust[j].amount > piscineRustLevel) {
          piscineRustLevel = piscineRust[j].amount;
          dataSets[3][i] = piscineRustLevel;
        }
      }
    }
  }
  return [labels, dataSets];
}

function setChartData(sorted) {
  return {
    labels: sorted[0],
    datasets: [
      {
        label: "div-01 levels",
        data: sorted[1][0],
        borderColor: "rgb(220, 249, 0)",
        backgroundColor: "rgba(220, 249, 0, 0.5)",
      },
      {
        label: "piscine-go levels",
        data: sorted[1][1],
        borderColor: "rgb(0, 172, 215)",
        backgroundColor: "rgba(0, 172, 215, 0.5)",
      },
      {
        label: "piscine-js levels",
        data: sorted[1][2],
        borderColor: "rgb(247, 223, 30)",
        backgroundColor: "rgba(247, 223, 30, 0.5)",
      },
      {
        label: "piscine-rust levels",
        data: sorted[1][3],
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
    ],
  };
}

export default function Linechart(props) {
  const [fetchData, setFetchData] = useState([]);

  props.lineData.then((data) => {
    if (data.length > 0 && fetchData.length === 0) {
      setFetchData(sortLineData(data));
    }
  });

  if (fetchData.length === 0) {
    return <div className={classes.linechart}>Loading...</div>;
  } else {
    return (
      <div className={classes.linechart}>
        <Line options={options} data={setChartData(fetchData)} />
      </div>
    );
  }
}
