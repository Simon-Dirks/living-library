<template>
  <teleport to="head"
    ><meta name="robots" content="noindex,nofollow" />
  </teleport>

  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

/* https://hospodarets.com/highlight_element_with_page_fading */
body.highlight-is-active {
  pointer-events: none;
}

.highlight {
  box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 9999;
  pointer-events: auto;
  transition: all 0.5s ease;
}
</style>
