<template>
  <div v-if="project">
    <v-card>
      <v-card-row>
        <v-card-title>
          <span>{{project.title}}</span>
        </v-card-title>
      </v-card-row>
      <v-card-text>
        <v-card-row>
            <div v-html="compiledMarkdown"></div>
        </v-card-row>
      </v-card-text>
      <v-card-row actions>
        <a v-bind:href="project.website" v-if="project.website" target="_blank"> <i class="icon-link contact-link"> </i></a>
        <a v-bind:href="project.github" v-if="project.github" target="_blank"> <i class="icon-github-squared contact-link"> </i></a>
        <a v-bind:href="project.linkedin" v-if="project.linkedin" target="_blank"> <i class="icon-linkedin-squared contact-link"> </i></a>
        <a v-bind:href="project.twitter" v-if="project.twitter" target="_blank"> <i class="icon-twitter-squared contact-link"> </i></a>
        <a v-bind:href="project.facebook" v-if="project.facebook" target="_blank"> <i class="icon-facebook-official contact-link"> </i></a>
        <a v-bind:href="project.wechat" v-if="project.wechat" target="_blank"> <i class="icon-wechat contact-link"> </i></a>
        <a v-bind:href="project.slack" v-if="project.slack" target="_blank"> <i class="icon-slack contact-link"></i> </a>
        <a v-bind:href="project.reddit" v-if="project.reddit" target="_blank"> <i class="icon-reddit contact-link"></i></a>
        <a v-bind:href="'mailto:' + project.email" v-if="project.email"> <i class="icon-mail contact-link"></i></a>
        <a v-bind:href="project.blog" v-if="project.blog" target="_blank"> <i class="icon-newspaper contact-link"></i></a>
        <v-spacer></v-spacer>
        <div @click="editProject" data-wenk="Suggest edits" data-wenk-pos="left"><i class="icon-pencil contact-link"></i></div>
      </v-card-row>
    </v-card>
    <div class="comments">
      <VueDisqus shortname="ethereumnetwork" :identifier="$route.path" :url="'https://ethereum.network' + $route.path"></VueDisqus>
    </div>
  </div>
  <div v-else>
    Unfortunately we couldn't find any information about {{$route.params.id}}
  </div>
</template>

<script>
var marked = require('marked')
import VueDisqus from '~components/VueDisqus.vue'

export default {
  name: 'project',
  data () {
    return {
      msg: 'the network explorer is in the works...',
      project: {}
    }
  },
  computed: {
    // project: function () {
    //   let title = this.$route.params.title.replace(/\s+/g, '').toLowerCase()
    //   return this.$store.state.projectList.find((project) => project.title.replace(/\s+/g, '').toLowerCase() === title)
    // },
    compiledMarkdown: function () {
      return marked(this.project.longDescription || '', { sanitize: true })
    }
  },
  methods: {
    editProject: function () {
      this.$store.commit('setProjectToEdit', { projectToEdit: this.project })
      this.$router.push('/form')
    }
  },
  beforeMount () {
    let path = process.env.HOST_URL + '/api/project/' + this.$route.params.id
    fetch(path)
    .then((response) => { return response.json() })
    .then((data) => {
      this.project = data
    })
  },
  components: {
    VueDisqus
  }
}
</script>

<style >
.edit-link {
  cursor: pointer;
  cursor: hand;
}
.contact-link {
    color: black;
    text-shadow: 1px 1px 1px #ccc;
    font-size: 1.4em;
    margin-left: 0.1em;
}
img {
  max-width: 100%;
  max-height: 250px;
}
</style>
