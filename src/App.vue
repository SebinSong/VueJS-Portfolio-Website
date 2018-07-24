<template>
  <div id="app">
    <Intro @next="activateRouter" v-if="!pageTransitionDone"/>
    <div class="bgguard" v-if="pageTransitionDone"></div>
    <Navbar v-if="pageTransitionDone" />
    <router-view/>
    <Footer v-if="pageTransitionDone" />
  </div>
</template>
<script>
// Importing Components
import Intro from '@/components/Intro';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default {
  name: 'App',
  components: {
    Intro, Navbar, Footer
  },
  data(){
    return {
      pageTransitionDone: false
    };
  },
  watch: {
    pageTransitionDone(newVal, oldVal){
      if(newVal){
        this.$router.push({name: "whoiam"});
      }
    },
    '$route' (newRoute, oldRoute) {
      if(!this.pageTransitionDone) this.pageTransitionDone = true;
    }
  },
  methods: {
    activateRouter(){
      this.pageTransitionDone = true;
    }
  },
  mounted(){
    let route = this.$route;

    if(route.name) {
      this.pageTransitionDone = true;
    }
  }
}
</script>

<style lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Josefin+Sans|Wendy+One);
  @import '@/scss_modules/normalize.scss';

  div#app {
    width: 100%; height: 100%;
  }

  div.bgguard {
    width: 100%; height: 100%;
    background-color: #A6E22E;

    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
