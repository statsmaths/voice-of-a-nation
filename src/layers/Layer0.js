import React from 'react';

function Layer0(props) {

    // Should have access to all of these:
    //    props.handlePage(PAGENUM)

    return(
<div>
  <h1 style={{paddingTop: "0px"}}> Table of Contents </h1>

  <button className="toc-button" onClick={() => props.handlePage(1)}>
    Introduction
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(2)}>
    Layer 1: Documenting People &amp; Histories
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(3)}>
    Layer 2: They Must Be Heard
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(4)}>
    Layer 3: Placing the Life Histories
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(5)}>
    Layer 4: Textual Analysis
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(6)}>
    Conclusion
  </button>

  <button className="toc-button"  onClick={() => props.handlePage(7)}>
    Method
  </button>
</div>
    )
}


export {Layer0};
