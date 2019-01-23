<template>
    <div id="infinite-list">
        <section class="b-post b-post-3 clearfix scrollreveal" v-for="(post, index) in posts" :key="index">
            <div class="entry-media">
                <a class="js-zoom-images" :href="post._embedded['wp:featuredmedia']['0'].source_url">
                    <img class="img-responsive read more" :src="post._embedded['wp:featuredmedia']['0'].source_url"
                         alt="Foto"/>
                </a>
            </div>
            <div class="entry-inner">
                <div class="entry-date"><span class="entry-date__number">25</span><span
                        class="entry-date__month">Apr</span></div>
                <div class="entry-main">
                    <div class="entry-header">
                        <div class="entry-meta">
                          <span class="entry-meta__item">
                               <a class="entry-meta__link text-primary" href="blog-main.html">
                                   <strong>{{ post._embedded.author[0].name }}</strong>
                               </a>
                           </span>
                           <span class="entry-meta__item">
                               <a class="entry-meta__link text-primary" href="blog-main.html"><strong>web design</strong></a></span>
                        </div>
                        <h2 class="entry-title">
                           <router-link :to="'/posts/' + post.slug" v-html="post.title.rendered">
                            </router-link>
                        </h2>
                    </div>
                    <div class="entry-content" v-html="post.excerpt.rendered">
                    </div>
                    <!--<div class="entry-footer"><a class="btn btn-theme" href="blog-post.html">read-->
                        <!--more</a></div>-->
                </div>
            </div>
        </section>
        <transition name="fade">
            <div class="loader text-center" v-if="loader">
                <i class="fa fa-spinner fa-spin"></i>
            </div>
        </transition>

        <!-- end .post-->
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'post',
  data () {
    return {
      posts: [],
      loader: false,
      bottom: false,
      nextpage: 1
    }
  },
  mounted () {
    // Detect when scrolled to bottom.
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    this.getPosts()
  },
  watch: {
    bottom (bottom) {
      if (bottom) {
        this.getPosts()
      }
    }
  },
  methods: {
    bottomVisible () {
      const scrollY = window.scrollY
      const visible = document.documentElement.clientHeight
      const pageHeight = document.documentElement.scrollHeight
      const bottomOfPage = visible + scrollY >= pageHeight
      return bottomOfPage || pageHeight < visible
    },
    getPosts () {
      this.loader = true
      axios.get('posts?_embed&page=' + this.nextpage).then(response => {
        response.data.map(item => {
          this.posts.push(item)
        })
        this.nextpage++
        this.loader = false
      }).catch(() => {
        this.loader = false
      })
    }
  }
}
</script>

<style scoped>
.loader i.fa{
    font-size: 50px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
