import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useCryptoContext } from "../context/CryptoContext";
import { NavLink, useParams } from "react-router-dom";
import { Spin, ConfigProvider } from "antd";

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useCryptoContext();
  const { id } = useParams();

  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler
  );

  const HistoricalChart = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
    const data = await response.json();
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    HistoricalChart();
  }, [currency, days]);

  if (!historicalData.length)
    return (
      <div className="flex justify-center items-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#a16207",
            },
          }}
        >
          <Spin size="large" />
        </ConfigProvider>
      </div>
    );

  const chartData = {
    labels: historicalData.map((point) => {
      const date = new Date(point[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        data: historicalData.map((point) => point[1]),
        label: `Price (Past ${days} Days) in ${currency}`,
        borderColor: "#eab308",
        fill: false,
        backgroundColor: "rgba(62, 149, 205, 0.2)",
        pointRadius: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { type: "category" },
      y: { beginAtZero: false },
    },
  };

  const chartDays = [
    {
      id: 1,
      label: "24 Hours",
      value: 1,
    },
    {
      id: 2,
      label: "30 Days",
      value: 30,
    },
    {
      id: 3,
      label: "3 Months",
      value: 90,
    },
    {
      id: 4,
      label: "1 Year",
      value: 365,
    },
  ];

  return (
    <>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="flex justify-center items-center md:gap-x-6 gap-x-2 pt-5  ">
        {chartDays.map(({ id, value, label }) => (
          <button
            key={id}
            value={value}
            className={`px-5 py-2 rounded-sm ${
              days === value
                ? "bg-transparent border-2 border-yellow-500 text-white"
                : "bg-yellow-500 text-black"
            }`}
            onClick={() => {
              setDays(value);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

export default CoinInfo;
