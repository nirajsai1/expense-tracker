import React from "react";
import {BrowserRouter , Router , Routes , Route , Link} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Transaction from "./Transaction";
function App()
{
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/transaction' element={<Transaction/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;