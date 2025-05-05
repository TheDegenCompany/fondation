
"use client";
import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function BTCChart() {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 900,
      height: 500,
      layout: {
        backgroundColor: "#000000",
        textColor: "#FFFFFF",
      },
      grid: {
        vertLines: { color: "#000000" },
        horzLines: { color: "#000000" },
      },
      priceScale: { borderColor: "#666" },
      timeScale: { borderColor: "#666" },
    });

    const candleSeries = chart.addCandlestickSeries();

    const binanceSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@kline_1m"
    );

    binanceSocket.onmessage = function (event) {
      const message = JSON.parse(event.data);
      const candlestick = message.k;

      candleSeries.update({
        time: Math.floor(candlestick.t / 1000),
        open: parseFloat(candlestick.o),
        high: parseFloat(candlestick.h),
        low: parseFloat(candlestick.l),
        close: parseFloat(candlestick.c),
      });
    };

    return () => binanceSocket.close();
  }, []);

  return <div ref={chartContainerRef} />;
}
