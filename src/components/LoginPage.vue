<template>
    <div>
      
      <h1 class="main-title">Welcome to LoginPage</h1>
      <div class="login-form">
        <div class="form-group">
          <label for="uname">Email</label>
          <input type="text" v-model="postData.USERMail" placeholder="Enter Username" name="uname" required>
        </div>
        <div class="form-group">
          <label for="psw">Password</label>
          <input type="password" v-model="postData.Password" placeholder="Enter Password" name="psw" required>
        </div>
        <div class="form-actions-container">
        <div class="form-actions">
          <button @click="backend" type="button">Login</button>
        </div>
        <div class="form-actions1">
          <button @click="goSignup">Go to Signup</button>
        </div>

        </div>
       
      </div>
    </div>
  </template>
  <script setup>
  import { ref , onMounted } from 'vue';
  import { useRouter } from "vue-router";
  const router = useRouter()
 
  
  const postData = ref({
    USERMail: '',
    Password: ''
  });
  
 

  onMounted(async () => {



  try {
        const response2 = await fetch('http://localhost:8087/account/api', {
			method: 'GET',
			credentials: 'include', // Include cookies in the request

		});

		if (!response2.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response2.text();
		console.log('Response2 from server:', data);
		
		if (data === 'Cookies are equal.') {

			router.push({ name: 'Welcome' });
		
		} else {
			
			console.log('Cookies are not equal: Value mismatch.');

		}
	} catch (error) {
		console.error('Error posting data:', error);
	}



})
  
  
function goSignup(){
  
  router.push({ name: 'SignUp' })
  
  }
  


  
  const backend=(async () => {
     
    
  const date1=postData.value.USERMail
         const date2=postData.value.Password

  try {
        const response1 = await fetch('http://localhost:8087/account/login?USERMail='+date1+"&Password="+date2, {
			method: 'GET',
			credentials: 'include', // Include cookies in the request

		});

		if (!response1.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response1.text();
		console.log('Response1 from server:', data);
		
		if (data === 'valid user.') {
			
			router.push({ name: 'Welcome' });
		
		} else {
			
			console.log('invalid user ');

		}
	} catch (error) {
		console.error('Error posting data:', error);
	}



  });

  
  </script>

  <style scoped>
  .main-title {
    text-align: center;
    color: #333;
  }

  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  .form-actions {
    margin-top: 15px;
  }
  .form-actions1 {
    margin-top: 15px;
    position: relative;
    left:250px;
  }
  .form-actions-container {
    display: flex;
    gap: 10px;
  }


  

  button {
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button.sun {
    background-color: #008CBA;
  }
 
 
</style>
  
 
  