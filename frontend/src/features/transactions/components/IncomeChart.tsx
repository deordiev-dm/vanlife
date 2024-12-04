import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import { Transaction } from "@/lib/types/types";

type IncomeChartProps = {
  transactions: Transaction[] | null;
  monthsFilter: number;
};

function IncomeChart({ transactions, monthsFilter }: IncomeChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !transactions) return;

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = formatIncomeData(transactions, monthsFilter);

    const labels = data.map((item) => item.dateId);
    const incomeValues = data.map((item) => item.amount);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Income",
            data: incomeValues,
            backgroundColor: "#f97316",
            borderRadius: 10,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
          },
          x: {
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
              lineWidth: 1,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions, monthsFilter]);

  return <canvas ref={chartRef} />;
}

export default IncomeChart;

function formatIncomeData(transactions: Transaction[], months: number) {
  const transactionsDetails = transactions.map((transaction) => {
    const date = new Date(transaction.createdAt);

    return {
      date,
      dateId: date.toLocaleString("default", {
        month: "short",
      }),
      amount: transaction.sum,
    };
  });

  const data: { dateId: string; amount: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, now.getDate());
    data.push({
      dateId: date.toLocaleString("default", {
        month: "short",
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
