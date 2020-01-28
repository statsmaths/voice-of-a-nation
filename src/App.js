import React from 'react';
import Dropdown from 'react-dropdown';

import {
  Map, CircleMarker, TileLayer, ZoomControl, Tooltip
} from 'react-leaflet';
import Legend from "./Legend";
import { Layer0 } from "./layers/Layer0";
import { Layer1 } from "./layers/Layer1";
import { Layer2 } from "./layers/Layer2";
import { Layer3 } from "./layers/Layer3";
import { Layer4 } from "./layers/Layer4";
import { Layer5 } from "./layers/Layer5";
import { Layer6 } from "./layers/Layer6";

import 'leaflet/dist/leaflet.css';
import 'react-dropdown/style.css';
import './reset.css';
import './App.css';

// ***************************************************************************
// Helper function(s)

function padZeros(number, pad) {
    return ("0".repeat(pad) + number).toString().substr(-pad, pad);
}

// ***************************************************************************
// Return the text box

class TextBox extends React.Component {

  render() {

    // *************************************************************
    var data = null;
    if (this.props.page === 0)
    {
      data = <Layer0
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 1)
    {
      data = <Layer1
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 2)
    {
      data = <Layer2
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 3)
    {
      data = <Layer3
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 4)
    {
      data = <Layer4
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 5)
    {
      data = <Layer5
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 6)
    {
      data = <Layer6
        handlePage={this.props.handlePage}
      />;
    }
    // *************************************************************

    var button = null;
    if (this.props.page !== 0)
    {
      button = (<button
        id="text-btn-back"
        onClick={() => this.props.handlePage(0)}>&laquo; Back</button>)
    }

    return(
      <div id="textbox">
        {button}
        <button
          id="text-btn-map"
          onClick={this.props.clickmap}>Map&raquo;</button>
        <button
          id="text-btn-topic"
          onClick={this.props.clicktopic}>Topics&raquo;</button>
        {data}
      </div>
    )
  }
}

// ***************************************************************************
// Class to hold all of the data about a specific interview

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
          <li>
            Title: <span>{this.props.interviewdata.title}</span>
          </li>
          <li>
            Interviewee(s): <span>{this.props.interviewdata.interviewee}</span>
          </li>
          <li>
            Interviewer(s): <span>{this.props.interviewdata.interviewer}</span>
          </li>
          <li>
            Reviser(s): <span>{this.props.interviewdata.reviser}</span>
          </li>
          <li>
            Date: <span>{this.props.interviewdata.date}</span>
          </li>
          <li>
            Location: <span>{this.props.interviewdata.location}</span>
          </li>
          <li>
            Gender (Interviewee): <span>{this.props.interviewdata.gender}</span>
          </li>
          <li>
            Race (Interviewee): <span>{this.props.interviewdata.race}</span>
          </li>
          <li>
            Occupation: <span>{this.props.interviewdata.occupation}</span>
          </li>
        </ul>
      )
    } else {
      response = (
        <embed
          src={"./data/pdfs/03709_" + padZeros(this.props.interview, 4) + ".pdf"}
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
              onClick={() => {
                window.open("./data/pdfs/03709_" +
                  padZeros(this.props.interviewdata.id, 4) + ".pdf")
              }}>
              pdf (download)
            </button>
            <button
              onClick={() => {
                window.open("./data/xml/interview_" +
                  padZeros(this.props.interviewdata.id, 4) + ".xml")
              }}>
              xml
            </button>
            <button
              onClick={() => {
                window.open("./data/text/interview_" +
                  padZeros(this.props.interviewdata.id, 4) + ".txt")
              }}>
              text
            </button>
          </div>
          <hr width="100%"/>
          {response}
          <img
            className="svg-close"
            src="static/close-black.svg"
            width="20"
            height="20"
            onClick={() => this.props.handleInterview(-1)}
            alt=""/>
        </div>
      </div>
    )
  }
}

class InterviewTopicBox extends React.Component {

