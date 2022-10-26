import classes from "./Barchart.module.css";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "erkki.tikk div01 main tasks by name and XP gained",
    },
  },
};

export async function getBarchartData(fetchOffset = 0, prevData = []) {
  let transactionData = prevData;
  let queryString = `
    query {
        transaction (where: {userId: {_eq: 290} type: {_eq: "down"}}, offset:${fetchOffset} limit:20 order_by:{createdAt: asc}) {
            createdAt
            amount
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
        // if transactionData does not contain element with same path, add it
        if (!transactionData.some((e) => e.path === element.path)) {
          transactionData.push(element);
        }
      });
      if (data.data.transaction.length > 0 && data.data.transaction.length % 20 === 0) {
        getBarchartData(fetchOffset + 20, transactionData);
      }
    });
  return transactionData;
}

export default function Barchart(props) {
  const [fetchData, setFetchData] = useState([]);

  props.barData.then((data) => {
    setFetchData(data);
  });

  let labels = [];
  let data = [];
  let borderColor = [];
  let backgroundColor = [];

  fetchData.forEach((element) => {
    labels.push(element.path.split("/")[3]);
    data.push(element.amount);
    borderColor.push("rgb(0, 0, 0)");
    backgroundColor.push("rgba(0, 0, 0, 0.5)");
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "XP in kB",
        data,
        borderColor,
        backgroundColor,
      },
    ],
  };

  if (fetchData.length === 0) {
    return <div className={classes.barchart}>Loading...</div>;
  } else {
    return (
      <div className={classes.barchart}>
        <p>Data fetched from kood/Jõhvi server with graphql query.</p>
        <Bar options={options} data={chartData} />
      </div>
    );
  }
}
