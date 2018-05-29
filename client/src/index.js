// import 'materialize-css/dist/css/materialize.min.css';
// causes conflicts with material-ui
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './components/App'



const theme = createMuiTheme({
  palette: {
    type: 'dark',
  }
});
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Insert app into #root div in public/index
ReactDOM.render(
  <Provider store={store}>
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </div>
  </Provider>,
  document.querySelector("#root")
);

