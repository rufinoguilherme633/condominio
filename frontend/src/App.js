import logo from "./logo.svg";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navibar from "./components/Navibar/Navibar";

function App() {
  return (
    <div className="App">
      <Navibar/>
      <Outlet />
    </div>
  );
}

export default App;
