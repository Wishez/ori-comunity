<template>
  <v-layout 
    column 
    justify-center 
    align-center>
    <v-flex 
      class="width_fill" 
      xs12>
      <v-card class="singleNews margin_centered">
        <v-card-title class="headline">
          <h1 
            class="headline" 
            v-html="title"/>
          <div class="metadata width_fill">
            <time :datetime="publishedDate | formateDate('m:dd:Y mm:hh')">{{ publishedDate | formateDate }}</time>
          </div>
        </v-card-title>

        <v-card-media
          v-if="image"
          :src="image"
        />

        <v-card-text v-html="content"/>

        <v-card-actions>
          <v-btn 
            flat 
            nuxt 
            to="/">Ко всем новостям</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "News",
  delimiters: [],
  components: {},
  filters: {},
  props: {
    title: {
      type: String,
      required: true
    },
    publishedDate: {
      type: [Number, Date, String],
      required: true
    },
    content: {
      type: String,
      required: true,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: () => ({}),
  computed: {},
  beforeMount() {},
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

.singleNews
  max-width: 90ch

</style>
