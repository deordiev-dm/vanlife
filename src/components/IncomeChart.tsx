import Chart from "chart.js/auto";
import { TransactionType } from "../utils/api";
import { useEffect, useRef } from "react";

// const MONTHS_MAP = {
//   "0": "Jan",
//   "1": "Feb",
//   "2": "Mar",
//   "3": "Apr",
//   "4": "May",
//   "5": "Jun",
//   "6": "Jul",
//   "7": "Aug",
//   "8": "Sep",
//   "9": "Oct",
//   "10": "Nov",
//   "11": "Dec",
// };

type Props = {
  transactions: TransactionType[] | null;
  months: 1 | 3 | 6 | 12;
};

function IncomeChart({ transactions, months }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !transactions) return;

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = formatIncomeData(transactions, months);

    const labels = data.map((item) => item.month);
    const incomeValues = data.map((item) => item.income);

    const maxIncome = Math.max(...incomeValues);

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
  }, [transactions, months]);

  return <canvas ref={chartRef} />;
}

export default IncomeChart;

function formatIncomeData(transactions: TransactionType[], months: number) {
  console.log(transactions, months);

  return [
    { month: "Jun", income: 500 },
    { month: "Jul", income: 310 },
    { month: "Aug", income: 1220 },
    { month: "Sep", income: 840 },
  ];
}

//   const now = new Date();
//   const startingPoint = new Date();
//   startingPoint.setDate(startingPoint.getMonth() - months);
//   const currentMonth = now.getMonth();
//   const startingMonth = startingPoint.getMonth();
//   const monthsList = [];
//   for (let i = startingMonth; i <= currentMonth; i++) {
//     monthsList.push(i);
//   }
//   const dataByMonth: { [key: string]: number } = {};
//   monthsList.forEach((month) => {
//     dataByMonth[MONTHS_MAP[month.toString() as keyof typeof MONTHS_MAP]] = 0;
//   });
//   transactions.forEach((transaction) => {
//     const date = new Date(transaction.timestamp);
//     const month = date.toLocaleString("default", {
//       month: "short",
//     });
//     if (dataByMonth[month]) {
//       dataByMonth[month] += transaction.amount;
//     } else {
//       dataByMonth[month] = transaction.amount;
//     }
//   });
//   return Object.keys(dataByMonth).map((month) => ({
//     month,
//     income: dataByMonth[month],
//   }));
