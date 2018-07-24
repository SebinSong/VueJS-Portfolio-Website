<template>
  <footer>
    <p>Last updated on <br class="lb"/>24th Jul, 2018</p>
    <div class="info" @click="infoOn = true"><span>INFO <i class="fas fa-info-circle"></i></span></div>
    <div class="infobox" :class="{active: infoOn}">
      <p class="text">This SPA is created using <span class="tech">Vue.js</span> , <span class="tech">SASS</span> , <span class="tech">SVG</span> , <span class="tech">html5 Canvas</span> , and <span class="tech">GSAP TweenMax</span> Library.</p>
      <span class="close" @click="infoOn = false"><i class="fas fa-times"></i></span>
    </div>
  </footer>
</template>
<script>
  import { TweenMax } from 'gsap/TweenMax';

  export default {
    name: "Footer",
    data(){
      return {
        infoOn: false
      };
    },
    mounted(){
      TweenMax.from( this.$el, 1, {
        opacity: 0
      });
    }
  };
</script>
<style lang="scss">
  @import '@/scss_modules/mixins.scss';
  $text: #272822;

  footer {
    position: absolute;
    bottom: 0; left: 0;

    width: 100%;
    height: 80px;
    border-top: 1px solid rgba(0,0,0,0.2);
    background-color: #A6E22E;
    z-index: 3;

    font: {
      family: 'Josefin Sans', courier;
      size: 16px;
    }

    p, div.info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      padding: 0 15px;

    }
    p {
      left: 0;
      margin-left: 20px;
      @media screen and (max-width: 500px){
        margin-left: 5px;
      }
    }

    br.lb {
      display: none;
      @media screen and (max-width: 500px){
        display: block;
      }
    }

    div.info {
      display: inline-block;
      right: 0;

      font-size: inherit;
      opacity: 0.8;
      margin-right: 20px;
      cursor: pointer;

      i {
        font-size: 1.2em;
      }

      &:hover span {
        font-weight: bold;
      }

      @media screen and (max-width: 600px){
        margin-right: 0;
      }
    }

    @media screen and (max-width: 600px){
      height: 60px;
    }

    @media screen and (max-width: 500px){
      font-size: 13px;
    }

    div.infobox {
      $bg: #213F27;
      $bg2: #A6E22E;

      position: absolute;
      width: 300px; min-height: 150px;
      bottom: 0; right: -500px;
      display: flex;
      background:
        repeating-linear-gradient(to bottom, transparent 0px, transparent 2px,
      rgba($bg,0.5) 2px, rgba($bg, 0.5) 3px);
      background-color: $bg2;
      border: 3px solid $bg;
      box-shadow: 8px -8px 0px 0px rgba(0,0,0,0.25);
      color: $bg;
      transition: all 0.3s linear;

      font: {
        weight: bold; size: 15px;
      }

      align-items: center;

      outline: 1px solid rgba($text,0.6);
      outline-offset: -6px;

      padding: 12px;

      &.active {
        right: 0px;
      }

      p {
        text-align: center;
      }

      span.tech {
        display: inline-block;
        margin-bottom: 3px;
        padding: 5px 8px;

        background-color: $bg;
        color: $bg2;
      }

      span.close {
        position: absolute;
        top: 7px; right: 7px;
        width: 20px; height: 20px;
        border: 1px solid $bg;
        text-align: center;
        line-height: 23px;
        cursor: pointer;

        &:hover {
          background-color: rgba($bg, 0.7);
          color: $bg2;
        }
        &:active {
          background-color: $bg;
        }
      }

      @media screen and (max-width: 400px) {
        width: 100%;
      }
    }
  }
</style>
