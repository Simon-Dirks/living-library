export const dateMixin = {
  methods: {
    dateToTimestamp(date) {
      return date.valueOf();
    },
    timestampToDate(timestamp) {
      var d = new Date(timestamp);

      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        // day: "numeric",
      });
    },
  },
};
