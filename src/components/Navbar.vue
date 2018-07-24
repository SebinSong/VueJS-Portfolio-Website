<template>
  <nav class="navbar">
    <ul class="menu">
      <li class="navbtn" :class="{active: whoiamon}" @click="navigate('whoiam')"><a>Who I Am</a></li>
      <li class="navbtn" :class="{active: portfolioon}" @click="navigate('portfolio')"><a>Portfolio</a></li>
      <li class="navbtn" :class="{active: contacton}" @click="navigate('contact')"><a>Contact</a></li>
    </ul>
    <ul class="social" :class="{active: socialopen}">
      <li><a href="https://www.linkedin.com/in/sebinsong" target="_blank"><i class="fab fa-linkedin"></i></a></li>
      <li><a href="https://github.com/SebinSong" target="_blank"><i class="fab fa-github"></i></a></li>
      <li><a href="https://codepen.io/freenaturalsoul/" target="_blank"><i class="fab fa-codepen"></i></a></li>
    </ul>
    <div class="hamburger" :class="{active: socialopen}" @click="socialopen = !socialopen"><i class="fas fa-bars"></i><i class="fas fa-times"></i></div>
  </nav>
</template>
<script>
  import { TweenMax } from 'gsap/TweenMax';

  export default {
    name: "Navbar",
    data(){
      return {
        whoiamon: true, portfolioon: false, contacton: false,
        socialopen: false
      };
    },
    methods: {
      navigate(str){
          const vue = this;
          this.whoiamon = this.portfolioon = this.contacton = false;
          vue[`${str}on`] = true;

          this.$router.push({name: str});
      }
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
  $hover: #014034;
  $bgcolor: #A6E22E;

  nav.navbar {
    position: absolute;
    width: 100%;
    height: 80px;
    top: 0;
    z-index: 1;
    background-color: $bgcolor;

    font: {
      family: 'Josefin Sans', courier;
      size: 18px;
      weight: bold;
    }
    color: $text;
    border-bottom: 1px solid rgba(0,0,0,0.2);

    @media screen and (max-width: 600px){
      height: 70px;
      font-size: 14px;
    }

    ul.menu {
      position: relative;
      width: 100%; height: 100%;

      display: flex;
      flex-wrap: nowrap;
      justify-content: center;

      @media screen and (max-width: 900px){
        justify-content: flex-start;
      }
    }

    li.navbtn {
      height: 100%;
      margin-right: 10px;
      overflow: hidden;
      position: relative;

      &:after {
        content: "";
        display: block;
        height: 5%; width: 100%;
        background-color: rgba($text, 0.8);

        position: absolute;
        left: 0; bottom: 15%;
        transition: transform 0.3s cubic-bezier(.1,.69,.18,.99);

        transform: translateX(-110%);
      }

      &:hover:after, &.active:after {
        transform: translateX(0%);
      }

      &:first-child{
        @media screen and (max-width: 900px){
          margin-left: 20px;
        }
        @media screen and (max-width: 600px){
          margin-left: 10px;
        }
      }

      @media screen and (max-width: 600px){
        margin-right: 4px;
      }
    }
    li.navbtn a {
      display: block;
      height: 100%;

      line-height: 80px;
      padding: 0 15px;
      cursor: pointer;

      &:nth-of-type(3){
        margin-right: 0;
      }

      @media screen and (max-width: 600px){
        padding: 0 5px;
        line-height: 70px;
      }
    }

    ul.social {
      position: absolute;
      right: 0px; top: 0px;

      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      transition: all 0.3s linear;


      li {
        @media screen and (max-width: 600px){
          height: 50px; width: 50px;
        }
      }

      &.active li{
        background-color: $hover;
        color: $bgcolor;
      }

      li:last-child {
        margin-right: 15px;

        @media screen and (max-width: 600px){
          margin-right: 0;
        }
      }

      li a {
        position: relative;
        display: block;
        height: 100%;
        padding: 20px 25px;
        font-size: 22px;
        cursor: pointer;
        transition: transform 0.15s linear;
        color: $text;

        &:hover {
          transform: scale(1.1);
        }

        @media screen and (max-width: 600px){
          padding: 10px 25px;
        }
      }

      &.active li a {
        color: $bgcolor;
      }

      i {
        @include absoluteMiddle;
      }

      @media screen and (max-width: 600px){
        top: 50px;
        z-index: 2;
        height: auto;

        flex-direction: column;
        right: -80px;
      }

      &.active {
        right: 0;
      }

    }

    div.hamburger {
      position: absolute;
      height: 50px; width: 50px;
      top: 0; right: 0;
      margin-top: 5px;
      font-size: 18px;
      display: none;
      cursor: pointer;

      &:hover, &.active {
        background-color: $hover;
        color: $bgcolor;
      }

      i {
        @include absoluteMiddle;
        transition: opacity 0.3s linear;
      }

      i.fa-bars { opacity: 1; }
      i.fa-times { opacity: 0; }
      &.active i.fa-bars { opacity: 0; }
      &.active i.fa-times { opacity: 1; }

      @media screen and (max-width: 600px){
        display: block;
      }

    }
  }
</style>
