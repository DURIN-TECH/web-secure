import "./styles/app.scss";
import  HomeTabs  from "./components/tabs";
import { AiOutlineMore } from "react-icons/ai";

function App() {
 
  return (
    <>
      <header>
        <h1>Web Secure</h1>
        <AiOutlineMore style={{cursor:"pointer"}} size={20}/>
      </header>
      <hr />
      <HomeTabs />
    </>
  );
}

export default App;
