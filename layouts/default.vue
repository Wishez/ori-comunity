<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-sm-and-up"
      fixed
      temporary
      right
    >
      <v-layout
        v-if="$store.state.user.isLogged"
        row
        align-center
        justify-space-between
      >
        <v-flex 
          slot="header" 
          xs6
        >
          <v-avatar
            slot="activator"
            size="36px"
          >
            <img
              v-if="user.avatar"
              src="user.avatar"
              alt="Avatar"
            >

            <v-icon v-else>person_outline</v-icon>
          </v-avatar>
        </v-flex>

        <v-flex xs6>
          <v-btn
            flat
            @click="logout"
          >
            <v-icon 
              left 
              v-html="'exit_to_app'"/>

            <v-list-tile-content>
              <v-list-tile-title v-text="'Выйти'"/>
            </v-list-tile-content>
          </v-btn>
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-tile
          v-for="(link, index) in navigation"
          :to="link.to"
          :key="index"
          router
          exact
        >  
          <v-icon 
            left 
            v-html="link.icon"/>
        
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar 
      :clipped-left="clipped" 
      color="primary" 
      fixed 
      app 
      dark>
      <v-toolbar-title>
        <router-link 
          to="/" 
          tag="span" 
          router 
          style="cursor: pointer;">
          {{ title }}
        </router-link>
      </v-toolbar-title>

      <v-spacer/>

      <v-toolbar-items 
        v-if="!user.isLogged" 
        class="hidden-xs-only">
        <v-btn 
          to="/login" 
          flat>
          Войти
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-items 
        v-else 
        class="hidden-xs-only">
        <v-btn 
          v-for="(link, index) in navigation"
          :key="index"
          :to="link.to" 
          flat
        >
          <v-icon 
            left 
            v-html="link.icon"/>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"/>
          </v-list-tile-content>
        </v-btn>

        <v-btn
          flat
          @click="logout"
        >
          <v-icon 
            left 
            v-html="'exit_to_app'"/>

          <v-list-tile-content>
            <v-list-tile-title v-text="'Выйти'"/>
          </v-list-tile-content>
        </v-btn>
      </v-toolbar-items>

      <v-btn 
        v-if="user.isLogged" 
        class="hidden-sm-and-up" 
        flat>
        <v-toolbar-side-icon @click="drawer = !drawer"/> 
      </v-btn>

      <v-btn 
        v-else 
        to="/login" 
        class="hidden-sm-and-up" 
        flat>
        Войти
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container>
        <main>
          <nuxt />
        </main>
        
      </v-container>
    </v-content>

    <v-footer 
      class="footer" 
      fixed 
      app 
      color="secondary" 
      dark>
      <v-spacer/>

      <span class="mr-4">Автор:
        <a 
          class="color_black"
          href="https://shining-present.ru" 
          target="_blank">Filipp Zhuravlev</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      navigation: [
        { icon: "apps", title: "Новости", to: "/" },
        {
          icon: "person_outline",
          title: "Личный кабинет",
          to: "/personal-room"
        }
        // { icon: "chat", title: "Чат", to: "/chat" }
      ],
      miniVariant: false,
      right: true,
      // rightDrawer: false,
      title: "Oriflame Comunity"
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.drawer = false;
      // this.$http.get("user/logout");
      this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style lang="sass" scoped>
.footer
      z-index: 1
</style>
