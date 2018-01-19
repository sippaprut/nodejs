<template>
	<div class="container">
		<b-form  >
			<b-form-group label="Message:" label-for="message_comment">
				<b-form-textarea 
					v-model="forms.message"
					id="message-comment"
					placeholder="Enter something"
                    :rows="3"
                    :max-rows="6"
				>
					
				</b-form-textarea>
        	</b-form-group>

        	<b-form-group label="Name:" label-for="name_comment">
        		<b-form-input v-model="forms.name" id="name_comment" placeholder="Enter your name">
        		</b-form-input>
        	</b-form-group>

        	<b-form-group label="Email:" label-for="email_comment">
        		<b-form-input type="email" v-model="forms.email" id="email_comment" placeholder="Enter your email">
        		</b-form-input>
        	</b-form-group>

			<b-button type="button" @click.prevent="submitComments" size="sm" variant="primary">Submit</b-button>

		</b-form>



	</div>
</template>

<script>
	export default {
		data() {
			return {
				forms: {
					message : '' ,
					name : '' ,
					email : ''
				}
			}
		},
		methods: {
			submitComments() {
				
			}
		}
	}
</script>