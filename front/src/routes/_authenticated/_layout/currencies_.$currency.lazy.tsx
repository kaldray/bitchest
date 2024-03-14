import { createLazyFileRoute } from "@tanstack/react-router";
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

import { assertIsString, convertApiDataToChartJsFormat } from "@/helpers";
import { TableSkeleton } from "@/components/skeleton/TableSkeleton";

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

export const Route = createLazyFileRoute("/_authenticated/_layout/currencies/$currency")({
  component: CurrencyRate,
  pendingComponent: () => <TableSkeleton skeletonHeight={"300px"} />,
});

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CurrencyRate() {
  const currencyRate: CurrenciesRateList = Route.useLoaderData();

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
}
