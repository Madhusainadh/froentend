import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Citizen/Navbar/Navbar";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import RoadDamageReport from "./Components/Citizen/Pages/RoadDamageReport/RoadDamageReport";
import AllRoutes from "./AllRoutes/Routes";
import { useLocation } from "react-router-dom";

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819",
  },
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

function App() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <ChakraProvider theme={theme}>
      <div className="App">
      {
        location.pathname==="/"?"":
        <Navbar />
      
      }
        <AllRoutes/>
      </div>
    </ChakraProvider>
  );
}

export default App;
