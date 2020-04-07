import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "../shared/App";

import configStore from '../store'

const store = configStore(window.__initialData__)

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);




// console.log(window.document.body.innerHTML.replace(/<\/script>,/g, '</script>'));


