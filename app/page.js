
import BTCChart from "../components/BTCChart";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl mb-6 font-bold">BTC Live Chart – The Degen Company</h1>
      <BTCChart />
    </main>
  );
}
