import Vue from "vue";
import moment from "moment";

Vue.filter("formateDate", (date, format = "L") => {
  if (typeof date === "string") {
    date = date.replace(/[-\.]/g, "/");
  }

  return moment(date).format(format);
});
