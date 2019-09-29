import React from 'react';
import Dropdown from 'react-dropdown';
import { Remarkable } from 'remarkable';
import 'react-dropdown/style.css';

import { Map, CircleMarker, TileLayer, ZoomControl, Tooltip } from 'react-leaflet'
import Legend from "./Legend";

import './App.css';
import "leaflet/dist/leaflet.css";

var md = new Remarkable({
  html: true,
  xhtmlOut: true,
  typographer: true,
});

function padZeros(number, pad) {
    return ("0".repeat(pad) + number).toString().substr(-pad, pad);
}

class TextBox extends React.Component {

  render() {
    if (!this.props.pagedata) {
      return <span>Waiting...</span>
    }

    console.log(this.props.page);
    if (typeof this.props.pagedata != 'string') {
      return (this.props.pagedata)
    }

    const data = this.props.pagedata;
    function createMarkup() { return {__html: data}; };

    return(
      <div id="textbox" dangerouslySetInnerHTML={createMarkup()} />
    )
  }
}

class InterviewBox extends React.Component {

  render() {

    if ((this.props.interview < 0) | !this.props.interviewdata)
    {
      return(
          <div id="interview-container" className="hidden">
          </div>
      )
    }

    var response = null;
    if (this.props.interviewmedia === "meta")
    {
      response = (
        <ul>
          <li>Title: <span>{this.props.interviewdata.title}</span></li>
          <li>Interviewee(s): <span>{this.props.interviewdata.interviewee}</span></li>
          <li>Interviewer(s): <span>{this.props.interviewdata.interviewer}</span></li>
          <li>Reviser(s): <span>{this.props.interviewdata.reviser}</span></li>
          <li>Date: <span>{this.props.interviewdata.date}</span></li>
          <li>Location: <span>{this.props.interviewdata.location}</span></li>
          <li>Gender (Interviewee): <span>{this.props.interviewdata.gender}</span></li>
          <li>Race (Interviewee): <span>{this.props.interviewdata.race}</span></li>
          <li>Occupation (Interviewee): <span>{this.props.interviewdata.occupation}</span></li>
        </ul>
      )
    } else {
      response = (
        <embed
          src="./data/pdfs/1049.pdf"
          type="application/pdf"
          width="100%"
          height="400px"/>
      )
    }

    return(
      <div id="interview-container">
        <div className="interview-meta">
          <h3>Interview #{this.props.interviewdata.id}</h3>
          <div className="interview-btn-grp">
            <button
              onClick={() => this.props.handleMediaButton('meta')}
              className={this.props.interviewmedia === "meta" ? "active" : ""}>
              metadata
            </button>
            <button
              onClick={() => this.props.handleMediaButton('pdf')}
              className={this.props.interviewmedia === "pdf" ? "active" : ""}>
              pdf
            </button>
            <button
              onClick={() => window.open("./data/pdfs/1049.pdf")}>
              pdf (download)
            </button>
            <button
              onClick={null}>
              xml (download)
            </button>
            <button
              onClick={() => window.open("./data/text/interview_" + padZeros(this.props.interviewdata.id, 4) + ".txt")}>
              text (download)
            </button>
          </div>
          <hr width="100%"/>
          {response}
          <img
            className="svg-close"
            src="static/close-black.svg"
            width="30"
            height="30"
            onClick={() => this.props.handleInterview(-1)}
            alt=""/>
        </div>
      </div>
    )
  }
}

// ***************************************************************************
// Main class that holds the state of the App

class Viewer extends React.Component {

