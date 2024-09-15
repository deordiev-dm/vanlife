import Chart from "chart.js/auto";
import { TransactionType } from "../utils/api";
import { useEffect, useRef } from "react";

const MONTH_MAP = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

type Props = {
  transactions: TransactionType[] | null;
  numberOfDays: number;
};

function IncomeChart({ transactions, numberOfDays }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !transactions) return;

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = formatIncomeData(transactions, numberOfDays);

    const labels = data.map((item) => item.month);
    const incomeValues = data.map((item) => item.income);

    const maxIncome = Math.max(...incomeValues);
    console.log(maxIncome);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Income in a month",
            data: incomeValues,
            backgroundColor: "#FF8C38",
            borderRadius: 10,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: Math.ceil(maxIncome * 1.05),
          },
        },
      },
    });

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions, numberOfDays]);

  return <canvas ref={chartRef} />;
}

export default IncomeChart;

function formatIncomeData(
  transactions: TransactionType[],
  numberOfDays: number,
) {
  const now = new Date();
  const startingPoint = new Date();
  startingPoint.setDate(startingPoint.getDate() - numberOfDays);

  const currentMonth = now.getMonth();
  const startingMonth = startingPoint.getMonth();

  const months = [];

  for (let i = startingMonth; i <= currentMonth; i++) {
    months.push(i);
  }

  const dataByMonth: { [key: string]: number } = {};
  months.forEach((month) => {
    dataByMonth[MONTH_MAP[month]] = 0;
  });

  transactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp);
    const month = date.toLocaleString("default", {
      month: "short",
    });

    if (dataByMonth[month]) {
      dataByMonth[month] += transaction.amount;
    } else {
      dataByMonth[month] = transaction.amount;
    }
  });

  return Object.keys(dataByMonth).map((month) => ({
    month,
    income: dataByMonth[month],
  }));
}
