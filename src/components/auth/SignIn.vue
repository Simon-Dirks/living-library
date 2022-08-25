<template>
  <ion-content>
    <div id="firebaseui-auth-container"></div>
    <div id="loader">Loading...</div>
  </ion-content>
</template>

<script>
import firebase from "firebase/compat";
import * as firebaseui from "firebaseui";

export default {
  name: "SignIn",
  props: [],
  components: {},
  data() {
    return {};
  },
  mounted() {
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          return true;
        },
        uiShown: function () {
          document.getElementById("loader").style.display = "none";
        },
      },
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  methods: {},
};
</script>

<style></style>

<style>
#firebaseui-auth-container {
  margin-top: 2rem;
}
</style>
