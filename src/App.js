import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";

import { Welcome } from "./components/welcome.js"
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

        <Router>
          <Route exact path="/">
            <Welcome/>
          </Route>
          <Route path="/theme">
            <TopicContainer/>
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
        </Router>
        <InterviewMap/>

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
    <Viewer />
  );
}

export default App;
