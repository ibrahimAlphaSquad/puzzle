import React, { useEffect, useRef, useState } from 'react'

function ImagePuzzle() {
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  const [url, setUrl] = useState(
    "https://cdn.pixabay.com/photo/2022/10/09/02/16/haunted-house-7508035_960_720.jpg"
  );
  const [redraw, setRedraw] = useState(false);

  const draw = (canvas, url) => {
    console.log("asdasdasd");

    var ctx = canvas.getContext("2d");
    // var cw = canvas.width;
    //var ch = canvas.height;

    var rows = 3;
    var cols = 3;

    var img = new Image();
    // img.onload=start;
    img.src = url;

    var iw = (canvas.width = img.width);
    var ih = (canvas.height = img.height);
    var pieceWidth = iw / cols;
    var pieceHeight = ih / rows;

    var pieces = [
      { col: 0, row: 0, index: 0 },
      { col: 1, row: 0, index: 1 },
      { col: 2, row: 0, index: 2 },
      { col: 0, row: 1, index: 3 },
      { col: 1, row: 1, index: 4 },
      { col: 2, row: 1, index: 5 },
      { col: 0, row: 2, index: 6 },
      { col: 1, row: 2, index: 7 },
      { col: 2, row: 2, index: 8 }
    ];
    shuffle(pieces);

    var i = 0;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        var p = pieces[i++];
        console.log("p", p)
        console.log("img", img)
        console.log("pieceWidth", pieceWidth)
        console.log(img,
          // take the next x,y piece
          x * pieceWidth,
          y * pieceHeight,
          pieceWidth,
          pieceHeight,
          // draw it on canvas based on the shuffled pieces[] array
          p.col * pieceWidth,
          p.row * pieceHeight,
          pieceWidth,
          pieceHeight)
        ctx.drawImage(
          // from the original image
          img,
          // take the next x,y piece
          x * pieceWidth,
          y * pieceHeight,
          pieceWidth,
          pieceHeight,
          // draw it on canvas based on the shuffled pieces[] array
          p.col * pieceWidth,
          p.row * pieceHeight,
          pieceWidth,
          pieceHeight
        );
      }
    }

    // canvas.addEventListener("mousedown", doMouseDown, false);
    console.log("canvas.onMouseDown", canvas.onMouseDown)
  };

  function shuffle(a) {
    for (
      var j, x, i = a.length;
      i;
      j = Math.floor(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
    );
    return a;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(url);
    if (url !== "") {
      draw(canvas, url);
    }
  }, [url, redraw, draw]);

  function clickOnElem(elem, offsetX, offsetY) {
    var rect = elem.getBoundingClientRect(),
      posX = rect.left, posY = rect.top; // get elems coordinates
    // calculate position of click
    if (typeof offsetX == 'number') posX += offsetX;
    else if (offsetX == 'center') {
      posX += rect.width / 2;
      if (offsetY == null) posY += rect.height / 2;
    }
    if (typeof offsetY == 'number') posY += offsetY;
    // create event-object with calculated position
    var evt = new MouseEvent('click', { bubbles: true, clientX: posX, clientY: posY });
    elem.dispatchEvent(evt); // trigger the event on elem
  }


  return (
    <>
      <input
        type="text"
        value={url}
        ref={inputRef}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input type="button" value="Load" onClick={(e) => setRedraw(!redraw)} />
      <canvas id="canvas" ref={canvasRef}></canvas>
    </>
  )
}

export default ImagePuzzle