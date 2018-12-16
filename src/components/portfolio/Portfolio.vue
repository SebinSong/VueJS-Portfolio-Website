<template>
<div class="portfolio">
  <canvas class="canvas_portfolio"></canvas>
  <button class="btn back" @click.prevent="back"><i class="fas fa-backward"></i></button>
  <button class="btn next" @click.prevent="next"><i class="fas fa-forward"></i></button>

  <p class="page"><span class="current">{{ currentIndex + 1 }}</span><span>/</span><span class="total">{{ dataArr.length }}</span></p>

  <content>
    <p class="title ani"><span>{{ dataArr[currentIndex].title }}</span></p>
    <div class="img ani">
      <img :src="'@/../static/' + imgs[currentIndex]" alt="preview picture" />
    </div>
    <div class="explanation ani">
      <p class="description"
         v-if="dataArr[currentIndex].hasOwnProperty('description')"
      ><span>Description</span> : <br class="lb" />{{ dataArr[currentIndex].description }}</p>
      <p class="completedon"
         v-if="dataArr[currentIndex].hasOwnProperty('completedon')"
      ><span>Completed On</span> : <br class="lb" />{{ dataArr[currentIndex].completedon }}</p>
      <p class="lastupdatedon"
         v-if="dataArr[currentIndex].hasOwnProperty('lastupdatedon')"
      ><span>Last Updated On</span> : <br class="lb" />{{ dataArr[currentIndex].lastupdatedon }}</p>
      <p class="tech"
         v-if="dataArr[currentIndex].hasOwnProperty('tech')"
      ><span>Tech Used</span> : <br class="lb" />{{ dataArr[currentIndex].tech }}</p>
      <p class="cons"
         v-if="dataArr[currentIndex].hasOwnProperty('cons')"
      ><span>Cons</span> : <br class="lb" />{{ dataArr[currentIndex].cons }}</p>
      <p class="link"
         v-if="dataArr[currentIndex].hasOwnProperty('link')"
      ><span>Link</span> : <a class="checkout" :href="dataArr[currentIndex].link" target="_blank">Check Out</a></p>
      <p class="github"
         v-if="dataArr[currentIndex].hasOwnProperty('github')"
      ><span>Github Repo</span> : <a class="checkout" :href="dataArr[currentIndex].github" target="_blank">Check Out</a></p>
    </div>
  </content>
</div>
</template>
<script>
  import dataset from '@/js/texts_portfolio';
  import { canvasSetting, cancelCanvasAnimation } from '@/js/canvasbg';
  import { TweenMax } from 'gsap/TweenMax';

  export default {
    name: 'Portfolio',
    data(){
      return {
        currentIndex: null,
        dataArr: null,
        itemsToAnimate: null,
        animationOn: false,
        imgs: [ "zigzagchatroom_preview.jpg", "cssanimationstorage_preview.jpg", "dtweatherwidget_preview.jpg",
                "articleviewer_preview.jpg", "rqm_preview.jpg" ]
      };
    },
    methods: {
      back(){
        if(this.currentIndex == 0 || this.animationOn){
          return;
        }
        else {
          this.currentIndex -= 1;
          this.bounceElements();
        }
      },
      next(){
        if(this.currentIndex == (this.dataArr.length - 1) ||
           this.animationOn) return;
        else {
          this.currentIndex += 1;
          this.bounceElements();
        }

      },
      bounceElements(){

        if(!this.animationOn){
          this.animationOn = true;

          TweenMax.staggerFrom(this.itemsToAnimate, 0.3, {
            opacity: 0, x: "+=200px",
            ease: Elastic.easeOut.config(1, 0.4),
            delay: 0.2
          }, 0.15, ()=>{
            console.log("All done!");
            this.animationOn = false;
          });

        }

      }
    },
    created(){
      this.dataArr = dataset;
      this.currentIndex = 0;

    },
    mounted(){
      let items = this.$el.querySelectorAll('.ani');
      this.itemsToAnimate = [].slice.call(items);

      TweenMax.from( this.$el, 1, {
        opacity: 0, delay: 0.3
      });

      canvasSetting(this.$el,
                    this.$el.querySelector("canvas.canvas_portfolio"));
    },
    beforeDestroy(){ cancelCanvasAnimation(); }
  };
</script>
<style lang="scss">
@import '@/scss_modules/mixins.scss';

