import React from 'react';
import Select from 'react-select';

import './topiccontainer.css';

// ***************************************************************************
// Helper function(s)

var model_options = [
  {"label": "Topic Model", "value": "topic_nodialect"},
  {"label": "Topic Model (dialect)", "value": "topic_dialect"},
  {"label": "Document Clustering", "value": "cluster_nodialect"},
  {"label": "Document Clustering (dialect)", "value": "cluster_dialect"},
]

var meta_options = [
  {"label": "Proportion", "value": "proportion"},
  {"label": "Women Interviewees", "value": "gender"},
  {"label": "Black Interviewees", "value": "race"},
  {"label": "Women Writers", "value": "gender_writer"},
  {"label": "Black Writers", "value": "race_writer"},
]

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
      td: null,
      interviewmedia: 'meta',
      topicstate: 'grid',
      themename: null,
      selectedOption: null,
      selectedMetaOption: {"label": "Proportion", "value": "proportion"},
      topic: 0,
      topicdoc: 0
    }
  }

  handleChangeTopic(topic) {
    this.setState({
      topic: topic,
      topicstate: 'topic',
    });
  }

  handleChangeTopicDoc(topicdoc) {
    window.open(
      "/data/xml/" + this.state.td.docs[topicdoc].id + ".xml", '_blank'
    );
  }

  handleChangeTopicstate(value) {
    this.setState({
      topicstate: value,
    });
  }

  handleSelectMetaChange = (selectedMetaOption) => {
    this.setState({ selectedMetaOption });
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ selectedOption });
    fetch("./data/theme/" + selectedOption.value + ".json").then(res => {
      return res.json()
    }).then(res => {
      this.setState({
        td: res,
        themename: selectedOption.value,
        topicstate: 'grid'
      });
    });
  }

  render() {

    var select_box = (<div className="select-group">
              <Select
                options={ model_options }
                className="myselect"
                isSearchable={false}
                placeholder="Select a Model"
                onChange={ this.handleSelectChange }
                value={ this.state.selectedOption }
                />
              <Select
                options={ meta_options }
                className="myselect"
                isSearchable={false}
                placeholder=""
                onChange={ this.handleSelectMetaChange }
                value={ this.state.selectedMetaOption }
                />
            </div>);

    if (!this.state.td) {
      return (<div className={"topic-container "}>
        <div className="topic-header">
          <span>Select a Topic or Clustering Model</span>
        </div>
        {select_box}
      </div>
      )
    }

    var topicpart = null;

    if (this.state.topicstate === "grid") {
      var weights = this.state.td.all.map(val => {return(val.proportion)});
      var weights_name = "Corpus %";

      if (this.state.selectedMetaOption.value === "gender")
      {
        weights = this.state.td.all.map(val => {return(val.proportion_women)});
        console.log(this.state.td.all[0])
        weights_name = "Female Interviewees (%)";
      }
      if (this.state.selectedMetaOption.value === "race")
      {
        weights = this.state.td.all.map(val => {return(val.proportion_black)});
        console.log(this.state.td.all[0])
        weights_name = "Black Interviewees (%)";
      }
      if (this.state.selectedMetaOption.value === "gender_writer")
      {
        weights = this.state.td.all.map(val => {return(val.proportion_women_writer)});
        console.log(this.state.td.all[0])
        weights_name = "Female Writers (%)";
      }
      if (this.state.selectedMetaOption.value === "race_writer")
      {
        weights = this.state.td.all.map(val => {return(val.proportion_black_writer)});
        console.log(this.state.td.all[0])
        weights_name = "Black Writers (%)";
      }

      topicpart = (
        <div className="topic-part">
          <ListBar
            titleleft="topic"
            titleright={weights_name}
            items={this.state.td.all.map(val => {return(val.description)})}
            weights={weights}
            width="600px"
            clickfun={this.handleChangeTopic.bind(this)}
            numcol={true}
            class=""
          />
        </div>
      );
    }

    let theme_type = (
      (this.state.themename === "topic_nodialect") |
      (this.state.themename === "topic_dialect")) ? "Topic" :  "Cluster";

    if (this.state.topicstate === "topic") {
      topicpart = (
        <div>
          <div className="theme-header">
            <h2>{theme_type + " " + (this.state.topic + 1)}</h2>
            <span
              className="topic-span"
              onClick={() => this.handleChangeTopicstate("grid")}>
              {"[All " + theme_type + "s]"}
            </span>
          </div>
          <div className="topic-part">
            <div style={{width: '900px'}}>
            <ListBar
              title="Associated Words"
              titleleft="word"
              titleright="weight"
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
        </div>
      );
    }

    return (
      <div className={"topic-container "}>
        <div className="topic-header">
          <span>Select a Topic or Clustering Model</span>
        </div>
        {select_box}
        {topicpart}
      </div>
    )
  }
}


export {TopicContainer};
