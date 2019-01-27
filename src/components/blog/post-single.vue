<template>
    <div>
        <page-title title="latest from won" pageInfo="read the blog"></page-title>
        <div class="container">
            <div class="row">
                <div class="col-md-9">
                    <main class="l-main-content" v-if="typeof post.title !== 'undefined'">
                        <div class="posts-group posts-group_pdg-right_lg" data-aos="fade">
                            <article class="b-post b-post-full clearfix">
                                <div class="entry-date"><span class="entry-date__number">29</span><span
                                        class="entry-date__month">Apr</span></div>
                                <div class="entry-main">
                                    <div class="entry-header">
                                        <div class="entry-meta"><span class="entry-meta__item"><a
                                                class="entry-meta__link" href="blog-main.html">{{ post._embedded.author[0].name }}</a></span><span
                                                class="entry-meta__item"><a class="entry-meta__link"
                                                                            href="blog-main.html">web design</a></span>
                                        </div>
                                        <h2 class="entry-title" v-html="post.title.rendered"></h2>
                                    </div>
                                    <div class="entry-content" v-html="post.content.rendered"></div>
                                    <div class="entry-footer">
                                        <div class="entry-footer__group">
                                            <div class="entry-footer__title">tags:</div>
                                            <a class="entry-footer__link" href="blog-post.html">Design,</a><a
                                                class="entry-footer__link" href="blog-post.html"> Photoshop,</a><a
                                                class="entry-footer__link" href="blog-post.html"> Mockups</a>
                                        </div>
                                        <div class="entry-footer__group">
                                            <div class="entry-footer__title">Share</div>
                                            <ul class="social-net list-inline">
                                                <li class="social-net__item"><a class="social-net__link text-primary_h"
                                                                                href="twitter.com"><i
                                                        class="icon fa fa-twitter"></i></a></li>
                                                <li class="social-net__item"><a class="social-net__link text-primary_h"
                                                                                href="facebook.com"><i
                                                        class="icon fa fa-facebook"></i></a></li>
                                                <li class="social-net__item"><a class="social-net__link text-primary_h"
                                                                                href="behance.com"><i
                                                        class="icon fa fa-behance"></i></a></li>
                                                <li class="social-net__item"><a class="social-net__link text-primary_h"
                                                                                href="pinterest-p.com"><i
                                                        class="icon fa fa-pinterest-p"></i></a></li>
                                            </ul>
                                            <!-- end .social-list-->
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <!-- end .post-->
                        </div>
                    </main>
                    <transition name="fade">
                        <div class="loader text-center" v-if="loader">
                            <i class="fa fa-spinner fa-spin"></i>
                        </div>
                    </transition>
                </div>
                <!-- end .post-->
                <div class="col-md-3">
                    <blog-sidebar></blog-sidebar>
                </div>
            </div>
        </div>

        <footer-area></footer-area>
    </div>
</template>

<script>
import axios from 'axios'
import pageTitle from '@/components/blog/page-title.vue'
import blogSidebar from '@/components/blog/sidebar.vue'
import footerArea from '@/components/footer.vue'
import JQuery from 'jquery'
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  name: 'postSingle',
  data () {
    return {
      post: [],
      loader: false
    }
  },
  created () {
    AOS.init()
  },
  mounted () {
    this.getPosts()
  },
  components: {
    pageTitle,
    blogSidebar,
    footerArea
  },
  methods: {
    getPosts () {
      this.loader = true
      axios.get('posts?_embed&slug=' + this.$route.params.slug).then(response => {
        this.post = response.data[0]
        this.loader = false
      }).then(() => {
        JQuery('img').addClass('img-responsive')
        JQuery('iframe').addClass('embed-responsive-item')
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

<style>
    iframe {
        width: 100%;
        height: 300px;
    }
</style>
