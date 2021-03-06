import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import One from "./components/grid/One";
import Two from "./components/grid/Two";
import Three from "./components/grid/Three";
import Four from "./components/grid/Four";
import Five from "./components/grid/Five";
import Six from "./components/grid/Six";
import Seven from "./components/grid/Seven";
import Eight from "./components/grid/Eight";
import Nine from "./components/grid/Nine";
import First from "./components/storage/First";
import Second from "./components/storage/Second";
import Third from "./components/storage/Third";

function App() {
  const [input, setInput] = useState([]);
  const [one, setOne] = useState([1]);
  const [two, setTwo] = useState([2]);
  const [three, setThree] = useState([3]);
  const [four, setFour] = useState([4]);
  const [five, setFive] = useState([5]);
  const [six, setSix] = useState([6]);
  const [seven, setSeven] = useState([7]);
  const [eight, setEight] = useState([8]);
  const [nine, setNine] = useState([9]);
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);

  // Set states from API upon page refresh
  const fetchData = async () => {
    const { data } = await axios.get(
      "https://61cb910e194ffe0017788d91.mockapi.io/sequences"
    );
    initStates(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function runs when input is entered
  const renderData = async () => {
    const { data } = await axios.get(
      "https://61cb910e194ffe0017788d91.mockapi.io/sequences"
    );
    // Validation logic
    if (input.length !== 9) {
      alert("Please enter a 9-digit number only");
    } else if (checkZero(input)) {
      alert("Please enter numbers from 1-9 only");
    } else if (checkRepeats(input)) {
      alert("Please don't enter any repeating digits");
    }
    // If API array does not have 3 objects yet, post new objects
    else if (data.length !== 3) {
      await axios
        .post("https://61cb910e194ffe0017788d91.mockapi.io/sequences", {
          sequence: `${input}`,
        })
        .then(setStates());
      // Update API using .put method, always making ID 1 the latest sequence
      await axios
        .put("https://61cb910e194ffe0017788d91.mockapi.io/sequences/3", {
          sequence: `${second}`,
        })
        .then(
          await axios.put(
            "https://61cb910e194ffe0017788d91.mockapi.io/sequences/2",
            {
              sequence: `${first}`,
            }
          )
        )
        .then(
          await axios.put(
            "https://61cb910e194ffe0017788d91.mockapi.io/sequences/1",
            {
              sequence: `${input}`,
            }
          )
        );
    }
    // If API array has 3 objects, skip posting new objects
    else {
      await axios
        .put("https://61cb910e194ffe0017788d91.mockapi.io/sequences/3", {
          sequence: `${second}`,
        })
        .then(
          await axios.put(
            "https://61cb910e194ffe0017788d91.mockapi.io/sequences/2",
            {
              sequence: `${first}`,
            }
          )
        )
        .then(
          await axios.put(
            "https://61cb910e194ffe0017788d91.mockapi.io/sequences/1",
            {
              sequence: `${input}`,
            }
          )
        )
        .then(setStates());
    }
  };

  // Input validation for numbers 1-9 only
  const checkZero = (input) => {
    for (let i = 0; i < input.length; i++) {
      if (input[i] == 0) {
        return true;
      }
    }
  };

  // Input validation for non-repeating digits
  const checkRepeats = (input) => {
    return /(.).*\1/.test(input);
  };

  // Re-render grid squares and storage list
  const setStates = () => {
    setOne(input[0]);
    setTwo(input[1]);
    setThree(input[2]);
    setFour(input[3]);
    setFive(input[4]);
    setSix(input[5]);
    setSeven(input[6]);
    setEight(input[7]);
    setNine(input[8]);
    setThird(second);
    setSecond(first);
    setFirst(input);
  };

  // Render grid squares and storage list from API on page refresh
  const initStates = (data) => {
    setInput(data[0].sequence);
    setFirst(data[0].sequence);
    setOne(data[0].sequence[0]);
    setTwo(data[0].sequence[1]);
    setThree(data[0].sequence[2]);
    setFour(data[0].sequence[3]);
    setFive(data[0].sequence[4]);
    setSix(data[0].sequence[5]);
    setSeven(data[0].sequence[6]);
    setEight(data[0].sequence[7]);
    setNine(data[0].sequence[8]);
    setSecond(data[1].sequence);
    setThird(data[2].sequence);
  };

  // Reset button re-renders page and clears API
  const resetStates = async () => {
    setInput([]);
    setOne([1]);
    setTwo([2]);
    setThree([3]);
    setFour([4]);
    setFive([5]);
    setSix([6]);
    setSeven([7]);
    setEight([8]);
    setNine([9]);
    setFirst([]);
    setSecond([]);
    setThird([]);
    await axios
      .delete("https://61cb910e194ffe0017788d91.mockapi.io/sequences/1")
      .then(
        await axios.delete(
          "https://61cb910e194ffe0017788d91.mockapi.io/sequences/2"
        )
      )
      .then(
        await axios.delete(
          "https://61cb910e194ffe0017788d91.mockapi.io/sequences/3"
        )
      );
  };

  return (
    <>
      <div className="App">
        <div>
          <h1 className="header">
            Input a 9-digit sequence to change the grid below
          </h1>
          <h3 className="subheader">
            Only input numbers from 1-9, with no repeating digits
          </h3>
          <h3 className="subheader">Hit the Enter key to submit</h3>
          <input
            className="input"
            type="number"
            placeholder="987654321"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(event) => event.key === "Enter" && renderData()}
          />
        </div>
        <div className="grid-container">
          <One one={one} />
          <Two two={two} />
          <Three three={three} />
          <Four four={four} />
          <Five five={five} />
          <Six six={six} />
          <Seven seven={seven} />
          <Eight eight={eight} />
          <Nine nine={nine} />
        </div>
        <div className="storage">
          <h3 className="storage__header">Last 3 inputted sequences:</h3>
          <First first={first} />
          <Second second={second} />
          <Third third={third} />
          <button className="reset" onClick={() => resetStates()}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
