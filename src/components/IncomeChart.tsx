import Chart from "chart.js/auto";
import { TransactionType } from "../utils/api";
import { useEffect, useRef } from "react";

type Props = {
  transactions: TransactionType[] | null;
};

function formatIncomeData(transactions: TransactionType[]) {
  const dataByMonth: { [key: string]: number } = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp);
    const month = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
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

function IncomeChart({ transactions }: Props) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !transactions) return;

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    if (chartInstance.current) {
      // Destroy the previous chart before creating a new one
      chartInstance.current.destroy();
    }

    const data = formatIncomeData(transactions);

    const labels = data.map((item) => item.month);
    const incomeValues = data.map((item) => item.income);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Income Over Months",
            data: incomeValues,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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
  }, [transactions]);

  return <canvas ref={chartRef} />;
}

export default IncomeChart;
