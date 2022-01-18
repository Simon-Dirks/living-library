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
</style>
