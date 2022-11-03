<template>
  <ion-header class="information-modal-header">
    <ion-toolbar>
      <ion-title>Welcome to the Living Library</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal">
          <ion-icon name="close" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <div class="ion-padding information-modal-container">
    <h3>Pushing the boundaries of open science</h3>
    <p>
      Welcome to our first prototype of a Living Library. The Living Library is
      an experimental format for surveying the academic literature on a
      particular topic.
    </p>
    <p>
      As a medium, the Living Library is designed to invite reflection on the
      meaning and the limits of open science. Its functions facilitate deeper
      engagement with the role of the scientist in the academic conversation and
      confront "Living Librarians" with questions such as:
    </p>
    <ul>
      <li>"Who are you as a researcher?"</li>

      <li>"What parts of your work should others be able to see?"</li>
    </ul>
    <p>
      The Living Library invites you (yes, you!) to engage in conversation with
      the Librarians and other visitors. Why don't you leave a note? Look out
      for this icon:
      <ion-icon name="chatbubbles"></ion-icon>
    </p>

    <h3>Using the Living Library</h3>
    <p>
      In this particular Living Library, the Librarians survey the academic
      literature that speaks about education in connection with the pandemic.
      You can explore prominent themes in the literature in a connective manner
      and apply other filters to find certain kinds of articles and read the
      researchers' notes on their content and the coding work. Use a time slider
      to filter articles according to submission dates and observe how the
      literature changes over time!
    </p>

    <h3>It's alive!</h3>
    <p>
      This first prototype of a Living Library is a small-scale project run by a
      team of devoted teachers, students and researchers at Utrecht University.
      The thematic organisation of articles is based on continuous qualitative
      analyses of the literature with a coding scheme that evolves along with
      the academic conversation. Our aim is to identify and help others
      integrate the various red threads running through the educational
      literature on the pandemic. For over a year we kept a finger on the pulse,
      asking: What is happening, and what matters in education?
    </p>

    <h3>A human face</h3>
    <p>
      The Flow of Time was hand-painted by Lizzy, one of the founders of this
      Living Library prototype. It reminds us that themes in the literature are
      more fluent and intertwined than our categories make it seem. It also
      reminds us that an overview on the literature is always a snapshot in
      time.
    </p>
    <p>
      While other search tools that have been created to date are run by
      algorithms and aim to be comprehensive, extracting and visualising
      quantitative data, the Living Library takes a complementary approach: it
      invites you to get to know a sampled part of the literature from an
      interpretive, human perspective.
    </p>

    <h3>Contact us</h3>
    <p>
      We invite you to write to us with ideas, questions, praise and criticism
      on the Living Library:
      <em><a href="mailto:livinglibrary@uu.nl">livinglibrary@uu.nl</a></em>
    </p>

    <hr />

    <h3>How do we sort articles thematically?</h3>
    <p>
      <strong>We give articles the label "Affect" when they contain...</strong>
    </p>
    <p>
      ... elements referring to the psychological-social phenomena of teachers,
      students, managers, parents and caregivers.
    </p>
    <p>
      For example: motivation, engagement, distress and stress-related symptoms.
    </p>
    <p>Sample extracts from articles:</p>
    <ul>
      <li>
        “Our findings show that parents, as proxy educators, experience
        heightened levels of mental health distress when their child struggles
        to adapt to a distance learning pedagogy” (<a
          href="https://journals.sagepub.com/doi/full/10.3102/0013189X20978806"
          target="_blank"
          >Davis et al., 2021</a
        >, p. 62)
      </li>
      <li>
        “…given that disembodiment and loss of community and belonging emerged
        as the most pressing concerns amongst both students and faculty
        academics” (<a
          href="https://www.tandfonline.com/doi/full/10.1080/03075079.2020.1859681"
          target="_blank"
          >Eringfeld, 2020</a
        >, p. 155)
      </li>
    </ul>

    <p>
      <strong
        >We give articles the label "Teaching practice" when they
        contain...</strong
      >
    </p>
    <p>
      ... elements relating directly to the teaching process, e.g., online
      pedagogy and general or online teaching values.
    </p>
    <p>Note that assessment is considered together with achievement.</p>

    <p>
      <strong>
        We give articles the label "Context of teaching" when they
        contain...</strong
      >
    </p>
    <p>
      ... elements relating to the context within which the teaching is taking
      place, e.g., the universities, schools, or other organizational
      structures.
    </p>

    <p>
      <strong
        >We give articles the label "Academic achievement and assessment" when
        they contain...</strong
      >
    </p>
    <p>
      ... elements relating to the actual performance of students and the forms
      of assessment being used.
    </p>

    <p>
      <strong>We give articles the label "Equity" when they contain...</strong>
    </p>
    <p>... elements relating to diversity and vulnerable student groups.</p>
  </div>
</template>

<script>
import { modalController } from "@ionic/vue";

export default {
  name: "InformationPopup",
  components: {},
  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
};
</script>

<style>
.ion-page {
  display: flex;
  flex-flow: column;
  height: 100%;
}

.information-modal-header {
  flex: 0 1 auto;
}

.information-modal-container {
  flex: 0 1 auto;
  overflow: auto;
}

ul {
  padding-left: 30px;
}
</style>
