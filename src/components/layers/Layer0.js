import React from 'react';

function Layer0(props) {

    // Should have access to all of these:
    //    props.handlePage(PAGENUM)

    return(
<div>

  <div class="fpage">
    <div class="title">WRITING THEIR VOICES:</div>
    <div class="subtitle">
      Documentary Evidence and the Southern Life History Project
    </div>
    <div class="line-break"></div>
    <div class="byline">Taylor Arnold, Courtney Rivard, Lauren Tilton</div>
  </div>

  <button className="toc-button" onClick={() => props.handlePage(1)}>
    Introduction
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(2)}>
    Layer 1
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(3)}>
    Layer 2
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(4)}>
    Layer 3
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(5)}>
    Layer 4
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(6)}>
    Conclusion
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(7)}>
    Method
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(8)}>
    Bibliography
  </button>

  {(false) && (<div className="message"></div>) }

</div>
    )
}


export {Layer0};
