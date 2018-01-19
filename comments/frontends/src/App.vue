<template>
  <div id="app" class="container">
      <comments-page></comments-page>
  </div>
</template>

<script>

import Comments from './componets/comments/Index'
export default {
  name: 'app',
  components: {
    commentsPage : Comments
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

