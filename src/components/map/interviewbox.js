import React from 'react';

import './interviewbox.css';

class InterviewBox extends React.Component {

  render() {

    if ((this.props.selectid < 0))
    {
      return(
        <div id="interview-container" className="hidden">
        </div>
      )
    }

    let links = this.props.selection.links.map( (val, i) => {
      return (
        <div key={i}>
          <a href={"./data/xml/" + val.id + ".xml"}
             target="_blank"
             rel="noopener noreferrer">
            <li>
              {val.title}
            </li>
          </a>
        </div>
      )
    })

    return(
      <div id="interview-container">
        <div className="interview-meta">
          <h3> { this.props.selection.title } </h3>
          <hr width="100%"/>
          <div className="interview-list-box">
            <ul>
              { links }
            </ul>
          </div>
          <img
            className="svg-close"
            src="static/close-black.svg"
            width="20"
            height="20"
            onClick={() => this.props.handleSelectPoint(-1)}
            alt=""/>
        </div>
      </div>
    )
  }
}

export {InterviewBox};
