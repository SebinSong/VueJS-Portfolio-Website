import { TweenMax, TimelineMax } from 'gsap/TweenMax';
// GSAP Tweenmax library is responsible for animating svg elements.

export function svg1Setting(){


  /* ----------- Global Variables ----------- */
  const [T, Master, Root, xmlns, xlink ] =
        [
          TweenMax, new TimelineMax(),
          document.querySelector("svg#svg1"),
          "http://www.w3.org/2000/svg",
          "http://www.w3.org/1999/xlink"
        ];

  const [ icon, iconWrapper, RootBox ] =
        [
          Root.querySelector("#icon"),
          Root.querySelector("g#iconWrapper"),
          Root.querySelector("#bgrect").getBBox()
        ];
  const RootLiveStyle = window.getComputedStyle(Root);
  // RootWidth, RootHeight basically represents the svg viewport dimension
  const  RootWidth = RootBox.width, RootHeight = RootBox.height;

  // these contain the shape assets to be used in the intro animation
  const [ shapesbox, shapesForCopy, Shapes ] =
        [
          Root.querySelector("g#shapesbox"),
          [].slice.call(Root.querySelectorAll("g#randomShapes .obj_")),
          []
        ];

  // these are responsible for the text animation
  const textsbox = Root.querySelector("#titletexts");
  const texts = [].slice.call(textsbox.querySelectorAll(".unit"));

  const [ ripple, pathmorphbox, pmPaths ] =
        [
          // ripple effect
           Root.querySelector("#ripple"),
          // morphing effect during page transition
           Root.querySelector("g#pgTransition"), []
        ];

    let shapesNum; // number of shapes to be animated
    let iconScaleUpTo, iconscaleDownTo, rippleScaleTo, shapesboxScaleTo;
    let introAnimationStop = false, pageTransitionStart = false;



  /*------------------- Implementation Part --------------------- */

    initialSettings();
    scatteringShapes(shapesNum);
    Master.add( bounceIcon(RootHeight/3, 4, 1) )
    .add( tweeningTexts() )
    .add( tweenRipple() );

  /*-------------------------------------------------------- */


  /* ----------------- functions declarations ------------------- */

    function initialSettings(){
      // basic settings for intro animation
      let centerX = RootWidth/2, centerY = RootHeight/2;

      Root.setAttribute("viewBox", "0 0 " + RootWidth + " " + RootHeight);
      Root.setAttribute("preserveAspectRatio", "none");

      T.set(iconWrapper, { x: centerX, y: centerY });
      T.set(icon, { transformOrigin: "50% 50%", scale: 0.01 });
      T.set(shapesbox, {x: centerX, y: centerY, scale: 0 });
      T.set(ripple, {x: centerX, y: centerY, transformOrigin: "50% 50%"});

      // Make the animation sort of responsive to screen width
      iconScaleUpTo = (RootWidth < 600)? 0.7 : 1;
      iconscaleDownTo = (RootWidth < 600)? 0.1: 0.2;

      shapesboxScaleTo = (RootWidth < 600)? 0.7: 0.9;
      rippleScaleTo = (RootWidth > 1000)?
                      5 :
                      (RootWidth > 600)? 3.5 : 2;

      shapesNum = (RootWidth < 600)?
                    40 :
                  (RootWidth> 1000)?70 : 50;

      //pathmorphing page transition initialSettings
      addPageTransitionElements();

      // Title texts initial settings
      T.set(textsbox, { x: centerX, y: centerY });
      textsInitialSettings();

    }

    // Preparing for the pageTransition
    function addPageTransitionElements(){

      let pm;
      const pathcolors = ["#F92672", "#FD971F", "#A6E22E"];

      // This is gonna draw the path programmatically in order to
      // make the path fit the width of the screen
      pm = {
        x1: 0, y1: Math.floor(RootHeight),
        x2: Math.floor(RootWidth/2), y2: Math.floor(RootHeight),
        x3: Math.floor(RootWidth), y3: Math.floor(RootHeight),
        cx1: Math.floor(RootWidth/8), cy1: Math.floor(RootHeight - RootHeight/3),
        cx2: Math.floor(RootWidth/8*3), cy2: Math.floor(RootHeight + RootHeight/3),
        cx3: Math.floor(RootWidth/8*7), cy3: Math.floor(RootHeight + RootHeight/3),
        d: "", number: 3
      };

      pm.d += `M ${pm.x1},${pm.y1} C${pm.cx1},${pm.cy1} ${pm.cx2},${pm.cy2} ${pm.x2},${pm.y2} `;
      pm.d += `S ${pm.cx3},${pm.cy3} ${pm.x3},${pm.y3} `;
      pm.d += `v${RootHeight/3} h-${RootWidth} v-${RootHeight/3} z`;

      for(let i=0; i<pm.number; i++) {
        let newPath = document.createElementNS(xmlns, "path");
        newPath.setAttribute('d', pm.d );
        newPath.setAttribute('fill', pathcolors[i%pathcolors.length]);

        pmPaths.push(newPath);
        pathmorphbox.appendChild(newPath);
      }

      T.set(pmPaths,
        { y: `+=${RootHeight/2}`, transformOrigin: "50% 50%" });

    }

    function textsInitialSettings(){

      const btn = Root.querySelector("#getinbtn");
      const frame = btn.querySelector("#frame");
      const getin = btn.querySelector('#getin');
      const getinbox = getin.getBBox();


      T.set(frame, {transformOrigin: "50% 50%", scale: 2});
      T.set(btn, {transformOrigin: "50% 50%"});

      // Adding event handlers to the 'getin' Button

      btn.addEventListener("mouseenter", function(event){
        T.set(frame, { fill: "#66D9EF"});
        T.set(getin, { fill: "#0B0914"});
      });
      btn.addEventListener("mouseleave", function(event){
        T.set(frame, { fill: "none"});
        T.set(getin, { fill: "#66D9EF"});
      });

      btn.addEventListener("click", pageTransition);

      // Set the starting positions of the title texts animation
      texts.forEach(function(text){
        T.set(text, { opacity: 0, xPercent: "+=150" });
      });
    }

    // Animating the title texts
    function tweeningTexts(){
      const tl = new TimelineMax();

      tl.staggerTo(texts, 0.6,
        { opacity: 1,
          xPercent: "-=150",
          ease: Back.easeOut
        }, 0.2);

      return tl;
    }

    // this function is responsible for creating and scattering shapes around the screen
    function scatteringShapes(num){

      let rmin, rmax, smaller, larger, tilts = [], anglegap, tilt_num;
      let M;
      let listLength = shapesForCopy.length;
      let ransign;

      const strokeArr = ["#F92672", "#A6E22E", "#FD971F"];
                  // "#d8d8d8", "#4B74FA"

      smaller = ( RootWidth <= RootHeight )? RootWidth/2 : RootHeight/2;
      larger = ( RootWidth >= RootHeight )? RootWidth/2 : RootHeight/2;
      // rmin is the minimum radius gap btw the center of page and the shapes to be scattered
      // rmax is the max value.
      // made them sort of responsive to the screen width
      rmax = (RootWidth > 1000)? Math.floor( smaller * 1.6) :
              (RootWidth > 600)? Math.floor( smaller * 1.35) : larger;
      rmin = (RootWidth < 600)?
              150 :
              (RootWidth > 1000)? 400 : 300;


      anglegap = (num>30)? 15 : 30;
      tilt_num = Math.floor(180/anglegap);

      // it will produce a bunch of angles to be used to put each shape along.
      // adjusting the value of anglegap can make them more or less crowded
      for(let i=0; i<tilt_num; i++){

        let tempm = Math.tan( (anglegap*i) / 180 * Math.PI );
         if(Math.abs(tempm) > 1000)
            tempm = (tempm<0)? -1000: 1000;

        tilts.push( tempm );
      }


      // it has a little too complicated logic to comment on
      for(let j=0; j<num; j++){

        let shapePicked, newnode, randomR, tilt_item, x, y;

        shapePicked
            = shapesForCopy[Math.floor(listLength*Math.random())];
        newnode = shapePicked.cloneNode(true);

        randomR = rmin + Math.floor( (rmax - rmin)*Math.random() );
        tilt_item = tilts[j%tilts.length];

        // this math formula came from the equation for getting the intersection point
        // of a line and a circle.
        // combination of y = mx and x^2 + y^2 = r^2
        x = Math.sqrt( randomR*randomR / ( 1 + tilt_item*tilt_item ) );
        y = Math.sqrt( randomR*randomR - x*x );

        x = randomsign() * Math.floor(x), y = randomsign() * Math.floor(y);

        Shapes.push({ node: newnode, x: x, y: y });
      }

      // animating the created shapes
      Shapes.forEach(function(ele, index){
        let toX, toY, rotateTo, color, count = 0, tweenObj;

        color = strokeArr[index%strokeArr.length];
        ele.node.style.stroke = color;
        ele.node.style.opacity = 0.75;
        // if(ele.node.nodeName != "path") ele.node.style.fill = color;

        shapesbox.appendChild(ele.node);

        T.set(ele.node, {x: ele.x, y: ele.y, transformOrigin: "50% 50%"});
        tweenToXY(ele.node);

        // this function has a recursive structure. -> TODO: needs to be optimized for animation performance
        function tweenToXY(){

          count++;
          toX = Math.floor( 10 + 20 * Math.random() );
          toY = Math.floor( 10 + 20 * Math.random() );
          rotateTo = Math.floor( 360 * Math.random() );

          tweenObj = T.to( ele.node, 3,
              {
                x: ["+=", "-="][Math.floor(Math.random()*2)] + toX,
                y: ["+=", "-="][Math.floor(Math.random()*2)] + toY,
                rotation: ["+=", "-="][Math.floor(Math.random()*2)] + rotateTo,
                delay: 0.5 * Math.random(),
                onComplete: function(){
                  if(!introAnimationStop && RootLiveStyle.getPropertyValue("display") == "")
                    introAnimationStop = !introAnimationStop;

                  if(count<25 && !introAnimationStop)
                      tweenToXY();
                  else
                    tweenObj.kill();

                }
              });
        }
      });


      // *-*-*-*-*-*-*- Helper Functions *-*-*-*-*-*-*-* //

      function randomsign() {
        // randomly picks -1 or 1 which represent + sign and - sign respectively
        return [-1,1][Math.floor(Math.random()*2)];
      }

    } // end of the scatteringShapes(){}


    // Bouncing Icon Animation Setting
    function bounceIcon(maxHeight, num, time){

      const tl = new TimelineMax();
      const factors = [1, 2/3, 1/3, 1/5, 1/8, 0];

      if(num > factors.length) num = factors.length;

      for(let i=0; i<factors.length; i++){
        tl.add(
          TweenMax.to(iconWrapper, time*factors[i],
          { y: "-=" + maxHeight*factors[i],
            ease: SlowMo.ease.config(0.3,0.1,true) })
        );
      }

      tl.to(icon, 0.5, { rotation: 360, scale: 0.3 }, 0)
      .to(icon, 0.5, { x: "+=1", y: "+=1", ease: RoughEase.ease.config({
        strength: 20, points: 50 }) })
      .to(icon, 0.3, { scale: iconscaleDownTo, ease: Power3.easeOut  })
      .to(icon, 0.3, { scale: iconScaleUpTo, ease: Power3.easeOut, fill: "#66D9EF"  }, "spread")
      .to(shapesbox, 1.2, {scale: shapesboxScaleTo, ease: Power4.easeOut}, "spread")
      .to(icon, 0.3, { scale: 0, yPercent: "-=100", ease: Back.easeIn  } );

      return tl;
    }

    // A little Ripple Effect at the end of text animation
    function tweenRipple(){
      const tl = new TimelineMax({ repeat: -1, onRepeat: repeatHelper });
      let smaller = (RootWidth <= RootHeight)? RootWidth/2 : RootHeight/2;
      T.set(ripple, {scale: 0});

      tl.to(ripple, 3.2, { scale: rippleScaleTo})
      .to(ripple, 2.5, { opacity: 0 }, 0);

      function repeatHelper(){
          if(introAnimationStop) tl.pause();
      }
      return tl;
    }

    // Page Transition at the end of the intro animation
    function pageTransition(event){

      if(!pageTransitionStart){
        pageTransitionStart = !pageTransitionStart;
        introAnimationStop = !introAnimationStop;

        TweenMax.staggerTo(pmPaths, 2, {
          y: "-=" + RootHeight*1.5,
          scaleY: 6,
          ease: Power2.easeOut
        }, 0.15 );

      } else return;

    }

};
