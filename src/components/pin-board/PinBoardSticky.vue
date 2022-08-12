<template>
  <div :class="`sticky-container ${comment ? '' : 'editable'}`">
    <template v-if="comment">
      <p>
        <strong class="sticky-title">{{ comment.title }}</strong>
      </p>
      <p>{{ comment.text }}</p>
    </template>

    <template v-if="!comment && !commentSubmitting">
      <ion-input
        placeholder="Share your thoughts here..."
        class="sticky-title-input"
        v-model="newCommentTitle"
      ></ion-input>
      <ion-textarea
        class="sticky-text-input"
        placeholder="..."
        :auto-grow="autoGrow"
        @ionFocus="onFocus"
        v-model="newCommentText"
      ></ion-textarea>
      <ion-button
        fill="clear"
        size="small"
        @click="submitToModerators"
        class="submit-sticky-button"
      >
        <ion-icon name="send"></ion-icon>
        Submit
      </ion-button>
    </template>

    <template v-if="!comment && commentSubmitting">
      <ion-spinner></ion-spinner>
    </template>
  </div>
</template>

<script>
import { alertController } from "@ionic/vue";
import { mapActions } from "vuex";

export default {
  name: "PinBoardSticky",
  props: ["logId", "comment"],
  data() {
    return {
      autoGrow: false,
      newCommentText: "",
      newCommentTitle: "",
      commentSubmitting: false,
    };
  },
  methods: {
    ...mapActions({
      sendComment: "themeLogbook/sendComment",
    }),
    onFocus() {
      this.autoGrow = true;
    },
    async submitToModerators() {
      if (!this.newCommentTitle.trim()) {
        await this.presentAlert(
          "Failed to submit",
          "Please enter a title for your response."
        );
        return;
      }

      if (!this.newCommentText.trim()) {
        await this.presentAlert("Failed to submit", "Please enter a comment.");
        return;
      }

      this.commentSubmitting = true;
      this.sendComment({
        logId: this.logId,
        comment: { text: this.newCommentText, title: this.newCommentTitle },
      })
        .then(() => {
          this.newCommentText = "";
          this.newCommentTitle = "";
        })
        .catch(() => {
          this.presentAlert(
            "Failed to submit",
            "Could not submit your response."
          );
        })
        .finally(() => {
          this.commentSubmitting = false;
        });
    },
    async presentAlert(header, message) {
      const alert = await alertController.create({
        header: header,
        message: message,
        buttons: ["OK"],
        keyboardClose: true,
      });

      await alert.present();
    },
  },
};
</script>

<style>
.sticky-container {
  display: inline-block;
  margin: 0.5rem;
  width: 40%;
  vertical-align: top;
  background: #f3ea68;
  padding: 0.4rem 1rem;
  -webkit-box-shadow: 0px 3px 5px -4px rgba(0, 0, 0, 0.52);
  box-shadow: 0px 3px 5px -4px rgba(0, 0, 0, 0.52);
}

.sticky-container.editable {
  background: rgba(243, 234, 104, 0.5);
  border: 2px dashed rgba(199, 192, 83, 0.5);
}

.submit-sticky-button {
  float: right;
  font-size: 0.7rem;
  --color: #444444;
}

.submit-sticky-button ion-icon {
  margin-right: 0.5rem;
}

.sticky-title-input {
  font-weight: bold;
}

.sticky-title-input input {
  padding-bottom: 0 !important;
}

.sticky-text-input {
  margin-top: 0;
}

.sticky-title {
  font-size: 1rem;
}
</style>
