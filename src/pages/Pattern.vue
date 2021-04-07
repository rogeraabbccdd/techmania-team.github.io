<template lang="pug">
  q-page#pattern
    section.bg(:style="{backgroundImage}")
    section.q-mx-auto.padding
      .container
        .row
          .col-6.q-mx-auto
            h4 {{ pattern.name }}
          .col-6.text-right
            h4
              q-btn.q-mr-xs(flat icon="download" color="tech" @click="openLink(pattern.link)") DOWNLOAD
        q-separator
        .row.q-my-md
          .col-6
            .text-h6.q-mt-md.q-mb-lg Pattern Data
            .q-gutter-sm
              div
                q-icon(name="person")
                | &nbsp;Composed by {{ pattern.composer }}
              div
                q-icon(name="upload")
                | &nbsp;Submitted by {{ pattern.user }}
              div(:class="[{'text-red': pattern.keysounded === '0', 'text-positive': pattern.keysounded === '1'}]")
                q-icon(:name="pattern.keysounded === '0' ? 'close' : 'check'")
                | &nbsp;Keysounded
              div(v-for="(difficulty, index) in pattern.difficulties" :key="'D'+index" :class="getLevelColor(difficulty.level)")
                q-icon(size="sm" :name="getControlIcon(difficulty.control, difficulty.level)" :class="getLevelColor(difficulty.level)")
                | &nbsp;{{ difficulty.name }} Lv.{{ difficulty.level }}
          .col-12.col-md-6.pre-line.q-my-md.q-my-md-none
            .text-h6.q-mt-md.q-mb-lg Description
            p {{ pattern.description }}
        .row.justify-center
          .col-12.text-h6.text-center Previews
          .col-12.col-md-6.col-lg-3.q-pa-md.q-my-xs(v-for="(video, idx) in pattern.previews" :key="idx")
            q-video(:ratio="16/9" :src="'https://www.youtube.com/embed/'+video.link")
</template>

<script>
export default {
  name: 'PagePatterns',
  data () {
    return {
      pattern: {
        id: 0,
        name: '',
        composer: '',
        keysounded: '',
        difficulties: [],
        link: '',
        previews: [],
        description: '',
        user: ''
      }
    }
  },
  computed: {
    backgroundImage () {
      return this.pattern.previews.length > 0 ? `url(https://i.ytimg.com/vi_webp/${this.pattern.previews[0].link}/maxresdefault.webp)` : ''
    }
  },
  methods: {
    async fetchPattern () {
      try {
        const result = await this.$axios.get(process.env.BACK_URL + '?action=pattern&id=' + this.$route.params.id)
        if (result.data.success) {
          if (result.data.results.length > 0) {
            this.pattern = result.data.results[0]
            document.title = 'TECHMANIA | ' + this.pattern.name
          } else {
            this.$router.push('/404')
          }
        } else {
          throw new Error('Error')
        }
      } catch (_) {
        this.error = true
      }
    }
  },
  mounted () {
    this.fetchPattern()
  }
}
</script>