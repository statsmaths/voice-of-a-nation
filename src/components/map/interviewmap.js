  import React from 'react';
import Dropdown from 'react-dropdown';

import {
  Map, Circle, TileLayer, ZoomControl, Tooltip
} from 'react-leaflet';
import { Legend } from "./legend.js";
import { InterviewBox } from "./interviewbox.js";

import 'react-dropdown/style.css';
import 'leaflet/dist/leaflet.css';
import './interviewmap.css';


class InterviewMap extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        geodata: null,
        geolegend: null,
        mapname: { value: "geo_all.json", label: 'All Interviews' },
        selectid: -1,
      }
    }

    componentDidMount() {
      this.handleMapnameChange(this.state.mapname);
    }

    handleMapnameChange(option) {
      fetch("./data/geo/" + option.value).then(res => {
        return res.json()
      }).then(res => {
        this.setState({
          geodata: res.points,
          geolegend: res.legend,
          mapname: option,
          selectid: -1
        });
      })
    }

    handleSelectPoint(value) {
      console.log(this.state.geolegend);
      this.setState({
        selectid: value,
      });
    }

    render() {

      if (!this.state.geodata) {
        return <span>Waiting...</span>
      }

      const mapname_options = [
        { value: 'geo_all.json', label: 'All Interviews' },
        { value: 'geo_writers.json', label: 'Prolific Writers' },
        { value: 'geo_women_writers.json', label: 'Women Writers' },
        { value: 'geo_black_writers.json', label: 'Black Writers' },
        { value: 'geo_ethnic.json', label: 'Interviewee Ethnicity' },
        { value: 'geo_occupation.json', label: 'Occupations' }
      ];

      var map = (
        <div id="map-container">
          <Map
            bounds={[[25.53511, -92.33793], [38.47061, -75.68696]]}
            zoomControl={false}
            scrollWheelZoom={false}
            touchZoom={false}
            minZoom={5}
            maxZoom={8}
            maxBounds={[[20, -95], [45, -70]]}
            attributionControl={false}>
            <ZoomControl
              position='topright'
              />
            <Legend
              position='bottomright'
              geolegend={this.state.geolegend}
              />
            <TileLayer
              url="./data/tiles/{z}/{x}/{y}.png"
              attribution=""
              scrollWheelZoom="false"
              touchZoom="false"
              doubleClickZoom="false"
            />

            {
              this.state.geodata.map( (val, i) => {
                return (
                  <div key={i}>
                    <Circle
                      center={[val.lat, val.lon]}
                      radius={val.size * 1600}
                      color={val.color}
                      stroke={false}
                      onClick={() => this.handleSelectPoint(i)}>
                      <Tooltip direction="top" offset={[0,-6]}>
                        <b>{val.title}</b><br/>
                        {val.subtitle}
                      </Tooltip>
                    </Circle>
                  </div>
                )
              })
            }

            <div className="custom-leaflet leaflet-top leaflet-right">
              <div className="custom-leaflet-inner" >
                 <Dropdown options={mapname_options}
                  value={ this.state.mapstate }
                  placeholder="Select a map ..."
                  onChange={(e) => this.handleMapnameChange(e)}
                  className="dropdown"
                  />
              </div>
            </div>

          </Map>
        </div>
      )

      return (

          <div id="map-container">
            {map}
            <InterviewBox
              selectid={ this.state.selectid }
              selection={ this.state.geodata[this.state.selectid] }
              handleSelectPoint={this.handleSelectPoint.bind(this)}
            />
          </div>

      );
    }


}


export {InterviewMap};
