import logo from './logo.svg';
import './App.css';
import React from "react";
import {store} from "./actions/store";
import {Provider} from "react-redux";
import DonationCandidate from './components/DonationCandidate';
import {Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";



function App() {
  return (
    <Provider store={store}>
      
        <ToastProvider autoDismiss={true}>
          <Container maxWidth="lg">
            <DonationCandidate />
          </Container>
        </ToastProvider>
      
    </Provider>
  );
}

export default App;
