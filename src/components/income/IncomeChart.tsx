import Chart from "chart.js/auto";
import { TransactionType } from "../../utils/api";
import { useEffect, useRef } from "react";

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

    const labels = data.map((item) => item.dateId);
    const incomeValues = data.map((item) => item.amount);

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
  const transactionsDetails = transactions.map((transaction) => {
    const date = new Date(transaction.timestamp);

    return {
      date,
      dateId: date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      amount: transaction.amount,
    };
  });

  const data: { dateId: string; amount: number }[] = [];
  const now = new Date();

  for (let i = months; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, now.getDate());
    data.push({
      dateId: date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      amount: 0,
    });
  }

  transactionsDetails.forEach((transaction) => {
    const item = data.find((entry) => entry.dateId === transaction.dateId);
    if (item) {
      item.amount += transaction.amount;
    }
  });

  return data;
}
