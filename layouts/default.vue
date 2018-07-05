<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-sm-and-up"
      fixed
      temporary
      right
    >
      <v-list>
        <v-list-tile
          v-for="(link, index) in navigation"
          :to="link.to"
          :key="index"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="link.icon"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="clipped" fixed app color="accent" dark>
      <v-toolbar-title>
        <router-link to="/" tag="span" router style="cursor: pointer;">
          {{ title }}
        </router-link>
      </v-toolbar-title>

      <v-spacer/>

      <v-toolbar-items v-if="!$store.state.user.isLogged" class="hidden-xs-only">
        <v-btn to="/login" flat>
          Войти
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else class="hidden-xs-only">
        <v-btn v-for="(link, index) in navigation"
               :key="index"
               :to="link.to" 
               flat
        >
          <v-list-tile-action>
            <v-icon v-html="link.icon"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"/>
          </v-list-tile-content>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-side-icon class="hidden-sm-and-up" @click="drawer = !drawer"/>
    </v-toolbar>

    <v-content>
      <v-container>
        <main>
          <nuxt />
        </main>
        
      </v-container>
    </v-content>

    <v-footer class="footer" fixed app color="accent" dark>
      <v-spacer/>
      <span class="mr-4">Автор:
        <a href="https://shining-present.ru" target="_blank">Filipp Zhuravlev</a>
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
          title: "Личная кабинет",
          to: "/personal-room"
        },
        { icon: "chat", title: "Чат", to: "/chat" }
      ],
      miniVariant: false,
      right: true,
      // rightDrawer: false,
      title: "Oriflame Comunity"
    }
  }
}
</script>

<style lang="sass" scoped>
.footer
      z-index: 1
</style>
