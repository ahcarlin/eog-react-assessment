import React from "react";
import createStore from "./store";
import { Provider as UrqlProvider, createClient } from "urql";
import { Provider } from "react-redux";
//import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import MetricCard from "./components/MetricCard";
//import NowWhat from "./components/NowWhat";

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
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
          {/* <ToastContainer /> */}
          <MetricCard />
        </Wrapper>
      </UrqlProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
