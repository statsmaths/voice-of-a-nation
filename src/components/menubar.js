import React from 'react';

import './menubar.css';

class MenuBar extends React.Component {

  render() {

    return (
      <div id="header">

        <span onClick={() => this.props.handlePage(0)}>
          <span style={{fontWeight: "bold", fontSize: "1.4em"}}>WRITING THEIR VOICES</span>
        </span>
        <span style={{color: "#cccccc", paddingLeft: "40px"}}>Taylor Arnold &bull; Courtney Rivard &bull; Lauren Tilton</span>

        <div className="btn-group">
          <button
            className={this.props.page === 1 ? "active" : ""}
            onClick={() => this.props.handlePage(1)}>I</button>
          <button
            className={this.props.page === 2 ? "active" : ""}
            onClick={() => this.props.handlePage(2)}>1</button>
          <button
            className={this.props.page === 3 ? "active" : ""}
            onClick={() => this.props.handlePage(3)}>2</button>
          <button
            className={this.props.page === 4 ? "active" : ""}
            onClick={() => this.props.handlePage(4)}>3</button>
          <button
            className={this.props.page === 5 ? "active" : ""}
            onClick={() => this.props.handlePage(5)}>4</button>
          <button
            className={this.props.page === 6 ? "active" : ""}
            onClick={() => this.props.handlePage(6)}>C</button>
          <button
            className={this.props.page === 7 ? "active" : ""}
            onClick={() => this.props.handlePage(7)}>M</button>
          <button
            className={this.props.page === 8 ? "active" : ""}
            onClick={() => this.props.handlePage(8)}>B</button>
        </div>
      </div>
    );
  }
}

export {MenuBar};
