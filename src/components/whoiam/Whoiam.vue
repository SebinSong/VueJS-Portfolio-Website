<template>
  <div class="whoiam">
    <canvas class="canvas_whoiam"></canvas>
    <button class="btn back" @click.prevent="back"><i class="fas fa-backward"></i></button>
    <button class="btn next" @click.prevent="next"><i class="fas fa-forward"></i></button>

    <p class="page"><span class="current">{{ currentIndex + 1 }}</span><span>/</span><span class="total">{{ dataArr.length }}</span></p>

    <content>
      <p class="title ani">{{ dataArr[currentIndex].title }}</p>
      <div class="img ani">
        <img src="@/assets/mypicture.jpg" alt="my picture" v-if="currentIndex == 0" />
      </div>
      <p class="description ani">{{ dataArr[currentIndex].description }}</p>
    </content>
  </div>
</template>
<script>
  import dataset from '@/js/whoiam';
  import canvasSetting from '@/js/canvasbg';
  import { TweenMax } from 'gsap/TweenMax';

  export default {
    name: 'whoiam',
    data(){
      return {
        currentIndex: null,
        dataArr: null,
        itemsToAnimate: null,
        animationOn: false
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
        opacity: 0, delay: 0.3,
        onComplete: ()=>{
          canvasSetting(this.$el,
                        this.$el.querySelector("canvas.canvas_whoiam"));
        }
      });
      
    }
  };
</script>
<style lang="scss">
@import '@/scss_modules/mixins.scss';

$text: #272822;
$bgcolor: #A6E22E;
$slightborder: 1px solid rgba(0,0,0,0.25);
$boxshadow: 5px 5px 0px 0px rgba(0,0,0,0.25);

  div.whoiam {
    @include absoluteMiddle;

    height: calc(100% - 160px);
    width: 55vw;
    min-width: 800px;
    border: {
      left: $slightborder; right: $slightborder;
    }

    font: {
      family: 'Josefin Sans', courier;
      size: 18px;
      weight: bold;
    }

    @media screen and (max-width: 900px){
      min-width: 0px;
      width: 600px;
      overflow: hidden;
    }
    @media screen and (max-width: 600px){
      width: 100vw;
    }

    canvas.canvas_whoiam {
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
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);

      width: 500px; height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;

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

      @media screen and (max-width: 500px){
        width: 100vw; height: calc(100% - 70px);

        transform: none;
        left:0; top: 70px;

        justify-content: flex-start;

        overflow-y: scroll;
        overflow-x: hidden;
      }
    }

    content p.title {
      background-color: $text;
      color: $bgcolor;
      box-shadow: $boxshadow;

      font-size: 35px;
      padding: 30px;

      margin-bottom: 20px;
      line-height: 1.1em;

      @media screen and (max-width: 900px) {
        margin-top: 40px;
      }

      @media screen and (max-width: 500px){
        margin-top: 20px;
        font-size: 23px;
      }
    }

    div.img {

      text-align: center;

      img {
        margin: 20px 0;
        max-height: 140px;

        outline: 1px solid rgba($text,0.7);
        outline-offset: 4px;

        box-shadow:
          15px 15px 0px 0px rgba($text, 0.25);
      }
    }

    content p.description {
      font-size: 25px;
      padding: 30px;
      line-height: 1.6em;

      border: {
        top: 1px solid rgba(0,0,0,0.25);
        bottom: 1px solid rgba(0,0,0,0.25);
      }

      @media screen and (max-width: 500px){
        font-size: 18px;
      }
    }

  }
</style>
