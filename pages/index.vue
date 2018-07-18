<template>
  <v-layout 
    v-if="isLoaded"
    row 
    wrap
    justify-center 
    align-center>
    <news-preview 
      v-for="(news, index) in newsList"
      :key="index" 
      :title="news.title"
      :announce="news.announce"
      :slug="news.slug"
      :image="news.preview"
      :published-date="new Date(news.created_at)"
    />
  </v-layout>
  <v-layout 
    v-else
    row 
    wrap
    justify-center 
    align-center>
    Loading...
  </v-layout>
  
</template>

<script>
import NewsPreview from "@/components/News/NewsPreview";
import cat from "~/assets/images/cat.jpg";
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
