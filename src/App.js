import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from "react-router-dom";

import { MenuBar } from "./components/menubar.js";
import { TextBox } from "./components/textbox.js";
import { TopicContainer } from "./components/theme/topiccontainer.js";
import { InterviewMap } from "./components/map/interviewmap.js"

import './reset.css';
import './App.css';

// ***************************************************************************

class Viewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    }
  }

  handlePage(page) {
    this.setState({
      page: page
    });
  }

  render() {

    return (
    <div>
      <MenuBar
        page={this.state.page}
        handlePage={this.handlePage.bind(this)}
      />

      <TextBox
        page={this.state.page}
        handlePage={this.handlePage.bind(this)}
      />

      <div id="multi-container">
          <Switch>
            <Route path="/theme">
              <TopicContainer
                location={this.props.location}
              />
              <div className="overlay-btn-grp">
                <Link to="/map">
                  <button>
                    Map
                  </button>
                </Link>
              </div>
            </Route>
            <Route path="/map">
              <div className="overlay-btn-grp">
                <Link to="/theme">
                  <button>
                    Themes
                  </button>
                </Link>
              </div>
            </Route>
            <Route>
              <Redirect to="/map"/>
            </Route>
          </Switch>

        <InterviewMap location={this.props.location} />

      </div>

      <div id="footer">
        <span id="authors">T. Arnold, C. Rivard, L. Tilton</span>
        <span id="notice">Stanford University Press | Digital Project </span>
      </div>

    </div>
    );
  }
}

// ***************************************************************************
// Wrap the App and return the rendered Viewer

function App() {
  return (
    <Router>
      <Route component={Viewer} />
    </Router>
  );
}

export default App;
