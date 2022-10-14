import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import CommunityList from "./domain/community/communityList";
// import CommunityDetail from "./domain/community/communityDetail";
// import CommunityMain from "./domain/community/communityMain";
// import PerfumeList from "./domain/perfume/perfumeList";
// import PerfumeDetail from "./domain/perfume/perfumeDetail";
// import PerfumeMain from "./domain/perfume/perfumeMain";
// import PerfumeRegistList from "./domain/perfume/perfumeRegistList";
// import PerfumeRegist from "./domain/perfume/perfumeRegist";
// import Login from "./domain/user/Login";
// import Profile from "./domain/user/profile";
// import Nav from "./components/nav";
// import Footer from "./components/footer";
// import Home from "./domain/home/home";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "redux/store";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
{
  /* <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
  crossorigin="anonymous"
></link>; */
}

const rootReduce = createStore(store, composeWithDevTools);
const persistor = persistStore(rootReduce);

root.render(
  <Provider store={rootReduce}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
