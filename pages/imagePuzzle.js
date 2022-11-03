import React, { useEffect } from 'react'

function ImagePuzzle() {
  useEffect(() => {
    var c = document.getElementById("canvas"),
      w = innerWidth,
      h = innerHeight;
    c.width = w;
    c.height = h;
    console.log(c.width)
    var ctx = c.getContext("2d"),
      input = document.getElementById("input"),
      reader = new FileReader(),
      img = new Image(),
      imgW, //px
      imgH, //px
      imgData,
      tileDim = 400, //tile dimensions px
      tileCountX, //how many tiles we can fit
      tileCountY;

    //read file input
    input.onchange = function () {
      reader.readAsDataURL(input.files[0]);
      reader.onload = function () {
        img.src = reader.result;
        img.onload = function () {
          //start
          init();
          var tiles = getTiles();
          drawTiles(tiles);
        }
      }
    }

    function init() {
      imgW = img.width;
      imgH = img.height;
      //check how many full tiles we can fit
      //right and bottom sides of the image will get cropped
      console.log("tileDim", tileDim)
      tileCountX = ~~(imgW / tileDim);
      tileCountY = ~~(imgH / tileDim);
      console.log("tileCountX", tileCountX)
      console.log("tileCountY", tileCountY)

      ctx.drawImage(img, 0, 0);
      imgData = ctx.getImageData(0, 0, imgW, imgH).data;
      ctx.clearRect(0, 0, w, h);
    }

    //get imgdata index from img px positions
    function indexX(x) {
      var i = x * 4;
      if (i > imgData.length) console.warn("X out of bounds");
      return i;
    }
    function indexY(y) {
      var i = imgW * 4 * y;
      if (i > imgData.length) console.warn("Y out of bounds");
      return i;
    }
    function getIndex(x, y) {
      var i = indexX(x) + indexY(y);
      if (i > imgData.length) console.warn("XY out of bounds");
      return i;
    }

    //get a tile of size tileDim*tileDim from position xy
    function getTile(x, y) {
      var tile = [];
      //loop over rows
      for (var i = 0; i < tileDim; i++) {
        //slice original image from x to x + tileDim, concat
        console.log("getIndex(x, y + i)", getIndex(x, y + i))
        console.log("getIndex(x + tileDim, y + i)",getIndex(x + tileDim, y + i))
        tile.push(...imgData.slice(getIndex(x, y + i), getIndex(x + tileDim, y + i)));
      }
      //convert back to typed array and to imgdata object
      tile = new ImageData(new Uint8ClampedArray(tile), tileDim, tileDim);
      console.log("tile", tile)
      //save original position
      tile.x = x;
      tile.y = y;
      return tile;
    }

    //generate all tiles
    function getTiles() {
      var tiles = [];
      for (var yi = 0; yi < tileCountY; yi++) {
        for (var xi = 0; xi < tileCountX; xi++) {
          tiles.push(getTile(xi * 20, yi * 20));
          // console.log("getTile(xi * tileDim, yi * tileDim)", getTile(xi * tileDim, yi * tileDim))
        }
      }
      return tiles;
    }

    //and draw with offset
    var offset = 1.1;
    function drawTiles(tiles) {
      tiles.forEach((d, i) => ctx.putImageData(d, d.x * offset, d.y * offset));

      //more interesting effects are easy to do:
      // tiles.forEach((d,i) => ctx.putImageData(d, d.x * i * 0.01, d.y * i * 0.01));

      //for efficiency in animation etc tiles should be converted to image object
    }
  }, [])

  return (
    <>
      <input
        type="file"
        id="input"
      />
      <canvas
        id="canvas"
      // className={"xl:w-[300px] xl:h-[300px] lg:w-[250px] lg:h-[250px] w-[300px] h-[300px]"}
      // width="600"
      // height="600"
      >
      </canvas>
    </>
  )
}

export default ImagePuzzle