  render() {

    if (!this.props.interviewdata)
    {
      return null
    }

    return(
      <div className="topic-meta">
        <div className="interview-btn-grp">
          <button
            onClick={() => window.open("./data/pdfs/03709_" +
              padZeros(this.props.interviewdata.id, 4) + ".pdf")}>
            pdf
          </button>
          <button
            onClick={() => {
              window.open("./data/xml/interview_" +
                padZeros(this.props.interviewdata.id, 4) + ".xml")
            }}>
            xml
          </button>
          <button
            onClick={() => {
              window.open("./data/text/interview_" +
                padZeros(this.props.interviewdata.id, 4) + ".txt")
            }}>
            text
          </button>
        </div>
        <ul>
          <li>
            Title: <span>{this.props.interviewdata.title}</span>
          </li>
          <li>
            Interviewee(s): <span>{this.props.interviewdata.interviewee}</span>
          </li>
          <li>
            Interviewer(s): <span>{this.props.interviewdata.interviewer}</span>
          </li>
          <li>
            Reviser(s): <span>{this.props.interviewdata.reviser}</span>
          </li>
          <li>
            Date: <span>{this.props.interviewdata.date}</span>
          </li>
          <li>
            Location: <span>{this.props.interviewdata.location}</span>
          </li>
          <li>
            Gender (Interviewee): <span>{this.props.interviewdata.gender}</span>
          </li>
          <li>
            Race (Interviewee): <span>{this.props.interviewdata.race}</span>
          </li>
          <li>
            Occupation: <span>{this.props.interviewdata.occupation}</span>
          </li>
        </ul>
      </div>
    )
  }
}

// ***************************************************************************
// Class to hold the topic model

function TopicCircles(props) {
  return(
    <div className="topic-circle-container">
      {props.data.map( (val, i) => {
        return(
          <div
            key={val.num}
            className="topic-circle"
            onClick={() => props.clickfun(i)}>
            <div
              className="topic-circle-inner"
              style={{
                left: val.x + "%",
                bottom: val.y + "%",
                width: (val.r * 2) + "px",
                height: (val.r * 2) + "px",
                lineHeight: (val.r * 2) + "px",
                borderRadius:val.r + "px"
              }}>
              <span>{val.num}</span>
            </div>
            <div
              className="topic-circle-overlay"
              style={{
                left: val.x + "%",
                bottom: val.y + "%",
                width: (val.r * 2) + "px",
                height: (val.r * 2) + "px",
                lineHeight: (val.r * 2) + "px",
                borderRadius:val.r + "px"
              }}>
              <span>{val.name}</span>
            </div>
          </div>
        )
      })}

    </div>
  )
}

