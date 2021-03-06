import React from "react";
import createStore from "./store";
import { Provider as UrqlProvider, createClient, defaultExchanges, subscriptionExchange } from "urql";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MetricSelect from "./components/MetricSelect";
import MetricCardContainer from "./containers/MetricCardContainer";
import Chart from "./components/Chart";
//import NowWhat from "./components/NowWhat";
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {reconnect: true});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subClient.request(operation)
    })
  ]
});

const store = createStore();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UrqlProvider value={client}>
        <Wrapper>
          <Header />
          {/* <NowWhat /> */}
          <MetricSelect />
          <Chart />
          <MetricCardContainer />
          <ToastContainer /> 
        </Wrapper>
      </UrqlProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
