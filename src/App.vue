<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { useHead } from "@vueuse/head";

export default {
  setup() {
    useHead({
      title: "Living Library [Prototype]",
      meta: [
        {
          name: `robots`,
          content: `noindex,nofollow`,
        },
        {
          name: `msapplication-TileColor`,
          content: `#2b5797`,
        },
        {
          name: `theme-color`,
          content: `#ffffff`,
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#5bbad5",
        },
      ],
    });
  },
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

/*div, h1, h2, h3, h4, ion-title, ion-card-title, ion-label, span, p {*/
/*  font-size: 1rem !important;*/
/*}*/

ion-title,
ion-card-title {
  font-size: 1rem !important;
}

ion-label,
label,
span,
p,
li,
ion-card-subtitle,
textarea {
  font-size: 0.8rem !important;
}

h2 {
  font-size: 1.2rem !important;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

.text-white {
  color: white;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.bottom-0 {
  bottom: 0;
}

.font-normal {
  font-weight: normal;
}
</style>
