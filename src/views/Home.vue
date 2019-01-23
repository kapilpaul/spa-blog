<template>
    <div>
        <!--<loader></loader>-->
        <!--<full-screen-menu ></full-screen-menu>-->
        <div class="l-theme animated-css">
            <page-title title="latest from won" pageInfo="read the blog"></page-title>
            <!-- end .b-title-page-->
            <div class="container">
                <div class="row">
                    <div class="col-md-9">
                        <main class="l-main-content">
                            <div class="posts-group wrap-inl-bl">
                                <post></post>
                                <!--<ul class="pagination pagination_post text-center">-->
                                    <!--<li><a href="#"></a></li>-->
                                    <!--<li><a href="#">1</a></li>-->
                                    <!--<li class="active"><a href="#">2</a></li>-->
                                    <!--<li><a href="#">3</a></li>-->
                                    <!--<li><a href="#"></a></li>-->
                                <!--</ul>-->
                            </div>
                        </main>
                    </div>
                    <div class="col-md-3">
                        <blog-sidebar></blog-sidebar>
                    </div>
                </div>
            </div>
            <footer-area></footer-area>
        </div>
        <!-- end layout-theme-->
    </div>
</template>

<script>
// @ is an alias to /src
import '@/assets/css/master.css'

// import loader from "@/components/Loader.vue"
import pageTitle from '@/components/blog/page-title.vue'
import post from '@/components/blog/post.vue'
import blogSidebar from '@/components/blog/sidebar.vue'
import footerArea from '@/components/footer.vue'

export default {
  name: 'home',
  components: {
    // loader,
    // fullScreenMenu,
    pageTitle,
    post,
    blogSidebar,
    footerArea
  }
}
</script>
