import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewResume from "./resumes/pages/NewResume";

import "./App.css";

const App = () => {
  return (
    <Router>
      {/* <h1 className="App">Riveting Resumes!</h1> */}
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/resumes/new" exact>
          <NewResume />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
