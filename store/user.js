export const state = () => ({
  isLogged: false,
  isLoggining: false,
  username: "",
  avatar: "",
  email: "",
  uuid: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  consultant_number: ""
});

export const mutations = {
  setLoginState(state, isLogged) {
    state.isLogged = isLogged;
  },

  setUserClientInfo(state, userClientInfo) {
    for (const property in userClientInfo) {
      state[property] = userClientInfo[property];
    }
  }
};

export const actions = {
  logout({ commit }) {
    const isLogged = false;

    commit("setLoginState", isLogged);
  },

  login(
    { commit },
    { username, uuid, avatar, first_name, last_name, email, consultant_num }
  ) {
    const userClientInfo = {
      userId: uuid,
      username,
      avatar,
      first_name,
      last_name,
      email,
      consultant_number: consultant_num
    };

    commit("setUserClientInfo", userClientInfo);
    commit("setLoginState", true);
  }
};
