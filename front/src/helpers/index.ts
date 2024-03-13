type Data = {
  id: string;
  crypto_name: string;
  currency_histories: [{ id: number; quoting: number; date: string }];
};

export const convertApiDataToChartJsFormat = (data: Data) => {
  const labels = data.currency_histories.map((val) => val.date).reverse();
  const chartData = data.currency_histories.map((val) => val.quoting);
  return { labels, chartData };
};
