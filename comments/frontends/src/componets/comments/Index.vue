<template>
	<div class="row-fluid">
		<comments-list></comments-list>
		<comments-form></comments-form>
	</div>
</template>

<script>
	import list from './lists'
	import form from './forms'
	export default {
		components: {
		    commentsLists : list ,
		    commentsForm : form
		},
		data() {
			return {

			}
		}
	}

</script>