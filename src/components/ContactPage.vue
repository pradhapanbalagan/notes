<template>
  <div>
    <header class="page-header">
    <i class="fas fa-address-book fa-3x" @click="showPopup"></i>

    <i class="fa-solid fa-message" @click="Welcome">Message</i>
    
    <div v-if="isPopupVisible" class="popup-overlay">
      <div class="popup-container">
        <h1>NEW CONTACT</h1>
        <div>
          <label class="label1" for="fname">First Name:</label>
          <input class="input1" v-model="inputs.firstname" placeholder="FIRST NAME" />
          <span class="error-message1" v-if="firstn_error">Please enter a valid name</span>
        </div>
        <div>
          <label class="label2" for="lname">Last Name:</label>
          <input class="input2" v-model="inputs.lastname" placeholder="LAST NAME" />
          <span class="error-message2" v-if="lastn_error">Please enter a valid last name</span>
        </div>
        <div>
          <label class="label3" for="mail">Email:</label>
          <input class="input3" v-model="inputs.email" placeholder="EMAIL" />
          <span class="error-message3" v-if="email_error">Please enter a valid email</span>
        </div>
        <button class="button_submit" @click="main_function">Submit</button>
        <button class="button_close" @click="closePopup">Close</button>
      </div>
    </div>
  </header>
  </div>


  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in contact_data_from_store" :key="index">
          <td>{{ item.firstname }}</td>
          <td>{{ item.lastname }}</td>
          <td>{{ item.email }}</td>
          <td>
            <button @click="deleteRow(item)">Delete</button>
            <div>
              <button @click="openForm(item)">EDIT</button>

             
            </div>
          </td>
        </tr>
        <div v-if="formVisible" class="custom-popup">
      <div class="custom-popup-content">
        <label class="label4" for="firstName">First Name:</label>
        <input class="input4" v-model="firstName" type="text" id="firstName" />

        <label class="label5" for="lastName">Last Name:</label>
        <input class="input5" v-model="lastName" type="text" id="lastName" />

        <label class="label6" for="email">Email:</label>
        <input class="input6" v-model="email" type="email" id="email" />

        <button  class="save_edit" @click="Submit(item)">Save</button>
        <button class="close_edit" @click="closeForm">Close</button>
      </div>
    </div>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { computed, onMounted } from 'vue';
import { useStore } from "vuex";
import contactvalid from '../utils/contactvalid';
import { useRouter } from 'vue-router';
const router = useRouter();

const store = useStore();
const session = ref([]);
const inputs = ref({
  firstname: '',
  lastname: '',
  email: '',
});

const resetInputs = () => {
  inputs.value.firstname = '';
  inputs.value.lastname = '';
  inputs.value.email = '';
};


const email_error = ref(false);
const firstn_error = ref(false);
const lastn_error = ref(false);

let isPopupVisible = ref(false);

const closePopup = () => {
  isPopupVisible.value = false;
  resetInputs();
};

const showPopup = () => {
  isPopupVisible.value = true;
};

const contact_data_from_store = computed(() => {
  return store.getters.getContact;
});


const formVisible = ref(false);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const id = ref('');

const openForm = (item) => {
  id.value=item.id
  firstName.value = item.firstname;
  lastName.value = item.lastname;
  email.value = item.email;
  formVisible.value = true;
};

const closeForm = () => {
  formVisible.value = false;
};

const Submit = async (item) => {
  try {
    const response = await fetch('http://localhost:8087/account/editcontact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:id.value,
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
      }),
    });

    let update_contacts = {
      "id" :  id.value,
      "firstname" : firstName.value,
      "lastname":lastName.value,
      "email":email.value
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    store.dispatch('update_contact',update_contacts );
    const data = await response.json(); // Assuming the server returns JSON
    console.log('Response from server:', data);
  } catch (error) {
    console.error('Error during PUT request:', error.message);
  }

  closeForm();
};
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8087/account/contactget', {
      method: 'GET',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const dataText = await response.text();
    const jsonData = JSON.parse(dataText);
    session.value = jsonData.data;
    store.dispatch('setContact', jsonData.data);
  } catch (error) {
    console.error('Error getting data:', error);
  }
});

