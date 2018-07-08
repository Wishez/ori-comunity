<template>
  <news
    :title="article.title"
    :content="article.content"
    :image="article.image"
    :published-date="article.published_date"/>
</template>

<script>
import News from "@/components/News/News";
import cat from "~/assets/images/cat.jpg";

export default {
  name: "NewsPage",
  delimiters: [],
  components: { News },
  filters: {},
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data: () => ({
    article: {
      title: "Hello World!",
      published_date: Date.now(),
      content: "<p>Hello World! It's not announce text.</p>",
      image: cat
    }
  }),
  computed: {},
  beforeMount() {
    console.log(this.slug);
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
  fetch() {},
  beforeUpdated() {}
};
</script>

<style lang="sass" scoped>
</style>
