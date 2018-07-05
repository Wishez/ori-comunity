export const state = () => ({
  isLogged: false,
  username: "",
  avatar: "",
  email: "",
  userId: "",
  first_name: "",
  last_name: ""
})

export const mutations = {
  setLoginState(state, isLogged) {
    state.isLogged = isLogged
  }
}
