<template>
  <news 
    v-if="isLoaded"
    :title="article.title"
    :content="article.content"
    :image="article.preview.image"
    :published-date="new Date(article.created_at)"/>
  <v-layout 
    v-else
    row 
    wrap
    justify-center 
    align-center>
    <app-preloader/>
  </v-layout>
</template>

<script>
import News from "@/components/News/News";
import { setPageTitle } from "@/constants/helpers";

export default {
  name: "NewsPage",
  components: { News },
  data: () => ({
    article: false,
    isLoaded: false
  }),
  computed: {
    slug() {
      return this.$route.params.slug;
    }
  },
  beforeMount() {},
  created() {
    this.$http.get(`news/${this.slug}`).then(data => {
      this.article = data.body;
      this.isLoaded = true;
      setPageTitle(this.article.page_title);
    });
  }
};
</script>

<style lang="sass" scoped>
</style>
