import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import Portfolio from "./portfolios/pages/Portfolio";
import NewPortfolio from "./portfolios/pages/NewPortfolio";
import UserPortfolios from "./portfolios/pages/UserPortfolios";
import UpdatePortfolio from "./portfolios/pages/UpdatePortfolio";
import Auth from "./user/pages/Auth";
import MainNav from "./shared/components/Navigation/MainNav";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/portfolios" exact>
          <UserPortfolios />
        </Route>
        <Route path="/:userId/portfolios/new" exact>
          <NewPortfolio />
        </Route>
        <Route path="/:userId/portfolios/:portfolioId">
          <UpdatePortfolio />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/portfolios" exact>
          <UserPortfolios />
        </Route>
        <Route path="/:userId/portfolios/:portfolioId" exact>
          <Portfolio />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
