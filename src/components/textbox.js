import React from 'react';

import { Layer0 } from "./layers/Layer0";
import { Layer1 } from "./layers/Layer1";
import { Layer2 } from "./layers/Layer2";
import { Layer3 } from "./layers/Layer3";
import { Layer4 } from "./layers/Layer4";
import { Layer5 } from "./layers/Layer5";
import { Layer6 } from "./layers/Layer6";
import { Layer7 } from "./layers/Layer7";
import { Layer8 } from "./layers/Layer8";

import './textbox.css';

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
    if (this.props.page === 7)
    {
      data = <Layer7
        handlePage={this.props.handlePage}
      />;
    }
    if (this.props.page === 8)
    {
      data = <Layer8
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
        {data}
      </div>
    )
  }
}

export {TextBox};
