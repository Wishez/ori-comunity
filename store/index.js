export const state = () => ({
  sidebar: false
  // csrftoken: Cookies.get("csrftoken")
});

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar;
  }
};
