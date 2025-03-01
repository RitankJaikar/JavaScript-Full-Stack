import { useState, useEffect, useRef } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import { currency } from './hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);
  console.log(options);
  console.log(currency);

  const fromCurrencyName = currency[from.toUpperCase()];
  const toCurrencyName = currency[to.toUpperCase()];
  console.log(fromCurrencyName, toCurrencyName);

  const swap = function () {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = () => {
    console.log(amount, to, currencyInfo[to])
    setConvertedAmount(amount * currencyInfo[to]);
  }

  /*const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first render
      return;
    }
    convert();
  }, [amount, swap]);*/   //works

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('')`,
        background: "none"
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-[32rem] mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <h2 className='text-white text-2xl mb-4 text-center'>{fromCurrencyName ? fromCurrencyName : from} --To-- {toCurrencyName ? toCurrencyName : to}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(curr) => setFrom(curr)}
                selectedCurrency={from}
                amountDisble={false}
                currencyOptions={options}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                onAmountChange={(amount) => setAmount(amount)}
                onCurrencyChange={(curr) => setTo(curr)}
                selectedCurrency={to}
                amountDisble={true}
                currencyOptions={options}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;