  // Override two standard methods of React.Component //

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pagedata: null,
      geodata: null,
      interview: -1,
      interviewdata: null,
      interviewmedia: 'meta',
      overlay: false,
      image: -1,
      mapstate: { value: null, label: '[Reset]' },
      welcome: true,
    }
  }

  componentDidMount() {
    fetch("./data/geodata.json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        geodata: res,
      });
    });

    this.handleChangePage(this.state.page);
  }

  handleMapstateChange(value) {

    var legend = document.getElementById("legend-race");
    if (value.value === "race")
    {
      legend.style.visibility = "visible";
      legend.style.display = "inline";
    } else {
      legend.style.visibility = "hidden";
      legend.style.display = "none";
    }
    legend = document.getElementById("legend-gender");
    console.log(legend.className);
    if (value.value === "gender")
    {
      legend.style.visibility = "visible";
      legend.style.display = "inline";
    } else {
      legend.style.visibility = "hidden";
      legend.style.display = "none";
    }

    this.setState({
      mapstate: value,
    });
  }

  handleWelcome(value) {
    this.setState({
      welcome: value,
    });
  }

  handleInterview(value) {
    this.setState({
      interview: value,
      interviewdata: null,
      interviewmedia: 'meta'
    });

    if (value >= 0)
    {
      fetch("./data/interviews/" + value + ".json").then(res => {
        return res.json()
      }).then(res => {
        this.setState({
          interviewdata: res,
        });
      });
    }
  }

  handleImage(value) {
    this.setState({
      image: value,
    });
  }

  handleMediaButton(value) {
    this.setState({
      interviewmedia: value,
    });
  }

  handleOverlay(value, media) {
    if (media === undefined)
    {
      media = this.state.media
    }

    this.setState({
      overlay: value,
      media: media
    });
  }

  handleChangePage(page) {
      this.setState({
        page: page,
        data: null,
      });

      if (page === 0)
      {
        this.setState({
          pagedata: (<div id="textbox">
            <h1> Table of Contents </h1>

            <button class="toc-button" onClick={() => this.handleChangePage(1)}>
              Layer 1: Introduction
            </button>

            <button class="toc-button"  onClick={() => this.handleChangePage(2)}>
              Layer 2: Documenting People &amp; Histories
            </button>

            <button class="toc-button"  onClick={() => this.handleChangePage(3)}>
              Layer 3: Placing the Life Histories
            </button>

            <button class="toc-button"  onClick={() => this.handleChangePage(4)}>
              Layer 4: Distant Reading Rhetoric &amp; Style
            </button>

            <button class="toc-button"  onClick={() => this.handleChangePage(5)}>
              Layer 5: Method
            </button>

            <button class="toc-button"  onClick={() => this.handleChangePage(6)}>
              Layer 6: About
            </button>
            </div>
          )
        });
      } else {
        fetch("./data/layers/" + page + ".md").then(res => {
          return res.text()
        }).then(res => {
          this.setState({
            pagedata: md.render(res),
          });
        });
      }
  }

  render() {

    if (!this.state.geodata) {
      return <span>Waiting...</span>
    }

    const options = [
      { value: 'gender', label: 'Gender of Interviewee' },
      { value: 'race', label: 'Race of Interviewee' },
      { value: null, label: '[Reset]' }
    ];

    const map = (
      <div id="map-container">
        <Map
          bounds={[[25.53511, -92.33793], [38.47061, -75.68696]]}
          zoomControl={false}
          scrollWheelZoom={false}
          touchZoom={false}
          minZoom={5}
          maxZoom={10}
          maxBounds={[[20, -95], [45, -70]]}
          attributionControl={false}>
          <ZoomControl
            position='topright'
            />
          <Legend
            position='bottomright'
            color='race'
            id="legend-race"
            />
          <Legend
            position='bottomright'
            color='gender'
            id="legend-gender"
            />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=""
            scrollWheelZoom="false"
            touchZoom="false"
            doubleClickZoom="false"
          />

          {this.state.geodata.map( (val, i) => {

            var tcolor = "black";
            if (this.state.mapstate.value === "race") tcolor = val.race;
            if (this.state.mapstate.value === "gender") tcolor = val.gender;

            return (
              <div key={i}>
              <CircleMarker
                center={[val.lat, val.lon]}
                radius={5}
                color={tcolor}
                stroke={false}
                onClick={() => this.handleInterview(val.id)}>
                <Tooltip direction="top" offset={[0,-6]}>
                  <b>{val.title}</b><br/>
                  Interviewer: {val.interviewer}
                </Tooltip>
              </CircleMarker>
              </div>
            )
          })}

          <div className="leaflet-top leaflet-left" style={{pointerEvents: 'auto', paddingLeft: "12px", paddingTop: "12px"}}>
            <div style={{fontSize: "16px", marginBottom: "12pt", display:"inline"}}>
               <Dropdown options={options}
                value={this.state.mapstate.value === null ? null : this.state.mapstate}
                placeholder="Color interviews by..."
                onChange={(e) => this.handleMapstateChange(e)}
                className="dropdown"
                />
            </div>
          </div>
        </Map>
      </div>
    )

    return (
    <div>
    <div id="header">

      <span onClick={() => this.handleChangePage(0)}>
        Voice of a Nation: Life Histories in New Deal America
      </span>

      <div className="btn-group">
        <button
          className={this.state.page === 1 ? "active" : ""}
          onClick={() => this.handleChangePage(1)}>1</button>
        <button
          className={this.state.page === 2 ? "active" : ""}
          onClick={() => this.handleChangePage(2)}>2</button>
        <button
          className={this.state.page === 3 ? "active" : ""}
          onClick={() => this.handleChangePage(3)}>3</button>
        <button
          className={this.state.page === 4 ? "active" : ""}
          onClick={() => this.handleChangePage(4)}>4</button>
        <button
          className={this.state.page === 5 ? "active" : ""}
          onClick={() => this.handleChangePage(5)}>5</button>
        <button
          className={this.state.page === 6 ? "active" : ""}
          onClick={() => this.handleChangePage(6)}>6</button>
        <button
          className={this.state.page === 0 ? "btn-text active" : "btn-text"}
          onClick={() => this.handleChangePage(0)}>Contents</button>
      </div>
    </div>

    <TextBox
      page={this.state.page}
      pagedata={this.state.pagedata}
    />

    <div id="multi-container" onClick={() => this.handleOverlay(false)} className={this.state.overlay ? "" : "hidden-sml"}>
      <div
        id="welcome-container"
        className={this.state.welcome ? "" : "hidden"}>
        <div className="welcome-msg" onClick={() => this.handleWelcome(false)}>
          <h3>Mapping Southern Life Histories</h3>
          <p>
            The interactive map in this panel show over 1100 oral histories taken
            by the Southern Life Histories Project from 1939 to 1941. Points are
            mapped to where each oral history was recorded. Clicking on
            a dot to display metadata and the text from each digitized life
            history. Points can further colored by the demographics of the
            interviewees from the pull down menu in the upper left-hand corner
            of the map.
          </p>
          <div style={{width: "100%", textAlign: "center"}}>
            <button onClick={() => this.handleWelcome(false)}>Enter</button>
          </div>
        </div>
      </div>
      <InterviewBox
        interview={this.state.interview}
        interviewdata={this.state.interviewdata}
        interviewmedia={this.state.interviewmedia}
        handleInterview={this.handleInterview.bind(this)}
        handleMediaButton={this.handleMediaButton.bind(this)}
      />
      <div id="map-container">
        {map}
      </div>
      <div id="img-container" className={this.state.image >= 0 ? "" : "hidden"}>
        <div id="img-fig">
          <img className="img-main" alt="" src="img/people.png">
          </img>
          <img
            className="svg-close"
            src="static/close.svg"
            width="30"
            height="30"
            alt=""
            onClick={() => this.handleImage(-1)}/>
          <p>Figure 1. Here is a caption about this image that relates to the text on the left in some way (hopefully).</p>
        </div>
      </div>
    </div>

    <div id="footer">
      <span id="authors">T. Arnold, C. Rivard, L. Tilton</span>
      <span id="notice">Digital Project &mdash; Currently Under Review </span>
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
