import React from "react";
import faker from "faker";

import styles from "./MerchantOverview.module.scss";

import { PieChart, VerticalBar } from "components/Charts/Charts";

function MerchantOverView() {
  const currDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const userCategories = [
    "Fruits",
    "Vegitables",
    "Diary",
    "Beverages",
    "Bread & Bakery",
    "Cleanser",
  ];
  const categroiesColor = [
    "rgba(46, 201, 113,0.2)",
    "rgba(53, 162, 235, 0.5)",
    "rgba(255, 80, 80,0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];

  let lastSevenDays = [];
  let lastSixMonths = [];

  const getLastSixMonths = () => {
    const currMonth = currDate.getMonth();
    let temp = currMonth;
    for (let i = 0; i < 6; i++) {
      temp -= 1;
      if (temp < 0) {
        temp = 11;
      }
      if (temp > 11) {
        temp = 0;
      }
      lastSixMonths.push(months[temp]);
    }

    return lastSixMonths;
  };
  getLastSixMonths();

  const getLastSevenDays = () => {
    const currDay = currDate.getDay();
    let temp = currDay;
    for (let i = 0; i < 7; i++) {
      temp -= 1;
      if (temp < 0) {
        temp = 6;
      }
      if (temp > 6) {
        temp = 0;
      }
      lastSevenDays.push(weekDays[temp]);
    }
    return lastSevenDays;
  };
  getLastSevenDays();

  const lastSixMonthsData = {
    labels: lastSixMonths,
    datasets: [
      {
        label: "Sales(in number of items)",
        data: lastSixMonths.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "rgba(46, 201, 113,0.2)",
      },
      {
        label: "Revenue(in thousands)",
        data: lastSixMonths.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const lastWeekData = {
    labels: lastSevenDays,
    datasets: [
      {
        label: "Sales(in number of items)",
        data: lastSevenDays.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "rgba(46, 201, 113,0.2)",
      },
      {
        label: "Revenue(in thousands)",
        data: lastSevenDays.map(() =>
          faker.datatype.number({ min: 0, max: 1000 })
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: userCategories,
    datasets: [
      {
        label: "category %age of overall sale",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: categroiesColor.map((color) => color),
        borderColor: [
          "rgba(46, 201, 113, 1)",
          "rgba(53, 162, 235, 1)",
          "rgba(255, 80, 80, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const lastWeekOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 7 Days Sales & Revenue",
      },
    },
  };
  const lastSixMonthsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Last 6 months Sales & Revenue",
      },
    },
  };

  return (
    <div className={styles.overviewContainer}>
      <div className={styles.firstRow}>
        <div className={styles.lastWeekChart}>
          <VerticalBar options={lastWeekOptions} data={lastWeekData} />
        </div>
        <hr />
        <div className={styles.categoriesChartContainer}>
          <div className={styles.categoriesChart}>
            <h4>Categories</h4>
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.secondRow}>
        <div className={styles.lastMonthsChart}>
          <VerticalBar
            options={lastSixMonthsOptions}
            data={lastSixMonthsData}
          />
        </div>
      </div>
    </div>
  );
}

export default MerchantOverView;
