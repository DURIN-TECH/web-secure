import "./styles/app.scss";
import  HomeTabs  from "./components/tabs";
import { FiSun,FiMoon } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const handleToggle = () => {
    setDarkMode(!darkMode)
  }
 
  return (
    <>
      <header>
        <h1><FiLock style={{marginRight:10}}/>Web Secure</h1>
        <div className="mode-toggle">
          {darkMode ? <FiSun size={20} onClick={handleToggle} />
          : <FiMoon size={20} onClick={handleToggle} />}
        </div>
      </header>
      <hr />
      <HomeTabs />
    </>
  );
}

export default App;
