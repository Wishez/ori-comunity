<template>
  <v-flex 
    xs12 
    sm6 
    lg4
  >  
    <v-card class="preview parent column">
      <v-card-media 
        v-if="image"
        :src="image"
        height="200px"
      />

      <v-card-title primary-title>
        <h1 
          class="headline" 
          v-html="title"/>
        <div class="metadata width_fill">
          <time :datetime="publishedDate | formateDate('m:dd:Y mm:hh')">{{ publishedDate | formateDate }}</time>
        </div>
      </v-card-title>

      <v-card-text 
        v-if="announce" 
        class="announce text-cropped_lines text-cropped_lines-3 font-size_16" 
        v-html="announce"/>

      <v-card-actions class="margin-top_auto">
        <v-spacer/>
        <v-btn 
          :to="`/news/${slug}/`" 
          flat>Читать</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "NewsPreview",
  props: {
    title: {
      type: String,
      required: true
    },
    publishedDate: {
      type: [Number, Date, String],
      required: true
    },
    announce: {
      type: String,
      required: false,
      default: ""
    },
    image: {
      type: String,
      required: false,
      default: ""
    },
    slug: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
@import '~/assets/sass/conf/_breakpoints.sass'

.preview
  // height: 465px
  margin: 0 1rem 2.618rem

  @include breakpoint($phone)
    margin-left: 1.5rem
    margin-right: 1.5rem

</style>
