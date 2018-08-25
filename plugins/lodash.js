import Vue from "vue";
import isNumber from "lodash/isNumber";

const _ = {
  isNumber
};

const lodash = {
  install(Vue) {
    Vue.prototype.$_ = _;
  }
};

Vue.use(lodash);

export default _;
