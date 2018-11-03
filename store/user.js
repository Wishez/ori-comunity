const defaultState = {
  isLogged: false,
  isLoggining: false,
  username: "",
  avatar: "",
  email: "",
  uuid: "",
  first_name: "",
  last_name: "",
  middle_name: ""
};

export const state = () => ({ ...defaultState });

export const mutations = {
  setLoginState(state, isLogged) {
    state.isLogged = isLogged;
  }
};

export const actions = {
  logout({ commit }) {
    const isLogged = false;

    commit("setLoginState", isLogged);
  },

  login(
    { commit, state },
    { username, uuid, avatar, first_name, last_name, email }
  ) {
    const updatedState = {
      ...state,
      userId: uuid,
      username,
      avatar,
      first_name,
      last_name,
      email
    };

    state = updatedState;

    commit("setLoginState", true);
  }
};
