import React, { Component } from 'react';

export default class Pagination extends Component {

  render() {

    const { btnPrevRef, btnNextRef } = this.props;

    return (
      <div className="App-pagination">
        <button ref={btnPrevRef} className="btnPrev" disabled="disabled">{'<'}</button>
        <button ref={btnNextRef} className="btnNext">{'>'}</button>
      </div>
    );
  }

}