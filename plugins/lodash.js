import Vue from "vue";
import isNumber from "lodash/isNumber";
import debounce from "lodash/debounce";

const _ = {
  isNumber,
  debounce
};

const lodash = {
  install(Vue) {
    Vue.prototype.$_ = _;
  }
};

Vue.use(lodash);

export default _;
