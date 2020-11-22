<template>
  <div class="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookMenu from '../../components/ebook/ebookMenu.vue'
import ebookReader from '../../components/ebook/ebookReader.vue'
import EbookTitle from '../../components/ebook/ebookTitle.vue'
export default {
  components: { ebookReader, EbookTitle, EbookMenu },

}
</script>

<style lang="scss">
    @import "@/assets/global.scss"
</style>