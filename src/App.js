import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link
} from "react-router-dom";
import {isMobile} from 'react-device-detect';

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
      mobileFlag: false | isMobile
    }
  }

  handlePage(page) {
    this.setState({
      page: page
    });
  }

  render() {

    return (
    <div className="container">
      <MenuBar
        page={this.state.page}
        handlePage={this.handlePage.bind(this)}
      />

      <TextBox
        page={this.state.page}
        handlePage={this.handlePage.bind(this)}
      />


      {(!this.state.mobileFlag) && (
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

      </div>)}

      <footer>
        <div id="footer">
          <div>©2021 Stanford University | Terms of Use</div>
          <div>ISBN XXXXXXXXXXXX | DOI 10.XXXXX/XXXXXXXX | OCLC XXXXXXXX</div>
          <div>
            Published by Stanford University Press
          </div>
        </div>
      </footer>

    </div>
    );
  }
}

// ***************************************************************************
// Wrap the App and return the rendered Viewer

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Route component={Viewer} />
    </Router>
  );
}

export default App;
