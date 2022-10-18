import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewResume from "./resumes/pages/NewResume";
import UserResumes from "./resumes/pages/UserResumes";
import UpdateResume from './resumes/pages/UpdateResume';
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/:userId/resumes" exact>
            <UserResumes />
          </Route>
          <Route path="/resumes/new" exact>
            <NewResume />
          </Route>
          <Route path="/resumes/:resumeId">
            <UpdateResume />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;

{
  /* <div
      style={{
        backgroundColor: "#292929",
        // width: "100px",
        // height: "100px",
      }}
    ></div> */
}