function ListBar(props) {
  var maxval = Math.max(...props.weights);
  var weights = props.weights.map(val => {
    return(100 * val / maxval)
  })

  return(
    <div
      className={"topic-list-container" + props.class}
      style={{width: props.width}}>
      <div className="topic-list-title">
        <span>{props.title}</span>
      </div>
      <div className="topic-list-row topic-list-row-head">
        <span>{props.titleleft}</span>
        <span>{props.titleright}</span>
      </div>
      {props.items.map( (val, i) => {
        var numcol = null;

        if (props.numcol) {
          numcol = (
            <div className="topic-list-percent">
              <span>{Math.round(props.weights[i]) + "%"}</span>
            </div>
          )
        }

        var clickid = i;
        if (props.clickids) {
          clickid = props.clickids[i];
        }

        var clickfun = props.clickfun;
        var clickclass = "topic-list-row";
        if (!clickfun) {
          clickfun = function() {};
          clickclass = "topic-list-row noclick"
        }

        return(
          <div
            className={clickclass}
            key={i}
            onClick={() => clickfun(clickid)}
            >
            <div
              className="topic-list-text">
              <span>{val}</span>
            </div>
            {numcol}
            <div className="topic-list-size">
              <div
                className="topic-list-inner"
                style={{width: weights[i] + "%"}}>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

class TopicContainer extends React.Component {

  // Override two standard methods of React.Component //

  constructor(props) {
    super(props);
    this.state = {
      td: null,
      interviewdata: null,
      interviewmedia: 'meta',
      topicstate: 'grid',
      topic: 0,
      topicdoc: 0
    }
  }

  componentDidMount() {
    fetch("./data/topicdata.json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        td: res,
      });
    });
  }

  handleChangeTopic(topic) {
    this.setState({
      topic: topic,
      topicstate: 'topic',
    });
  }

  handleChangeTopicDoc(topicdoc) {
    this.setState({
      topicdoc: topicdoc,
      topicstate: 'doc',
    });

    fetch("./data/interviews/" + topicdoc + ".json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        interviewdata: res,
      });
    });
  }

  handleChangeTopicstate(value) {
    this.setState({
      topicstate: value,
    });
  }

  handleMediaButton(value) {
    this.setState({
      interviewmedia: value,
    });
  }

  render() {

    if (!this.state.td) {
      return <span>Waiting...</span>
    }

    const cls = this.props.hidden ? "topic-hide" : "";

    var topicpart = null;
    if (this.state.topicstate === "grid") {
      topicpart = (
        <div className="topic-part">
          <TopicCircles
            data={this.state.td.all}
            clickfun={this.handleChangeTopic.bind(this)}
          />
        </div>
      );
    }
    if (this.state.topicstate === "list") {
      topicpart = (
        <div className="topic-part">
          <ListBar
            titleleft="topic"
            titleright="proportion of corpus"
            items={this.state.td.all.map(val => {return(val.description)})}
            weights={this.state.td.all.map(val => {return(val.proportion)})}
            width="600px"
            clickfun={this.handleChangeTopic.bind(this)}
            numcol={true}
            class=""
          />
        </div>
      );
    }
    if (this.state.topicstate === "topic") {
      topicpart = (
        <div className="topic-part">
          <div style={{width: '900px'}}>
          <ListBar
            title="Associated Words"
            titleleft="word"
            titleright="proportion of corpus"
            items={this.state.td.topics[this.state.topic].top_word}
            weights={this.state.td.topics[this.state.topic].word_wgt}
            width="250px"
            numcol={false}
            class=""
          />
          <ListBar
            title="Associated Interviews"
            titleleft="interview"
            titleright="proportion in topic"
            items={this.state.td.topics[this.state.topic].top_docs}
            weights={this.state.td.topics[this.state.topic].doc_perc}
            width="400px"
            clickfun={this.handleChangeTopicDoc.bind(this)}
            clickids={this.state.td.topics[this.state.topic].top_docs_ids}
            numcol={true}
            class=" topic-list-two"
          />
          </div>
        </div>
      );
    }
    if (this.state.topicstate === "doc") {
      topicpart = (
        <div>
          <InterviewTopicBox
            interview={this.state.interview}
            interviewdata={this.state.interviewdata}
            interviewmedia={this.state.interviewmedia}
            handleMediaButton={this.handleMediaButton.bind(this)}
          />
          <div className="topic-part">
            <ListBar
              titleleft="Topic"
              titleright="proportion of document"
              items={this.state.td.docs[this.state.topicdoc].top_topics}
              weights={this.state.td.docs[this.state.topicdoc].topic_weights}
              clickfun={this.handleChangeTopic.bind(this)}
              clickids={this.state.td.docs[this.state.topicdoc].top_topics_ids}
              width="300px"
              numcol={true}
              class=""
            />
          </div>
        </div>
      );
    }

    var header = "Topics";
    var description = null;
    if (this.state.topicstate === "grid") {
      header = "Topics — Plot";
      description = (
        <p>
          In order to identify themes across the corpus of oral interviews we
          have applied a computational model called
          <a href="https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation" target="_blank" rel="noopener noreferrer"> latent Dirchlet allocation (LDA)</a>.
          The model has identified 16 topics&mdash;groups of weighted words&mdash;that it
          has determined have some themetical similarity. In the box below, each
          topic is represented by a bubble. Topics that share common words are
          displayed near each other; topics with more documents are displayed
          with larger bubble sizes. Hovering over a topic will display the, manually
          assigned, name of the topic. Clicking on a topic will open a
          description of the topic itself. You can also
          <span onClick={() => this.handleChangeTopicstate("list")}> view the topics as a list</span>.
        </p>
      );
    }
    if (this.state.topicstate === "list") {
      header = "Topics — List";
      description = (
        <p>
          In order to identify themes across the corpus of oral interviews we
          have applied a computational model called
          <a href="https://en.wikipedia.org/wiki/Latent_Dirichlet_allocation" target="_blank" rel="noopener noreferrer"> latent Dirchlet allocation (LDA)</a>.
          The model has identified 16 topics&mdash;groups of weighted words&mdash;that it
          has determined have some themetical similarity. In the table below, each
          topic is displayed along with its five most strongly associated words
          You can also
          <span onClick={() => this.handleChangeTopicstate("grid")}> view the topics as a plot </span>
          that visualizes the semantic relationships between topics.
        </p>
      );
    }
    if (this.state.topicstate === "topic") {
      header = "Topic " + (this.state.topic + 1);
      description = (
        <p>
          Details of this topic, as identified by LDA, are shown below. Every
          word in the corpus is given a score relative to each topic, and the
          table on the left shows those words most strongly associated with
          this topic. Similarly, each document is broken down into a score
          across all of the topics. The table on the right shows those interviews
          most strongly associated with topic, along with the percentage match
          between the topic and interview. Clicking on an interview will show
          metadata and the contents of the interview itself.
        </p>
      );
    }
    if (this.state.topicstate === "doc") {
      header = "Document " + (this.state.topicdoc + 1);
      description = null;
    }

    return (
      <div className={"topic-container " + cls}>
        <div className="topic-btn-grp">
          <button
            className={this.state.topicstate === "grid" ? "active" : ""}
            onClick={() => this.handleChangeTopicstate("grid")}
            >
            Plot
          </button>
          <button
            className={this.state.topicstate === "list" ? "active" : ""}
            onClick={() => this.handleChangeTopicstate("list")}
            >
            List
          </button>
        </div>
        <div className="topic-header">
          <span>{header}</span>
          {description}
        </div>
        {topicpart}
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
      geodata: null,
      interview: -1,
      interviewdata: null,
      interviewmedia: 'meta',
      image: -1,
      mapstate: { value: null, label: '[Reset]' },
      mapfilter: { value: null, label: '[Reset]' },
      welcome: true,
      intertype: 'map',
      overtype: false,
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

    this.handlePage(this.state.page);
  }

  handleMapstateChange(value) {

    var legend = document.getElementById("legend-race");
    if (value.value === "race" | value.value === "racei")
    {
      legend.style.visibility = "visible";
      legend.style.display = "inline";
    } else {
      legend.style.visibility = "hidden";
      legend.style.display = "none";
    }
    legend = document.getElementById("legend-gender");
    if (value.value === "gender" | value.value === "genderi")
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

  handleMapfilterChange(value) {
    this.setState({
      mapfilter: value,
    });
  }

  handleOvertypeChange(value, intertype) {
    this.setState({
      overtype: value,
    });

    if (intertype) this.handleIntertype(intertype);
    if (intertype === "topic") {
      this.handleWelcome(false);
    }
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

    this.handleWelcome(false);

    this.setState({
      overlay: value,
      media: media
    });
  }

  handleIntertype(value) {
    if (value === "map") {
      this.handleMapstateChange({ value: null, label: '[Reset]' });
      this.handleMapfilterChange({ value: null, label: '[Reset]' });
    }

    this.setState({
      intertype: value,
      interview: -1
    });

  }

  handlePage(page) {
      this.handleOvertypeChange(false);

      this.setState({
        page: page,
        data: null,
      });
  }

  render() {

    if (!this.state.geodata) {
      return <span>Waiting...</span>
    }

    const options = [
      { value: 'gender', label: 'Gender of Interviewee' },
      { value: 'race', label: 'Race of Interviewee' },
      { value: 'genderi', label: 'Gender of Interviewer' },
      { value: 'racei', label: 'Race of Interviewer' },
      { value: null, label: '[Reset]' }
    ];

    const options_int = [
      { value: null, label: '[Reset]' },
      { value: 'bernicekellyharris', label: 'Bernice Kelly Harris [83]' },
      { value: 'maryahicks', label: 'Mary A. Hicks [51]' },
      { value: 'roseshepherd', label: 'Rose Shepherd [40]' },
      { value: 'gracemccune', label: 'Grace McCune [39]' },
      { value: 'sadiebhornsby', label: 'Sadie B. Hornsby [39]' },
      { value: 'williamoforster', label: 'William O. Forster [36]' },
      { value: 'idalmoore', label: 'Ida L. Moore [35]' },
      { value: 'wwdixon', label: 'W.W. Dixon [25]' },
      { value: 'adyleengmerrick', label: 'Adyleen G. Merrick [22]' },
      { value: 'wosaunders', label: 'W. O. Saunders [21]' }
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
            if (this.state.mapstate.value === "racei") tcolor = val.racei;
            if (this.state.mapstate.value === "genderi") tcolor = val.genderi;

            if (this.state.mapfilter.value !== null) {
              if (val.ishow !== this.state.mapfilter.value) {
                return (null)
              }
            }

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

          <div className="custom-leaflet leaflet-top leaflet-right">
            <div className="custom-leaflet-inner" >
               <Dropdown options={options}
                value={
                  this.state.mapstate.value === null ?
                  null : this.state.mapstate
                }
                placeholder="Color interviews by..."
                onChange={(e) => this.handleMapstateChange(e)}
                className="dropdown"
                />
               <Dropdown options={options_int}
                value={
                  this.state.mapfilter.value === null ?
                  null : this.state.mapfilter
                }
                placeholder="Filter by interviewer..."
                onChange={(e) => this.handleMapfilterChange(e)}
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

      <span onClick={() => this.handlePage(0)}>
        Voice of a Nation: Life Histories in New Deal America
      </span>

      <div className="btn-group">
        <button
          className={this.state.page === 1 ? "active" : ""}
          onClick={() => this.handlePage(1)}>I</button>
        <button
          className={this.state.page === 2 ? "active" : ""}
          onClick={() => this.handlePage(2)}>1</button>
        <button
          className={this.state.page === 3 ? "active" : ""}
          onClick={() => this.handlePage(3)}>2</button>
        <button
          className={this.state.page === 4 ? "active" : ""}
          onClick={() => this.handlePage(4)}>3</button>
        <button
          className={this.state.page === 6 ? "active" : ""}
          onClick={() => this.handlePage(6)}>C</button>
        <button
          className={this.state.page === 7 ? "active" : ""}
          onClick={() => this.handlePage(7)}>M</button>
        <button
          className={this.state.page === 0 ? "btn-text active" : "btn-text"}
          onClick={() => this.handlePage(0)}>Contents</button>
      </div>
    </div>

    <TextBox
      page={this.state.page}
      handlePage={this.handlePage.bind(this)}
      clickmap={() => this.handleOvertypeChange(true, 'map')}
      clicktopic={() => this.handleOvertypeChange(true, 'topic')}
    />

    <div
      id="multi-container"
      onClick={() => this.handleOverlay(false)}
      className={this.state.overtype ? "" : "hidden-sml"}>
      <button
        id="multi-btn-back"
        onClick={() => this.handleOvertypeChange(false)}>&laquo; Text</button>
      <div
        id="welcome-container"
        className={this.state.welcome ? "" : "hidden"}>
        <div className="welcome-msg" onClick={() => this.handleWelcome(false)}>
          <h3>Mapping Southern Life Histories</h3>
          <p>
            The interactive map in this panel show over 1100 oral histories
            by the Southern Life Histories Project from 1939 to 1941. Points
            are mapped to where each oral history was recorded. Clicking on
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
      <TopicContainer
        hidden={this.state.intertype !== "topic"}
      />
      <div id="map-container">
        {map}
      </div>
      <div className="overlay-btn-grp">
        <button
          className={this.state.intertype === "map" ? "active" : ""}
          onClick={() => this.handleIntertype("map")}
          >
          Map
        </button>
        <button
          className={this.state.intertype === "topic" ? "active" : ""}
          onClick={() => this.handleIntertype("topic")}
          >
          Topics
        </button>
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
