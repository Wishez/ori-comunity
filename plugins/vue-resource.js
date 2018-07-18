import Vue from "vue";
import VueResource from "vue-resource";
const API =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/current"
    : "/api/current";
console.log(API);

Vue.use(VueResource);

Vue.http.options.root = API;
Vue.http.options.emulateHTTP = true;
