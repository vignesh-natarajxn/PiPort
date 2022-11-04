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
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
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
        <Route path="/:userId/portfolios/:portfolioId/edit" exact>
          <UpdatePortfolio />
        </Route>
        <Route path="/:userId/portfolios/:portfolioId">
          <Portfolio />
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
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNav />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
