import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Startups/Landing/Landing";

console.log("App.jsx loaded");

function App() {
  return (
    <div>
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
