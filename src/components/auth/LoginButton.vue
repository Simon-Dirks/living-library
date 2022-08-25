<template>
  <ion-button @click="onLoginClicked" v-if="!user">
    <span> Log in </span>
  </ion-button>

  <div v-if="user">
    <ion-button @click="onLogoutClicked" size="small">
      <span> Log out as {{ user.displayName }}</span>
    </ion-button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "LoginButton",
  props: [],
  components: {},
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    onLoginClicked() {
      window.location.href = "/signin";
    },
    onLogoutClicked() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {})
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

<style></style>