$text: #272822;
$bgcolor: #A6E22E;
$slightborder: 1px solid rgba(0,0,0,0.25);
$boxshadow: 5px 5px 0px 0px rgba(0,0,0,0.25);


  div.portfolio {
    @include absoluteMiddle;

    height: calc(100% - 160px);
    width: 55vw;
    min-width: 800px;
    z-index: 0;

    border: {
      left: $slightborder; right: $slightborder;
    }

    @media screen and (max-width: 900px){
      min-width: 0px;
      width: 600px;
      overflow: hidden;
    }
    @media screen and (max-width: 600px){
      width: 100vw;
    }

    font: {
      family: 'Josefin Sans', courier;
      size: 18px;
      weight: bold;
    }

    canvas.canvas_portfolio {
      @include absoluteMiddle;
    }

    button.btn {
      position: absolute;
      width: 100px; height: 80px;
      border: 1px solid $text;
      top: 50%;
      transform: translateY(-50%);

      font-size: 40px;
      color: $bgcolor;
      background-color: $text;
      box-shadow: $boxshadow;

      outline: 1px solid rgba($text, 0);
      outline-offset: 5px;
      z-index: 1;

      transition: outline-color 0.15s linear;

      &:hover {
        outline-color: rgba($text, 0.8);
      }

      @media screen and (max-width: 900px) {
        top: 15px;
        transform: translateY(0);
        font-size: 30px;
        width: 80px; height: 60px;
      }

      @media screen and (max-width: 600px){
        width: 60px; height: 40px;
        font-size: 24px;
      }
    }
    button.btn.back {
      left: -50px;
      &:hover i{
        animation: toleft 0.8s linear infinite;
      }

      @media screen and (max-width: 900px) {
        left: 15px;
      }
    }
    button.btn.next {
      right: -50px;
      &:hover i{
        animation: toright 0.8s linear infinite;
      }

      @media screen and (max-width: 900px) {
        right: 15px;
      }
    }

    @keyframes toleft {
      0%{transform: translateX(20%);} 70%{transform: translateX(-20%);}
      100%{transform: translateX(-20%);}
    }
    @keyframes toright {
      0%{transform: translateX(-20%);} 70%{transform: translateX(20%);}
      100%{transform: translateX(20%);}
    }

    p.page {
      position: absolute;
      left: 0; bottom: 0;
      margin: 0 0 10px 10px;
      font-size: 32px;

      span {
        display:inline-block;
        padding: 10px 5px;
      }

      @media screen and (max-width: 900px) {
        bottom: none;
        top: 15px; left: 50%;
        transform: translateX(-50%);

        font-size: 25px;
      }

      @media screen and (max-width: 600px){
        font-size: 18px;
      }
    }

    content {
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);

      width: 500px; height: 100%;

      overflow-y: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        width: 10px;
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

      @media screen and (max-width:900px){
        height: calc(100% - 100px);
        top: 100px;
        border-top: $slightborder;
      }

      @media screen and (max-width: 600px){
        height: calc(100% - 80px);
        top: 80px;
      }

      @media screen and (max-width: 500px){
        width: 100vw;

        transform: none;
        left:0;
      }
    }

    content p {
      @media screen and (max-width: 500px){
        margin-bottom: 12px;
      }
    }

    content p.title {

      padding: 20px;
      line-height: 1.1em;
      text-align: right;

      span {
        display: inline-block;
        background-color: $text;
        color: $bgcolor;

        font-size: 25px;
        padding: 15px 20px;
        box-shadow: $boxshadow;

        @media screen and (max-width: 500px){
          font-size: 20px;
          padding: 10px 15px;
        }
      }

      @media screen and (max-width: 500px){
        padding-right: 15px;
      }
    }

    content div.img {
      position: relative;
      margin-bottom: 15px;
      display: flex;
      justify-content: center;

      img {
        max-height: 155px;
        max-width: 60%;
        margin: 20px;
        outline: 1px solid rgba($text,0.7);
        outline-offset: 4px;

        box-shadow:
          15px 15px 0px 0px rgba($text, 0.25);

        @media screen and (max-width: 500px){
          max-height: 125px;
          max-width: 75%;
        }
      }
    }

    content div.explanation {
      $hover: #014034;
      $bgcolor: #A6E22E;

      padding: 30px 20px 20px;
      line-height: 1.8em;
      font: {
        size: 17px; weight: 100;
      }
      text-shadow: 3px 3px 0px rgba(0,0,0,0.15);

      border-top: $slightborder;

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

      a.checkout {
        position: relative;
        background-color: $hover;
        color: $bgcolor;
        padding: 9px 10px 7px;
        font: {
          weight: bold; size: 0.9em;
        }

        transition: transform 0.25s linear;
        animation: shadowani 3s linear infinite;

        &:hover {
          outline: 1px solid $hover;
          outline-offset: 3px;
        }
        &:active {
          background-color: darken($hover, 3%);
        }
      }

      @keyframes shadowani {
        0%{
          box-shadow:
            6px 6px 0px 0px rgba(0,0,0,0.3),
            -6px -6px 0px 0px rgba(0,0,0,0.2);
        }
        50%{
          box-shadow:
            6px -6px 0px 0px rgba(0,0,0,0.3),
            -6px 6px 0px 0px rgba(0,0,0,0.2);
        }
        100%{
          box-shadow:
            6px 6px 0px 0px rgba(0,0,0,0.3),
            -6px -6px 0px 0px rgba(0,0,0,0.2);
        }
      }
    }

  }
</style>
