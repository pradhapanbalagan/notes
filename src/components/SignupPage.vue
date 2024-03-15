<template>
	<div class="signup-container">
		
		<div class="signup-form">
			<h1 class="signup-title">Welcome to Signup Page</h1>
			<div class="form-group">
				<label for="fname">First name</label>
				<input type="text" v-model="post_data.firstname" placeholder="Enter First name" name="fname" required>
				<span class="error-message" v-if="first_name_error">First name is empty</span>
			</div>
			<div class="form-group">
				<label for="lname">Last name</label>
				<input type="text" v-model="post_data.lastname" placeholder="Enter Last name" name="lname" required>
				<span class="error-message" v-if="last_name_error">Last name is empty</span>
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" v-model="post_data.email" placeholder="Enter email" name="email" required>
				<span class="error-message" v-if="email_error">Email is not valid</span>
				<span class="error-message" v-if="email_valueid_error">User already exists</span>
			</div>
			<div class="form-group">
				<label for="number">Mobile</label>
				<input type="tel" v-model="post_data.mobile" placeholder="Enter Mobile" name="number" required>
				<span class="error-message" v-if="mob_error">Mobile is not valid</span>
			</div>
			<div class="form-group">
				<label for="psw">Password</label>
				<input v-model="post_data.password" type="password" placeholder="Enter Password" name="psw" required>
				<span class="error-message" v-if="password_error">Please enter a strong password</span>
			</div>
			<div class="form-actions">
				<div class="form-actions1">
					<button @click="Submit_value_function" type="button">Submit</button>
				</div>
				<div class="form-actions2">
					<button @click="go_login">Go to Login</button>
				</div>
			</div>
		</div>
		
	</div>
</template>


<script setup>

import { useRouter } from "vue-router";
import validation from "../utils/validation"
import { useStore } from "vuex";


const store = useStore()
const router = useRouter()

import { ref,computed } from 'vue';

const email_error = ref(false);

const mob_error = ref(false);

const first_name_error = ref(false);

const last_name_error = ref(false);

const password_error = ref(false);

const email_valueid_error = ref(false);
const post_data = ref({
	firstname: '',
	lastname: '',
	email: '',
	mobile: '',
	password: ''
});
const name_value = computed(() => {
	console.log("the value of name value is"+name_value);
 
  return store.getters.getName
})


function go_login() {

	router.push({ name: 'Login' })

}


function isValidObj(bool_val) {

	if (bool_val == "") {
		return false
	}

	if (bool_val == null) {
		return false
	}



	return bool_val;

}

function checking() {
	if (isValidObj(first_name_error.value) === false && isValidObj(last_name_error.value) === false && isValidObj(email_error.value) === false && isValidObj(mob_error.value) === false && isValidObj(password_error.value) === false) {

		return true;
	}
	return false;

}

function rejax_checking() {

	const first_value = post_data.value.firstname
	
	if (first_value == null || first_value == "") {
		first_name_error.value = true;

	} else {
		
		first_name_error.value = false;
	}

	const last_value = post_data.value.lastname


	if (last_value == null || last_value == "") {
		last_name_error.value = true;

	} else {

		last_name_error.value = false;
	}


	const email_value = post_data.value.email



	let is_valid_email = !validation.validate(email_value, validation.emailRegex)

	email_error.value = is_valid_email



	const mobile_value = post_data.value.mobile

	const is_valid_mobile = !validation.validate(mobile_value, validation.numRegex)

	mob_error.value = is_valid_mobile

	const password_value = post_data.value.password
	const is_valid_password = !validation.validate(password_value, validation.passwordRegex)

	password_error.value = is_valid_password

}

function Submit_value_function() {

	rejax_checking();
	let s = checking();
	if (s === true) {
		post_data_function();

	}

}

const post_data_function = async () => {
	let response;
	try {

		response = await fetch('http://localhost:8087/account/signup', {
			method: 'POST',
			credentials: 'include', // Include cookies in the request

			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(post_data.value),
		});


		let signup_info = {
      "postdata_data" :  post_data.value,
     
    }


		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		store.dispatch("set_name", signup_info)
		const data = await response.text();
		console.log('Response from server:', data);

		if (data === 'true') {
			router.push({ name: 'Welcome' });
			email_valueid_error.value = false;

		} else {
			console.log('Signup failed');
			email_valueid_error.value = true;
		}

	} catch (error) {
		console.error('Error posting data:', error);
	}

};

</script>

<style scoped>
body {
	margin: 0;
	font-family: 'Arial', sans-serif;
	background-color: #f5f5f5;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
}



.signup-form {
	background-color: lightcoral;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	max-width: 400px;
	margin: 0 auto;
}

.signup-title {
	color: #333;
	margin-bottom: 20px;
}

.form-group {
	margin-bottom: 20px;
}

label {
	display: block;
	margin-bottom: 5px;
	color: #555;
}

input {
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 5px;
}

.error-message {
	color: blue;
	font-size: 14px;
	margin-top: 5px;
	display: block;
}

.form-actions1 {
	display: flex;
	justify-content: space-between;
	flex: 1;
	margin-right: 10px;
}

.form-actions2 {
	display: flex;
	justify-content: space-between;
	position: relative;
	left: 10px
}

.form-actions {
	display: flex;
	justify-content: space-between;
}


button {
	background-color: #5bc0de;
	color: #fff;
	padding: 10px 15px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

button:hover {
	background-color: #46b8da;
}

.signup-container {
	display: flex;
	align-items: center;
	/* justify-content: center; */
	height: 100vh;
}
</style>
