import { useState, useEffect } from "react";
import "./App.css";
import AdviceCard from "./components/AdviceCard";
import Loading from "./components/Loading";

const url = "https://api.adviceslip.com/advice";

function App() {
  const [loading, setLoading] = useState(true);
  const [advice, setAdvice] = useState({ slip: { id: 0, advice: "hello" } });
  const fetchAdvice = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setAdvice(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  if (loading) {
    return (
      <main className="container">
        <Loading />
      </main>
    );
  }
  return (
    <main className="container">
      <AdviceCard advice={advice.slip} handleClick={fetchAdvice} />
    </main>
  );
}

export default App;
