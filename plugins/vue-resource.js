import Vue from "vue";
import VueResource from "vue-resource";
import * as Cookies from "js-cookie";

const API =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/current"
    : "/api/current";

Vue.use(VueResource);

Vue.http.options.root = API;
Vue.http.options.emulateHTTP = true;
Vue.http.headers.common["X-CSRFToken"] = Cookies.get("csrftoken");
