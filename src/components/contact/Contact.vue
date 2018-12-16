<template>
  <div class="contact">
    <canvas class="canvas_contact"></canvas>
    <svg class="contactsvg ani" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1" viewBox="0 0 500 500" preservePerspectRatio="xMidYMid">
        <rect id="bgrect" />
    </svg>
    <content class="ani">
      <p class="comment">You will never regret your decision to have me.</p>
      <p class="phone"><span>Phone</span> : <br class="lb" />+82-10-5102-1147 (Kor)</p>
      <p class="email"><span>Email</span> : <br class="lb" />songxevin@gmail.com</p>
    </content>
  </div>
</template>
<script>
  import svgSetting from '@/js/contactsvg.js';
  import {canvasSetting, cancelCanvasAnimation } from '@/js/canvasbg';
  import { TweenMax } from 'gsap/TweenMax';

  export default {
    name: "Contact",
    data(){
      return {

      };
    },
    mounted(){
      svgSetting();

      TweenMax.from( this.$el, 1, {
        opacity: 0, delay: 0.3
      });

      canvasSetting(this.$el,
                    this.$el.querySelector("canvas.canvas_contact"),
                    true);
    },
    beforeDestroy(){ cancelCanvasAnimation(); }
  };
</script>
<style lang="scss">
@import '@/scss_modules/mixins.scss';

$slightborder: 1px solid rgba(0,0,0,0.25);
$text: #272822;
$bgcolor: #A6E22E;

div.contact {
  @include absoluteMiddle;

  height: calc(100% - 160px);
  width: 55vw;
  min-width: 800px;
  z-index: 0;

  border: {
    left: $slightborder; right: $slightborder;
  }

  &::-webkit-scrollbar-track {
    border: $slightborder;
    background-color: rgba(0,0,0,0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($text, 0.8);
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: $text;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 900px){
    min-width: 0px;
    width: 600px;
    overflow: hidden;
  }
  @media screen and (max-width: 600px){
    width: 100vw;
    display: block;

    overflow-y: scroll;
    overflow-x: hidden;
    padding: 10px;
  }

  font: {
    family: 'Josefin Sans', courier;
    size: 18px;
    weight: bold;
  }

  canvas.canvas_contact {
    @include absoluteMiddle;
  }

  content {
    $hover: #014034;
    $bgcolor: #A6E22E;
    $boxshadow: 5px 5px 0px 0px rgba(0,0,0,0.25);

    width: 500px;
    padding: 30px 20px 20px;
    margin: 0px auto 10px;
    line-height: 1.8em;
    font: {
      size: 17px; weight: 100;
    }
    text-shadow: 3px 3px 0px rgba(0,0,0,0.15);

    p {
      text-align: center;
    }

    br.lb {
      display: none;
      @media screen and (max-width: 500px){
        display: block;
      }
    }

    span {
      display: inline-block;
      background-color: $text;
      box-shadow: $boxshadow;
      color: $bgcolor;

      margin: 5px 8px 5px 0;
      padding: 0px 5px;
    }

    @media screen and (max-width: 500px){
      width: 100vw;
    }
  }

}

/*
  *
  svg Elements Styling
  *
*/
svg.contactsvg {

  display: block;
  width: 400px; height: 400px;
  margin: 10px auto;

  overflow: hidden;

  border: {
    top: $slightborder;
    bottom: $slightborder;
  }

  @media screen and (max-width: 900px){
    width: 300px; height: 300px;
  }

  rect#bgrect {
    fill: none;
  }

  .cloud_fill {
    fill: $text;
  }
  .cloud_nofill {
    fill: none;
    stroke: $text;
  }

  .sun_inner {
    fill: $text;
  }
  .sun_outer {
    fill: none;
    stroke: $text;
    stroke-linecap: round;
  }

  line.horizon {
    fill: none;
    stroke: $text;
    stroke-width: 4;
  }


  polyline.bg_polyline {
    fill: none;
    stroke: rgba(50,50,50,0.3);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 7,12;
  }

  g.mountainShade {
    fill: $bgcolor;
    stroke: $text;
    stroke-width: 3;
  }

  .mtPattern {
    fill: none;
    stroke: $bgcolor; stroke-width: 1;
    stroke-linejoin: round;
  }

  .mtPattern path {
    stroke-width: 1;
  }

  .building path {
    fill: $text;
    stroke: $bgcolor; stroke-width: 1;
    stroke-linejoin: round;
  }


  g.bird path{
    fill: none;
    stroke: $text;
    stroke-linecap: round;
    stroke-width: 2;
  }

}

</style>
