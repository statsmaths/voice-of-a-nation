import React from 'react';

import './legend.css';

class Legend extends React.Component {

  render () {

    if (this.props.geolegend === null)
    {
      return(<div></div>)
    }

    let labels = this.props.geolegend.map( (val, i) => {
      return (
        <div key={i}>
          <i style={{ background: val.color }}></i>
          {val.label}
        </div>
      )
    })

    return(
      <div className="leaflet-bottom leaflet-right">
         <div className="info legend leaflet-control">
          { labels }
         </div>
      </div>
    )
  }

}

export { Legend };
