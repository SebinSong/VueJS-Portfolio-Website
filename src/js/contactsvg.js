import { TweenMax, TimelineMax } from 'gsap/TweenMax';

export default function svgAnimationSettings(){

  /* Global Variables for Spinning up SVG Animation */
  const [ Root, xmlns, xlink ] =
  [
    document.querySelector("svg.contactsvg"),
    "http://www.w3.org/2000/svg",
    "http://www.w3.org/1999/xlink"
  ];

  // Global Variables for GSAP Tweenmax Library
  const [ T, masterTimeline ] = [TweenMax, new TimelineMax() ];

  // assets for animation
  const [ clouds, birds, sun] =
    [ [], [], document.createElementNS(xmlns, "g") ];


  // creating svg elements and adding them to the main <svg> tag
  addBirds(5);
  addBuildings();
  addPolylinesAndHorizon();
  addMountains();
  addSquareClouds(3);
  addSun(30);


  // animating svg elements, it's basically adding all the separate anis
  // to one mater timeline for easy maintenence
  masterTimeline.add( animateClouds(), 0 ).add( animateSun(), 0 )
  .add( animateBirds(), 0.5);


  /*
  *
  Helper Functions
  *
  */

  function addSquareClouds(num){

    for(let i=0; i<num; i++){
      clouds.push(createCloud(35, 5, i));
    }

  /*
  *
    helper innerfunctions for addSquareClouds();
  *
  */

    function createCloud(largeWidth, numOfSmallOnes, index){

      const [ group, largeOne ] =
          [ document.createElementNS(xmlns, "g"),
            document.createElementNS(xmlns, "rect")
          ];

      largeOne.setAttribute("x", Math.floor(-largeWidth/2) );
      largeOne.setAttribute("y", Math.floor(-largeWidth/2) );
      largeOne.setAttribute("width", largeWidth );
      largeOne.setAttribute("height", largeWidth );
      largeOne.setAttribute("stroke-width", 2);

      group.appendChild(largeOne);


      for(let i=0; i<numOfSmallOnes; i++){

        const small = document.createElementNS(xmlns, "rect");
        let smallLength = ( 0.2 + 0.5*Math.random() ) * largeWidth/2;
        smallLength = Math.floor(smallLength);

        small.setAttribute("width", smallLength );
        small.setAttribute("height", smallLength );

        small.setAttribute("x", Math.floor(-smallLength/2)  );
        small.setAttribute("y", Math.floor(-smallLength/2)  );
        small.setAttribute("stroke-width", 1);

        T.set(small, {transformOrigin: "50% 50%"});
        T.set(small, {
          x: `${ randomSign() }${Math.floor( largeWidth/2 + largeWidth/3 * Math.random() )}`,
          y: `${ randomSign() }${Math.floor( largeWidth/2 + largeWidth/3 * Math.random() )}`
        });


        group.appendChild(small);

      }

      if( index%2 == 0 )
        group.setAttribute("class", "cloud_fill");
      else
        group.setAttribute("class", "cloud_nofill");

      Root.appendChild(group);

      return group;
    }

  }

  // Setting Animations for the created cloud elements
  function animateClouds(){

    const tl = new TimelineMax();
    const [ xArr, yArr, anixArr ] =
        [ [100, 250, 350], [200, 250, 300], ["+=", "+=", "-="] ];


    clouds.forEach(function(cloud, i){

      T.set(cloud, {transformOrigin: "50% 50%", rotation: 45});

      T.set(cloud, {
        x: xArr[i%xArr.length],
        y: yArr[i%yArr.length]
      });


      tl.add(
        T.to(cloud, Math.floor( 5 + Math.random()*5),
        { x: anixArr[i%anixArr.length] +  Math.floor( 50 + Math.random() * 50 ),
          repeat: -1, yoyo: true, ease: Linear.easeNone })
      , 0);

    });

    return tl;
  }


  /* Adding Sun */

  function addSun(radius){

    const [ innerCircle, outerCircle ] =
      [ document.createElementNS(xmlns, "circle"),
        document.createElementNS(xmlns, "circle") ];

    innerCircle.setAttribute("cx", 0);
    innerCircle.setAttribute("cy", 0);
    innerCircle.setAttribute("r", radius);
    innerCircle.setAttribute("class", "sun_inner");

    outerCircle.setAttribute("cx", 0);
    outerCircle.setAttribute("cy", 0);
    outerCircle.setAttribute("r", Math.floor(radius * 1.2) );

    outerCircle.setAttribute("stroke-width", Math.floor(radius*0.1) );
    outerCircle.setAttribute("stroke-dasharray",
      `1, ${2*Math.PI*(radius*1.2)/12 - 1}`);

    outerCircle.setAttribute("class", "sun_outer");

    sun.appendChild(innerCircle);
    sun.appendChild(outerCircle);
    T.set(sun, {x: 250, y: 200, transformOrigin: "50% 50%"});

    Root.appendChild(sun);
  }

  function animateSun(){
    const tl = new TimelineMax();

    tl.to(sun, 30, {rotation: 360, repeat: -1, ease: Linear.easeNone});

    return tl;
  }

  function addPolylinesAndHorizon(){

    const [ horizon, polylines, points ] =
      [ document.createElementNS(xmlns, "line"),
        document.createElementNS(xmlns, "g"),
        "-10,480 250,300, 510,480" ];

    // draw the horizon on the canvas
    horizon.setAttribute("x1", -10);
    horizon.setAttribute("y1", 450);
    horizon.setAttribute("x2", 510);
    horizon.setAttribute("y2", 450);
    horizon.setAttribute( "class", "horizon");


    Root.appendChild(horizon);

    for(let i=0; i<3; i++){
      let polyline = document.createElementNS(xmlns, "polyline");

      polyline.setAttribute("points", points);
      polyline.setAttribute("class", "bg_polyline");

      T.set(polyline, {y: `-=${50 + 150*i}` });

      polylines.appendChild(polyline);
    }

    Root.appendChild(polylines);

  }

  function addMountains(){

    const [ mountainGroup, mt, smallerMountains, shade, points ] =
    [
      document.createElementNS(xmlns, "g"),
      document.createElementNS(xmlns, "polygon"),
      document.createElementNS(xmlns, "g"),
      document.createElementNS(xmlns, "g"),
      "180,450, 320,450, 250,363.4"
    ];
    let mtcopy;


    mt.setAttribute("points", points);

    T.set(mt, {
      transformOrigin: "250 450",
      fill: "#272822"
      });
    mountainGroup.appendChild(mt);



    addSmallMountains(0.25, 80);
    addSmallMountains(0.25, 120);
    addSmallMountains(0.18, 100);
    addSmallMountains(0.15, 160);
    addSmallMountains(0.1, 180);


    mtcopy = smallerMountains.cloneNode(true);

    T.set(mtcopy, {transformOrigin: "250 450"});
    T.set(mtcopy, {scaleX: -1});

    mountainGroup.appendChild(smallerMountains);
    mountainGroup.appendChild(mtcopy);


    shade.appendChild(smallerMountains.cloneNode(true));
    shade.appendChild(mtcopy.cloneNode(true));
    shade.setAttribute("class", "mountainShade");


    T.set(shade, {
      transformOrigin: "250 450",
      fill: "#A6E22E"
    });
    T.set(shade, {scaleY: -1});
    mountainGroup.appendChild(shade);


    Root.appendChild(mountainGroup);


    drawMountainPattern();


    function addSmallMountains(scale, x){

      const newNode = mt.cloneNode(true);

      T.set(newNode, { scale: scale });
      T.set(newNode, { x: "+=" + x });

      smallerMountains.appendChild(newNode);

    }

  }

  function drawMountainPattern(){

    const [ patternGroup, outer, linegroup, points ] =
    [
      document.createElementNS(xmlns, "g"),
      document.createElementNS(xmlns, "polygon"),
      document.createElementNS(xmlns, "g"),
      "190,450 250,373.4 310,450"
    ];


    outer.setAttribute( "points", points);
    patternGroup.appendChild(outer);

    T.set(linegroup, {transformOrigin: "250 450" });


    for(let x=200; x<=250; x += 10){
      let path, d, tan;

      tan = Math.tan(Math.atan(76.6/60));
      path = document.createElementNS(xmlns, "path");
      d = `M ${x},450 v-${tan * (x - 190)}`;

      path.setAttribute("d", d);

      linegroup.appendChild(path);
    }

    let linegroupCopy = linegroup.cloneNode(true);
    T.set(linegroupCopy, {scaleX: -1});

    patternGroup.appendChild(linegroup);
    patternGroup.appendChild(linegroupCopy);
    patternGroup.setAttribute("class", "mtPattern");

    Root.appendChild(patternGroup);
  }


  function addBuildings(){

    let group, groupcopy;

    group = document.createElementNS(xmlns, "g");
    group.setAttribute("class", "building");
    T.set(group, { transformOrigin: "250 450" });

    createbuilding( 250, 450, 140, 5 );
    createbuilding( 245, 450, 120, 10 );
    createbuilding( 235, 450, 110, 15 );
    createbuilding( 220, 450, 80, 15 );
    createbuilding( 205, 450, 45, 20 );

    function createbuilding(x1, y1, height, width){
      var b = document.createElementNS(xmlns, "path");
      var d = `M ${x1},${y1} v-${height} h-${width} v${height} z`;

      b.setAttribute("d", d);
      group.appendChild(b);
    }
    groupcopy = group.cloneNode(true);
    T.set( groupcopy, {scaleX: -1} );

    Root.appendChild(group);
    Root.appendChild(groupcopy);

  }

  function randomSign(){
    return ["-=", "+="][Math.floor(Math.random()*2)];
  }


  function addBirds(num){

    const birdsGroup = document.createElementNS(xmlns, "g");

    for(let i=0; i<num; i++){

      const [ bird, wing1, wing2 ] =
      [
      document.createElementNS(xmlns, "g"),
      document.createElementNS(xmlns, "path"),
      document.createElementNS(xmlns, "path")
      ];

      wing1.setAttribute("d", "M0,0 l-10,10");
      wing1.setAttribute("class", "wing1");
      wing2.setAttribute("d", "M0,0 l10,10");
      wing2.setAttribute("class", "wing2");

      bird.appendChild(wing1);
      bird.appendChild(wing2);

      bird.setAttribute("class", "bird");

      T.set(wing1, {transformOrigin: "0 0"});
      T.set(wing2, {transformOrigin: "0 0"});
      T.set(bird, {x: 250, y: 420});

      T.to(wing1, 0.2,
        { rotation: "+=90",
          yoyo: true,
          ease: Linear.easeNone,
          repeat: -1
        });
      T.to(wing2, 0.2,
        { rotation: "-=90",
          yoyo: true,
          ease: Linear.easeNone,
          repeat: -1
        });


      birds.push(bird);
      birdsGroup.appendChild(bird);
    }

    Root.appendChild(birdsGroup);

  }

  function animateBirds(){
    const tl = new TimelineMax();
    const xArr = ["+=150", "-=200", "+=600", "-=500", "+=50"];

    birds.forEach((bird, i) => {

      tl.add( T.to( bird, 4, {
        x: xArr[i%xArr.length],
        y: "-=600",
        delay: 0.8*i,
        ease: Linear.easeNone,
        repeat: -1
      }), 0);

    });

    return tl;
  }


};
