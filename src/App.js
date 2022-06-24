import "./styles/app.scss";
import  HomeTabs  from "./components/tabs";
import { AiOutlineMore } from "react-icons/ai";
import {FiLock} from "react-icons/fi";


function App() {
 
  return (
    <>
      <header>
        <h1><FiLock style={{marginRight:10}}/>Web Secure</h1>
        <AiOutlineMore style={{cursor:"pointer"}} size={20}/>
      </header>
      <hr />
      <HomeTabs />
    </>
  );
}

export default App;
