import React, { useContext } from 'react';

import NavbarComp from './components/NavbarComp';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import UserReviews from './pages/UserReviews';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeContext } from './context/themeContext';
import './theme/style.css';
import NotFound from './pages/NotFound';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <BrowserRouter>
        <NavbarComp />
          <Routes>

        {/* <ThemeProvider theme={theme}>
          <Paper> */}
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<UserReviews />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
            
          {/* </Paper>
        </ThemeProvider> */}
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
