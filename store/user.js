export const state = () => ({
  isLogged: false,
  isLoggining: false,
  username: "",
  avatar: "",
  email: "",
  userId: "",
  first_name: "",
  last_name: ""
});

export const mutations = {
  setLoginState(state, isLogged) {
    state.isLogged = isLogged;
  }
};

export const actions = {
  logout({ commit, state }, request) {
    const isLogged = false;

    commit("setLoginState", isLogged);
  },

  login(
    { commit, state },
    { username, userId, avatar, first_name, last_name, email }
  ) {
    const updatedState = {
      username,
      userId,
      avatar,
      first_name,
      last_name,
      email,
      ...state
    };

    state = updatedState;

    commit("user/setLoginState", true);
  }
};