const post_data_server = async () => {
  try {
    const response = await fetch('http://localhost:8087/account/contact', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs.value),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    session.value = data;
    store.dispatch('update_contact_info', data);
    closePopup();
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

function is_valid_bol(bool_val) {
  if (bool_val == "") {
    return false;
  }

  if (bool_val == null) {
    return false;
  }

  return bool_val;
}

function checking_both_correct() {
  if (is_valid_bol(firstn_error.value) === false && is_valid_bol(lastn_error.value) === false && is_valid_bol(email_error.value) === false) {
    return true;
  }
  return false;
}

function rejax_checking_both_correct_contact() {
  const first_val = inputs.value.firstname;
  let is_valid_first_name = !contactvalid.contact(first_val, contactvalid.firstnameregex);
  firstn_error.value = is_valid_first_name;

  const last_val = inputs.value.lastname;
  let is_valid_last_name = !contactvalid.contact(last_val, contactvalid.lastnameregex);
  lastn_error.value = is_valid_last_name;

  const email_val = inputs.value.email
  console.log("the value of email_val"+ email_val)
  let is_valid_email = !contactvalid.contact(email_val, contactvalid.emailRegex)
  email_error.value = is_valid_email

}
function main_function() {

  rejax_checking_both_correct_contact();Contact
let s=checking_both_correct();
if(s===true){
post_data_server();

}

}


const deleteRow = async (item) => {
  try {
    const response = await fetch('http://localhost:8087/account/deletecontact', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"id" : item.id }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    store.dispatch('delete_contact_info', item.id);
    const data = await response.json(); // Assuming the server returns JSON
    console.log('Response from server:', data);

    // Update your UI or perform any necessary actions after successful deletion
   
  } catch (error) {
    console.error('Error during DELETE request:', error.message);
  }
};

function Welcome() {
  router.push({ name: 'Welcome' });
}



  </script>
  <style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.popup-container {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  width: 400px;
  height: 400px;
}
table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
    border: 2px solid #ce292900;
    text-align: left;
    padding: 8px;
    }
 label{
      font-size: 20px;
      position: relative;
      right:10px
    }
    input{
      width:200px;
      height:30px
    }.label1{
      position: relative;
      top:10px

    }
    .label2{
      position: relative;
      top:50px
    }
    .label3{
      position: relative;
      top:100px;
      right:30px;
    }
    .input1{
      position: relative;
      right:100px;
      top:50px;
    }
    .input2{
      position: relative;
      right:100px;
      top:90px;

    }
    .input3{
      position: relative;
      right:79px;
      top:140px;

    }
    :placeholder-shown{
      text-align: center;
    }
    
  .button_submit {
  position: relative;
  top:170px;
  bottom: 100px; 
  right:66px;/* Add a semicolon here */
  background-color: #3498db; /* Blue color */
  color: #ffffff; /* White text color */
  padding: 10px 20px; /* Adjust padding as needed */
  font-size: 16px; /* Adjust font size as needed */
  border: none; /* Remove border */
  border-radius: 5px; /* Add rounded corners */
  cursor: pointer; /* Add pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition on background color change */
}
.button_close{
  position: relative;
  bottom: 100px;
  top:170px;
  left:-14px;
  background-color: red;
  padding: 10px 20px;
  color:white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor:pointer;

}
.button_submit:hover{
  background-color: #2980b9;
}
.button_close:hover{
  background-color:  rgb(46, 44, 44);
}
span {
    color:blue;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  }
  .error-message2{
    position: relative;
    top:100px;

  }
  .error-message1{
    position: relative;
    top:50px;

  }
  .error-message3{
    position: relative;
    top:150px;

  }
  h1{
    color:orange;
  }
  .custom-popup {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.custom-popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  height: 400px;
  background-color: lightblue;
  position: relative;
  top:60px;
  border-radius: 19px;
}

.page-header {
    background-color: #f5f5f5;
    padding: 20px;
    text-align: center;
  }
  
  .table-container {
    overflow-x: auto;
    max-height: 400px; /* Adjust the height based on your design */
    margin: 20px 0;
  }
  thead{
    position: sticky;
    top: 0;
  background-color: azure;
  /* z-index: 2; */
  }
  .label5{
    position: relative;
    top: 138px;
    right: 313px
  }
  .input5{
    position: relative;
    top: 102px;
    left: 99px;

  }
  .label6{
    position: relative;
    top: 223px;
   right: 214px;
  }
  .input6{
    position: relative;
    right: 164px;
    top: 218px;
  }
  .label4{
    position: relative;
    top: 43px;
  }
  .input4{
    position: relative;
    top: 40px;
  }
  .save_edit{
    position: relative;
    top: 267px;
    font-size: large;
    background-color:green;
    color: white;
  }
  .close_edit{
    position: relative;
    top: 267px;
    left:133px;
    font-size: large;
    background-color: red;
    color: white;
  }
  i{
    position: relative;
    right: 800px;
  }
 .fa-message{

  position: relative;
  left:800px;
 }

  </style>