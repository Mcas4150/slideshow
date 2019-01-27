import React, { Component } from "react";
import Arrow from "./leftArrow.png";
import Youtube from "react-youtube";

import "./App.css";
import { SSL_OP_SINGLE_DH_USE } from "constants";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = { pictures: [], selectedIndex: 0 };
    this._togglePrev = this._togglePrev.bind(this);
    this._toggleNext = this._toggleNext.bind(this);
    this._toggleIndex = this._toggleIndex.bind(this);
    this._setIndex = this._setIndex.bind(this);
    this._onMouseEnterHandler = this._onMouseEnterHandler.bind(this);
  }

  componentDidMount() {
    // Axios.get(`https://tranquil-hollows-62149.herokuapp.com/api/images`)
    fetch(
      `https://tranquil-hollows-62149.herokuapp.com/api/images
    `,
      { mode: "cors" }
    )
      .then(results => {
        return results.json();
      })
      // .then(data => this.setState({ pictures : data }));
      .then(data => {
        let pictures = data.map(pic => {
          if (pic.type == "image") {
            return (
              <div className="card" key={pic._id}>
                <img className="card--image" src={pic.src} />
              </div>
            );
          } else
            return (
              <div className="card" key={pic._id}>
                <Youtube videoId={pic.src.substr(pic.src.indexOf("=") + 1)} />
              </div>
            );
        });
        this.setState({ pictures: pictures, selectedIndex: 0 });
        console.log("state", this.state.pictures);
      });
  }

  _toggleNext() {
    if (this.state.selectedIndex === this.state.pictures.length - 1) return;
    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex + 1
    }));
  }

  _togglePrev() {
    if (this.state.selectedIndex === 0) return;

    this.setState(prevState => ({
      selectedIndex: prevState.selectedIndex - 1
    }));
  }

  _toggleIndex(e) {
    this.setState({
      selectedIndex: Number(e.target.id)
    });
  }

  _setIndex(e) {
    this.setState({
      selectedIndex: e.target.value - 1
    });
  }

  _onMouseEnterHandler() {}

  _onMouseLeaveHandler() {}

  render() {
    const pagination = Array.apply(null, Array(this.state.pictures.length)).map(
      (_, i) => {
        return (
          <a className="pag-link" key={i} id={i} onClick={this._toggleIndex}>
            {i + 1}
          </a>
        );
      }
    );

    let { selectedIndex, pictures, images } = this.state;

    return (
      <div className="App">
        <div className="app-container">
          <div className="card-container">{pictures[selectedIndex]}</div>
          <div className="toggle-grid">
            <div className="toggle toggle--prev" onClick={this._togglePrev}>
              <img className="arrow arrow--left" src={Arrow} />
            </div>
            <div className="pagination-grid">{pagination}</div>
            <div className="input-container">
              <input
                type="number"
                onChange={this._setIndex}
                value={this.selectedIndex}
                placeholder={this.selectedIndex}
                min="1"
                max="15"
              />
            </div>
            <div className="toggle toggle--next" onClick={this._toggleNext}>
              <img className="arrow arrow--right" src={Arrow} />
            </div>
          </div>
          <footer>
            <div className="footer--left">
              {" "}
              <div className="button button--code">Code</div>
            </div>
            <div className="footer--middle">
              {" "}
              {/* <div className="pagination-grid">{pagination}</div> */}
            </div>
            <div className="footer--right">
              {" "}
              <div className="button button--info">Info</div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
