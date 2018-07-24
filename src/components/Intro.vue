<template>
  <svg id="svg1" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  version="1.1"
>
<defs>
  <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="rgb(0,0,0)" />
    <stop offset="0.5" stop-color="rgb(20,20,20)" />
    <stop offset="1" stop-color="rgb(50,50,50)" />
  </linearGradient>

  <g id="randomShapes">
    <line class="obj_ line" x1="-15" y1="-15" x2="15" y2="15" />
    <polygon class="obj_ triangle" points="0 -20, 17.32 10, -17.32 10" />
    <circle class="obj_ circle" cx="0" cy="0" r="15" />
    <rect class="obj_ rect" x="-15" y="-15" width="30" height="30" />
    <path class="obj_ cross" d="M-10,-10 L10,10 M10,-10 L-10,10" />
    <path class="obj_ star" d="M-7,-7 L7,7 M7,-7 L-7,7
                           M0,-12 L0,12 M-12,0 L12,0" />
    <polygon class="obj_ pentagon" points="0 -12, -11.42 -3.71, -7.055 9.71, 7.055 9.71, 11.42 -3.71" />
    <path class="obj_ oden" d="M-10,-15 a10,5 0 1 1 20,0 v30 a10,5 0 1 1 -20,0z" />
    <path class="obj_ ramen" d="M2,-32 q-20,7.5 0,15 20,7.5 0,15 -20,7.5 0,15 20,7.5 -2,17" />
  </g>

</defs>
  <rect id="bgrect" x="0" y="0" width="100%" height="100%"
        fill="#0B0914"></rect>

  <circle id="ripple" cx="0" cy="0" r="100" />

  <!-- This is a container where all the created shapes will sit -->
  <g id="shapesbox"></g>

  <g id="iconWrapper" x="50%" y="50%">
    <path id="icon"
          d="M-50,-50 q50,-20 100,0 20,50 0,100 -50,20 -100,0 -20,-50 0,-100z" />
  </g>

  <g id="titletexts">
    <text class="unit" id="welcometo" x="0" y="-70">Welcome To</text>
    <text class="unit" id="sebins" x="0" y="0">Sebin's</text>
    <text class="unit" id="space" x="0" y="70">Space</text>
    <g class="unit" id="getinbtn">
      <rect id="frame" fill="none"
            x="-19" y="124" height="19" width="38" />
      <text id="getin" x="0" y="140">Get In</text>
    </g>
  </g>

  <!-- path elements for a page Transition will be added to here -->
  <g id="pgTransition"></g>

</svg>
</template>
<script>
  import { svg1Setting } from '@/js/svgintro.js';

  export default {
    name: "Intro",
    data(){
      return {

      };
    },
    methods: {
      getIn(){
        const aniDuration = 2500;
        // this is the duration of pageTransition animation

        window.setTimeout(()=>{
          this.$emit("next");
        }, aniDuration);
      }
    },
    mounted(){
      const compo = this.$el;
      const btn = compo.querySelector("g#getinbtn");

      btn.addEventListener("click", this.getIn);
      // btn.addEventListener('touchstart', this.getIn);

      svg1Setting();

    },
    destroyed(){
      
    }
  };
</script>
<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Josefin+Sans|Wendy+One);
  @import '@/scss_modules/mixins.scss';

  $stroke: #66D9EF;
  $textColor: $stroke;

  #svg1 {
    @include absoluteMiddle;
    width: 100%; height: 100%;
    min-width: 250px; min-height: 550px;

    /* due to stupid IE */
    overflow: hidden;
  }

  #bgrect {

  }

  #icon {
  fill: none;
  stroke: $stroke;
  stroke-width: 6;

  }

  // random shapes that will be spread around the screen.
  // * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * - * //
  .obj_ {
  fill: none;
  stroke: {
    linecap: round;
    linejoin: round;
    width: 3;
    dasharray: 5,4;

  };
  }

  #titletexts {
  fill: $textColor;
  text-anchor: middle;

  #sebins, #space {
    font-size: 70px;
    font-family: 'Wendy One', fantasy,  courier;

    @media screen and (max-width: 500px){
      font-size: 55px;
    }
  }

  #welcometo, #getin {
    font-family: 'Josefin Sans', fantasy, courier;
  }

  #getinbtn {
    cursor: pointer;
  }
  #frame {
    fill: none;
    stroke: $stroke;
    stroke-width: 1;
  }
  }


  #ripple {
  fill: none;
  stroke: #393939;
  //#070121;
  // #050217;
  stroke-width: 1;
  }
</style>
