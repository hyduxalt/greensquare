
const
  outer = 800;  /* square canvas dimensions */
let
  number = 80,  /* lines */
  inner = 400,  /* inner square size */
  linesSlider, squareSlider;

function style() {
  /* Set styles for #sketch* ids. Log iframe style for parent
   * webpage.
   */
  const lh = 25, eps = 20, center = `
    display: flex;
    justify-content: center;
    align-items: center;`;
  let sketch = select('#sketch');
  sketch.style(`${center} flex-direction: column;`);
  let linesLabel = select('#sketch-lines-slider-label');
  linesLabel.style(`height: ${lh}px;`);
  let squareLabel = select('#sketch-square-slider-label');
  squareLabel.style(`height: ${lh}px;`);
  // Calculate and log iframe style.
  let
    ifw = Math.max(canvas.width, 
      linesSlider.width, linesLabel.width, 
      squareSlider.width, squareLabel.width) + eps;
    ifh = canvas.height 
      + linesSlider.height + lh + eps
      + squareSlider.height + lh + eps
      + /* p5.js banner height */ 30;
    iframe = `  iframe { min-width: ${ifw}px; min-height: ${ifh}px; }`
  console.log(`${iframe}`);
}

function setup() {
  // https://github.com/processing/p5.js/wiki/Positioning-your-canvas
  canvas = createCanvas(outer, outer);
  canvas.parent('sketch-canvas')
  canvas.style(`display: block;`)
  linesSlider = createSlider(10, 100, 80, 1);
  linesSlider.parent('sketch-lines-slider');
  squareSlider = createSlider(100, 700, 400, 5);
  squareSlider.parent('sketch-square-slider');
  style();
}

function draw() {
  background('black');
  orange = color(192, 100, 72);
  green = color(64, 144, 42);  // not #6f0
  
  number = linesSlider.value();
  select("#sketch-lines-slider-label").html(`${number} lines`);
  inner = squareSlider.value();
  let percent = (inner / outer * 100).toFixed(1);
  select("#sketch-square-slider-label").html(`${percent}%`);
  
  let squareTop = (outer - inner) / 2, squareLeft = (outer - inner) / 2;
  let divEdgeX = outer / number, divEdgeY = outer / number;
  let divSquareX = inner / number, divSquareY = inner / number;

  for (let i = 0; i <= number; i++) {
    let edgeX, edgeY, squareX, squareY;
    stroke(orange);
    strokeWeight(inner / number - 2);

    edgeX = 0 + i * divEdgeX; edgeY = 0;
    squareX = squareLeft + i * divSquareX; squareY = squareTop;
    line(edgeX, edgeY, squareX, squareY);

    edgeX = 0 + outer; edgeY = 0 + outer - i * divEdgeY;
    squareX = squareLeft + inner; squareY = squareTop + inner - i * divSquareY;
    line(edgeX, edgeY, squareX, squareY);

    edgeX = 0 + i * divEdgeX; edgeY = 0 + outer;
    squareX = squareLeft + i * divSquareX; squareY = squareTop + inner;
    line(edgeX, edgeY, squareX, squareY);

    edgeX = 0; edgeY = 0 + i * divEdgeY;
    squareX = squareLeft; squareY = squareTop + i * divSquareY;
    line(edgeX, edgeY, squareX, squareY);
  }
  
  stroke(green);
  fill(green);
  square(squareTop, squareLeft, inner)
}