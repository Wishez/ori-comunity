<template>
  <transition name="fading">
    <v-layout 
      v-if="!$store.state.user.isLogged"
      justify-center
      class="baseVerticalOffsets"
    >
      <v-flex 
        xs12 
        md4>
        <p>Пожалуйста, авторизуйтесь, чтобы увидеть свежие новости.
          <v-btn 
            to="/login" 
            flat
          >
            Войти
          </v-btn>
        </p>
      </v-flex>
    </v-layout>

    <v-layout 
      v-else-if="isLoaded"
      class="newsLayout"
      row 
      wrap>
      <news-preview 
        v-for="(news, index) in newsList"
        :key="index" 
        :title="news.title"
        :announce="news.announce"
        :slug="news.slug"
        :image="news.preview.image"
        :published-date="new Date(news.created_at)"
      />
    </v-layout>
    <v-layout 
      v-else
      row 
      wrap
      justify-center 
      align-center>
      <app-preloader/>
    </v-layout>
  </transition>
</template>

<script>
import NewsPreview from "@/components/News/NewsPreview";
import { setPageTitle } from "@/constants/helpers";

export default {
  name: "Index",
  components: {
    NewsPreview
  },
  data() {
    return {
      newsList: [],
      isLoaded: false
    };
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.setTitle();
      this.showLoading(false);
      this.$http.get("news/").then(data => {
        this.setToList(data.body);
        this.showLoading(true);
      });
    },

    showLoading(state) {
      this.isLoaded = state;
    },

    setToList(news) {
      this.newsList = news;
    },

    setTitle() {
      setPageTitle("Новости Oriflame");
    }
  }
};
</script>

<style lang="sass">
.newsLayout
  
</style>
