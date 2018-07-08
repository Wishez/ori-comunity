<template>
  <v-layout 
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
      :image="news.image"
      :published-date="news.published_date"
    />
  </v-layout>
</template>

<script>
import NewsPreview from "@/components/News/NewsPreview";
import cat from "~/assets/images/cat.jpg";

export default {
  name: "Index",
  components: {
    NewsPreview
  },
  data() {
    return {
      newsList: [
        {
          title: "Hello World!",
          slug: "hello",
          published_date: Date.now(),
          announce: "Hello World! It's announce text.",
          image: cat
        }
      ]
    };
  },
  beforeMount() {
    console.log(this.$store.state.user.isLogged);
  }
};
</script>
