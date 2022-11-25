
import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthContextProvider from './context/AuthContextProvider';
import AppRouter from './router/AppRouter';


const App = () => {




  return (
    <div className='bg-grey-100 dark:bg-[#23242a]' >
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
