<template>
  <ion-content>
    <p v-if="!logbookData" class="ion-padding-horizontal">
      <ion-spinner class="ion-margin-end" style="top: 8px"></ion-spinner>
      <em>Loading theme logbook data...</em>
    </p>
    <div v-if="logbookData">
      <table>
        <tr>
          <th v-for="colName in logbookColumnNames" :key="colName">
            {{ colName }}
          </th>
        </tr>
        <tr v-for="logbookRow in logbookData" :key="JSON.stringify(logbookRow)">
          <td v-for="logbookCell in logbookRow" :key="logbookCell">
            {{ logbookCell }}
          </td>
        </tr>
      </table>
    </div>
  </ion-content>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ThemeLog",
  mixins: [],
  components: {},
  computed: {
    ...mapGetters({
      logbookData: "themeLogbook/getLogbookData",
      logbookColumnNames: "themeLogbook/getLogbookColumnNames",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      loadThemeLogbookData: "themeLogbook/loadThemeLogbookData",
    }),
  },
  mounted() {
    this.loadThemeLogbookData();
  },
};
</script>

<style>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
