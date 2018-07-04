<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      v-model="drawer"
      fixed
      app
      right
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="clipped" fixed app color="accent" dark>
      <v-toolbar-title v-text="title"/>

      <v-spacer/>

      <v-toolbar-items>
        <v-btn to="/login" flat>
          Войти
        </v-btn>
      </v-toolbar-items>

      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_left' : 'chevron_right'"/>
      </v-btn>

      <v-toolbar-side-icon @click="drawer = !drawer"/>
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
      drawer: true,
      fixed: false,
      items: [
        { icon: "apps", title: "Welcome", to: "/" },
        { icon: "bubble_chart", title: "Inspire", to: "/inspire" }
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
