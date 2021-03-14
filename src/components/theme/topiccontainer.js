import React from 'react';
import Select, { components } from 'react-select';
import {
  useHistory
} from "react-router-dom";

import './topiccontainer.css';

// ***************************************************************************
// Helper function(s)

const model_options = [
  {"label": "Topic Model", "value": "topic_nodialect"},
  {"label": "Topic Model (dialect)", "value": "topic_dialect"},
  {"label": "Document Clustering", "value": "cluster_nodialect"},
  {"label": "Document Clustering (dialect)", "value": "cluster_dialect"},
]

const meta_options = [
  {"label": "Proportion", "value": "proportion"},
  {"label": "Women Interviewees", "value": "gender"},
  {"label": "Black Interviewees", "value": "race"},
  {"label": "Women Writers", "value": "gender_writer"},
  {"label": "Black Writers", "value": "race_writer"},
]

const theme_labels = {
  "topic_nodialect": "Topic Model",
  "topic_dialect": "Topic Model (with dialect)",
  "cluster_nodialect": "Document Clustering",
  "cluster_dialect": "Document Clustering (with dialect)"
}

const meta_labels = {
  "proportion": "Corpus %",
  "gender": "Female Interviewees (%)",
  "race": "Black Interviewees (%)",
  "gender_writer": "Female Writers (%)",
  "race_writer": "Black Writers (%)",
}

function ThemeOption(props)
{
  let history = useHistory();
  function handleClick(data) {
    let res = new URLSearchParams(history.location.search);
    res.set("type", data.value);
    res.set("prop", "proportion");
    res.set("cnum", -1);

    history.push({
        "pathname": "/theme",
        "search": "?" + res.toString()
    });
  }

  return (
    <div onClick={() => handleClick(props.data)}>
      <components.Option {...props} />
    </div>
  );
};

function MetaOption(props)
{
  let history = useHistory();

  function handleClick(data) {
    let res = new URLSearchParams(history.location.search);
    res.set("prop", data.value);

    history.push({
        "pathname": "/theme",
        "search": "?" + res.toString()
    });
  }

  return (
    <div onClick={() => handleClick(props.data)}>
      <components.Option {...props} />
    </div>
  );
};

function AllTopics(props) {
  let history = useHistory();

  function handleClick() {
    let res = new URLSearchParams(history.location.search);
    res.set("cnum", -1);

    history.push({
        "pathname": "/theme",
        "search": "?" + res.toString()
    });
  }

  return (
    <span
      className="topic-span"
      onClick={() => handleClick()}>
      {props.content}
    </span>
  );


}

function queryUrl(query, key, fallback = null) {
  let res = (new URLSearchParams(query)).get(key);
  return res === null ? fallback : res;
}

function TopicBar(props) {

  let history = useHistory();

  function handleClick(i) {
    let res = new URLSearchParams(history.location.search);
    res.set("cnum", i);

    history.push({
        "pathname": "/theme",
        "search": "?" + res.toString()
    });
  }

  var maxval = Math.max(...props.weights);
  var weights = props.weights.map(val => { return(100 * val / maxval) })

  let rows = props.td.all.map( (val, i) => {

    return(
      <div
        className="topic-list-row"
        key={i}
        onClick={() => handleClick(i + 1)}
        >
        <div
          className="topic-list-text">
          <span>{val.description}</span>
        </div>
        <div className="topic-list-percent">
          <span>{Math.round(props.weights[i]) + "%"}</span>
        </div>
        <div className="topic-list-size">
        <div
          className="topic-list-inner"
          style={{width: weights[i] + "%"}}>
        </div>
        </div>
      </div>
    )
  })

  return(
    <div
      className="topic-list-container"
      style={{width: "600px"}}>
      <div className="topic-list-title">
        <span>{props.title}</span>
      </div>
      <div className="topic-list-row topic-list-row-head">
        <span>{props.mname}</span>
        <span>{props.wname}</span>
      </div>
      {rows}
    </div>
  )

}

