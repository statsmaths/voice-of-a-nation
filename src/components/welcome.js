import React from 'react';
import { Link } from "react-router-dom";

import './welcome.css';

class Welcome extends React.Component {

  render() {
    return (
      <div id="welcome-container">
        <div className="welcome-msg">
          <h3>Mapping Southern Life Histories</h3>
          <p>
            The interactive map in this panel shows over 1200 life
            histories compiled by the Southern Life Histories Project
            between 1939 and 1941. Points are mapped to where each oral
            history was recorded. Click on a dot to display metadata and
            the text from each digitized life history.
          </p>
            <div style={{width: "100%", textAlign: "center"}}>
              <Link to="/map">
                <button>Enter</button>
              </Link>
            </div>
        </div>
      </div>
    )
  }
}


export {Welcome};
