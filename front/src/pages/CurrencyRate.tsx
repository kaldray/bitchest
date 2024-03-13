import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartType,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Flex } from "@chakra-ui/react";

import { convertApiDataToChartJsFormat } from "@/helpers";
import { currencyRate as currencyRateRoute } from "@/router/route";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export type CurrenciesRateList = {
  id: string;
  crypto_name: string;
  currency_histories: [
    {
      id: number;
      quoting: number;
      date: string;
    },
  ];
};

function assertIsString(label: unknown, value: unknown): asserts value is string {
  if (typeof label !== "string" && typeof value !== "string") {
    throw new Error("Not a string");
  }
}

export const CurrencyRate = () => {
  const currencyRate: CurrenciesRateList = currencyRateRoute.useLoader();

  const { labels, chartData } = convertApiDataToChartJsFormat(currencyRate);

  const data = {
    labels,
    datasets: [
      {
        label: currencyRate.crypto_name,
        data: chartData,
        borderColor: "#90CDF4",
        backgroundColor: "#2C5282",
      },
    ],
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label;
            label += " : ";
            let value = context.raw;
            value += " €";
            assertIsString(value, label);
            return label + value;
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: currencyRate.crypto_name,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (val) {
            return this.getLabelForValue(Number(val)) + " €";
          },
        },
      },
    },
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        p={5}
        mt={["5rem", "5rem", "0rem"]}>
        {/*
          // @ts-ignore */}
        <Line options={options} data={data} />
      </Flex>
    </>
  );
};
