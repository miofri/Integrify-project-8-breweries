import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import { mainTheme } from "./themes/mainTheme";
import { SingleBrewery } from "./components/SingleBrewery";
import { Home } from "./components/Home";
import { SearchBrewery } from "./components/SearchBrewery";

export const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="brewery/:id" element={<SingleBrewery />}></Route>
            <Route path="search-brewery" element={<SearchBrewery />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
