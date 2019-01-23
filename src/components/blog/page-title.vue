<template>
    <div class="section-title-page area-bg">
        <div class="area-bg__inner">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <h1 class="b-title-page">{{ title }}</h1>
                        <div class="b-title-page__info">{{ pageInfo }}</div>
                        <ol class="breadcrumb">
                            <li><a href="home.html">home</a></li>
                            <li class="active">blog</li>
                        </ol>
                        <!-- end breadcrumb-->
                        <div class="ui-decor-1"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    pageInfo: {
      type: String,
      default: ''
    }
  },
  name: 'pageTitle'
}
</script>

<style scoped>

</style>