function openXmlId(id) { window.open("./data/xml/" + id + ".xml", '_blank'); }

function DocBar(props) {

  let w = props.td.topics[props.cnum - 1].doc_perc
  var maxval = Math.max(...w);
  var weights = w.map(val => { return(100 * val / maxval) })

  return(
    <div
      className="topic-list-container topic-list-two"
      style={{width: "400px"}}>
      <div className="topic-list-title">
        <span>Associated Interviews</span>
      </div>
      <div className="topic-list-row topic-list-row-head">
        <span>Life History</span>
        <span>Probability in Topic</span>
      </div>
      {props.td.topics[props.cnum - 1].top_docs.map( (val, i) => {
        let clickid = props.td.docs[
          props.td.topics[props.cnum - 1].top_docs_ids[i]
        ].id;
        return(
          <div
            className="topic-list-row"
            key={i}
            onClick={() => openXmlId(clickid)}
            >
            <div
              className="topic-list-text">
              <span>{val}</span>
            </div>
            <div className="topic-list-percent">
              <span>{Math.round(weights[i]) + "%"}</span>
            </div>
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

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      topicstate: 'grid',
      selectedOption: null,
      selectedMetaOption: {"label": "Proportion", "value": "proportion"}
    }
  }

  componentDidMount(option) {
    fetch("./data/json/theme.json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        data: res
      });
    })
  }

  render() {

    if (!this.state.data) {
      return <div className="topic-container"><span></span></div>
    }

    let prop = queryUrl(this.props.location.search, "prop", "proportion");
    let type = queryUrl(this.props.location.search, "type", "topic_nodialect");
    if (!meta_labels.hasOwnProperty(prop)) { prop = "proportion"; }
    if (!theme_labels.hasOwnProperty(type)) { prop = "topic_nodialect"; }
    let td = this.state.data[type];

    let cnum = parseInt(queryUrl(this.props.location.search, "cnum", -1));
    if (isNaN(cnum) | cnum < -1 | cnum === 0 | cnum > td.topics.length)
    {
      cnum = -1;
    }
    let theme_type = (
      (type === "topic_nodialect") |
      (type === "topic_dialect")) ? "Topic" :  "Cluster";

    var topicpart = null;

    if (cnum === -1) {
      topicpart = (
        <div>
          <div className="topic-part">
            <TopicBar
              td={td}
              weights={td.all.map(val => {return(val[prop])})}
              mname={theme_labels[type]}
              wname={meta_labels[prop]}
            />
          </div>
        </div>
      );
    } else {
      topicpart = (
        <div>
          <div className="theme-header">
            <h2>{theme_type + " " + (cnum)}</h2>
            <AllTopics
              content={"[All " + theme_type + "s]"}
            />
          </div>
          <div className="topic-part">
            <div style={{width: '900px'}}>
            <ListBar
              title="Associated Words"
              titleleft="word"
              titleright="weight"
              items={td.topics[cnum - 1].top_word}
              weights={td.topics[cnum - 1].word_wgt}
              width="250px"
              numcol={false}
              class=""
            />
            <DocBar
              td={td}
              cnum={cnum}
              mname={theme_labels[type]}
              wname={meta_labels[prop]}
            />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="topic-container">
        <div className="topic-header">
          <span>Topic Models and Document Clusters</span>
        </div>
        <div className="select-group">
          <Select
            options={ model_options }
            className="myselect"
            isSearchable={false}
            components={{ Option: ThemeOption }}
            placeholder="Select a new model"
            value={null}
            />
          <Select
            options={ meta_options }
            className="myselect"
            isSearchable={false}
            components={{ Option: MetaOption }}
            placeholder="Select a new metric"
            value={null}
            />
        </div>
        {topicpart}
      </div>
    )
  }
}

export {TopicContainer};
