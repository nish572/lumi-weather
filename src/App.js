import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import Forecast from "./Forecast";
import Detailed from "./Detailed";

function App() {
  return (
    <div className = "App">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="settings" element={ <Settings/> } />
        <Route path="forecast" element={ <Forecast/> } />
        <Route path="detailed" element={ <Detailed/> } />
      </Routes>
    </div>
  )
}

export default App
