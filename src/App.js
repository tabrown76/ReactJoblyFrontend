import React from "react";
import {BrowserRouter} from "react-router-dom";
import JoblyNav from "./Nav";
import { ContextProvider } from "./Context";
import JoblyRoutes from "./Routes";
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <JoblyNav />      
        <JoblyRoutes />
      </ContextProvider>
    </BrowserRouter>
  )
}

export default App;
