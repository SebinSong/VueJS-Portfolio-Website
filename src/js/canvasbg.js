let AnimationId = null;

export function canvasSetting(container, canvas, noani = false){
  const c = canvas.getContext("2d");
  const mouse = { x: null, y: null };
  let circles = [], randomPoints = [];

  const box = container.getBoundingClientRect();
  let gridLength = 20, radius = 2.5;

  canvas.width = box.width;
  canvas.height = box.height;
  mouse.x = canvas.width/2, mouse.y = canvas.height/2;


  canvas.addEventListener("mousemove", event => {
    mouse.x = event.clientX, mouse.y = event.clientY;
  });

  window.addEventListener("resize", event => {
    init();
  });

  init();
  if(!noani) animate();


  function init(){

    let row, col;
    let fillArr = ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.15)"];
    // "rgba(0,0,0,0.2)", "rgba(0,0,0,0.25)"

    canvas.width = box.width;
    canvas.height = box.height;

    if(canvas.width <= 600){
      gridLength = 15;
      radius = 2;
    }
    else if (canvas.width <= 400){
      gridLength = 10;
      radius = 1.5;
    }

    col = Math.ceil(canvas.width / gridLength);
    row = Math.ceil(canvas.height / gridLength);

    circles = [];
    for(let i=0; i<row; i++){
      for(let j=0; j<col; j++){
        let num = i*col + j;

        circles.push(new Circle(
          gridLength/2 + gridLength*j,
          gridLength/2 + gridLength*i,
          radius, "rgba(0,0,0,0.7)",
          fillArr[num%fillArr.length]
        ));

      }
    }

    if(!noani){

      randomPoints = [];

      for(let l=0; l<3; l++){
        randomPoints.push(
          new RandomPoint()
        );
      }
    }
    else {
      c.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach( circle => {
        circle.update();
      });
    }

  }

  function Circle(x, y, r, strokeColor, fillColor){
    this.cx = x, this.cy = y;
    this.r = this.rinit = r;
    this.rmax = r*8;
    this.stroke = strokeColor, this.fill = fillColor;
    this.vel = 2;

    this.draw = function() {

      c.strokeStyle = this.stroke;
      c.fillStyle = this.fill;
      c.beginPath();
      c.arc(this.cx, this.cy, this.r, 0, Math.PI*2, false);
      c.fill();
      c.closePath();

    };

    this.update = function(){

      let r_new = this.rinit;
      randomPoints.forEach( point => {
        let dis = getDistance(point.x, point.y, this.cx, this.cy);
        r_new *= fractionReturn(dis);
      });

      this.r = r_new;
      if(this.r >= this.rmax) this.r = this.rmax;
      this.draw();
    };

  }

  function RandomPoint(){

    let default_vel = (canvas.width>400)? 3 : 1;
    this.x = canvas.width/2 + randomSign() * canvas.width/3;
    this.y = canvas.height/2 + randomSign() * canvas.height/3;

    this.velx = (default_vel + 3*Math.random()) * randomSign();
    this.vely = (default_vel + 3*Math.random()) * randomSign();

    this.update = function(){
      this.x += this.velx, this.y += this.vely;

      if(this.x >= canvas.width){
        this.x = canvas.width;
        this.velx = - this.velx;
      }
      else if(this.x <= 0){
        this.x = 0;
        this.velx = -this.velx;
      }

      if(this.y >= canvas.height){
        this.y = canvas.height;
        this.vely = -this.vely;
      }
      else if(this.y <= 0){
        this.y = 0;
        this.vely = -this.vely;
      }
    }
  }


  function animate(){
    AnimationId = window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    circles.forEach( circle => {
      circle.update();
    });

    randomPoints.forEach( p => {
      p.update();
    });
  }

  function fractionReturn(d){
    let min = gridLength;
    let adjust = 1;

    if(canvas.width <= 600) adjust = 0.85;
    if(canvas.width <= 400) adjust = 0.75;

    if(d <= min) return 5*adjust;
    else if(d <= min*1.5) return 4*adjust;
    else if(d <= min*2.2) return 3*adjust;
    else if(d <= min*3.1) return 2*adjust;
    else return 1;
  }

  function getDistance(x1,y1,x2,y2){
    const [dx,dy] = [x2-x1, y2-y1];
    return Math.sqrt(dx*dx + dy*dy);
  }

  function randomSign(){
    return [-1,1][Math.floor(Math.random()*2)];
  }

};


export function cancelCanvasAnimation(){
  window.cancelAnimationFrame(AnimationId);
}
