<template>
  <div class="super">
    <!-- <header class="fixed-header"> -->
      <header   class="fixed-header" >
      <h1>Welcome {{ userName }}</h1>
      <div>
    <p>{{ count }}</p>
    <button @click="increment">Increment</button>
  </div>

      <div>
        <button class="button3" @click="show_popup">ADD NOTE</button>

        <div v-if="is_popup" class="popup-overlay">
          <div class="popup-content">

            <h1 class="h1tag">NOTE AREA:</h1>



            <textarea class="input1" v-model="postData" for="notes" placeholder="Type something"></textarea>
            <br>
            <button class="button1" @click="mainfunction">Submit</button>
            <button class="button2" @click="closePopup">Close</button>
          </div>
        </div>
      </div>


    </header>
  </div>


  <div class="main-container">
    <main >
<div class="button_flex">
      <div class="deletebutton">

        <button @click="Delete" style="display: inline-flex; align-items: center;">
    <i v-if="!button_showing" class="fa-solid fa-trash" style="cursor: pointer;"></i>
    <span style="margin-left: 5px;">Delete</span>
</button>
      </div>

      <div>

        <button  class="contact-button" @click="contact">Contact</button>
      </div>
      <div>
        <div>
          <button class="logout-btn" @click="show_popup_logout">LOGOUT</button>

          <div v-if="is_popup_logout" class="popup-logout">
            <div class="popup-logout-content">
              <h1>HI {{ userName }}</h1>
              <p>Are you sure you want to logout?</p>
              <button @click="remove_cookie">
                <i class="fa-solid fa-check"></i>
              </button>
              <button @click="hide_popup_logout">
                <i class="fa-solid fa-rectangle-xmark"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="th1">
                <input type="checkbox" v-model="select_all" class="select-all-checkbox" @change="select_allItems" />
              </th>

              <!-- <th class="th2">ID</th> -->
              <th class="th3">MESSAGE</th>
              <th class="th4">TIME</th>
              <th class="th5"> ACTIONS</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in session_data_from_store" :key="index">
            <tr>

              <td class="td1">
                <input v-if="!display" type="checkbox" v-model="selectedItems" :value="item.id" />
              </td>
              <!-- <td class="td2" v-if="!display">{{ item.id }}</td> -->
              <td class="td3">
                <input value=up v-if="(selectedItems.includes(item.id)) && isEditSelected" type="text"
                  v-model="itemNotes" />
                <span v-else>{{ item.notes }}</span>
              </td>
              <td class="td4">{{ formatDateTime(item.tim) }}</td>

             
              <button @click="openForm(item)">EDIT</button>
            </tr>

            <div v-if="formVisible" class="custom-popup">
      <div class="custom-popup-content">
        <label class="label4" for="message">Message:</label>
        <input class="input4" v-model="notes" type="text" id="message" />

        
        <button  class="save_edit" @click="Submit(item)">Save</button>
        <button class="close_edit" @click="closeForm">Close</button>
      </div>
    </div>

          </tbody>
        </table>
      </div>
    </main>
  </div>
  <footer >
   
      
    
   

  </footer>
</template>

<script setup>


import { ref, onMounted, computed, watch, reactive } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const router1 = useRouter();
const store = useStore()
const display = ref(false);
const userName = ref("");
const session = ref([]);
const postData = ref("");
const selectedItems = ref([]);
const notes_error = ref(false);
const delete_check = ref(false);
const edit_check = ref(false);
const isEditSelected = ref(false);
const select_all = ref(false);



onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8087/account/user', {
      method: 'GET',
      credentials: 'include',
      // You can add headers or other options here if needed
    });
    console.log("after request");

    const data = await response.text();

    userName.value = data;

    if (response.ok) {

      postDataToServer();

    } else {
      console.error('Error signing up:', response.statusText);
    }

    // Handle the response from the backend if needed
    console.log(data + "the value of data is :");
  } catch (error) {
    console.error('Error sending value to the backend:', error);
  }


})


function checkingNotes() {
  const notes = postData.value
  console.log(notes + " notes value");

  if (notes == null || notes == "") {
    notes_error.value = true;

  } else {
    // Update the value of firstn_err
    notes_error.value = false;
  }
}


function checking() {
  if (isValidObj(notes_error.value) === false) {

    return true;
  }
  return false;
}
function isValidObj(bool_val) {

  if (bool_val == "") {
    return false
  }

  if (bool_val == null) {
    return false
  }
}
function mainfunction() {

  checkingNotes();
  let s = checking();
  if (s === true) {

    postDataToServer();

  }
  closePopup();
}

let is_popup = ref(false);
// const enteredValue = ref('');

let show_popup = () => {
  is_popup.value = true;
};

let closePopup = () => {
  is_popup.value = false;
  postData.value = ''; // Reset the entered value when closing the popup
};


const postDataToServer = async () => {
  try {
    const response = await fetch('http://localhost:8087/account/dash?submitValue=' + postData.value, {
      method: 'GET',
      credentials: 'include',
    });
    postData.value = '';

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    session.value = data;
    isEditSelected.value = false;
    store.dispatch('setSessionData', data)


    console.log('Response from server:', data);
  } catch (error) {
    console.error('Error posting data:', error);
  }
}



const Delete = async () => {
  isEditSelected.value = false;
  if (selectedItems.value.length === 0) {
    console.error('No items selected');
    return;
  }

  try {
    const response = await fetch('http://localhost:8087/account/del', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: selectedItems.value }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.text();
    console.log('Response from server:', data);
    postDataToServer()

    
  } catch (error) {
    console.error('Error during DELETE request:', error.message);
  }
};
const formVisible = ref(false);
const notes = ref('');
const id = ref('');

const openForm = (item) => {
  id.value=item.id
  notes.value = item.notes;
 
  formVisible.value = true;
};

const closeForm = () => {
  formVisible.value = false;
};

const Submit = async (item) => {
  button_showing.value = false;

  try {
    const response = await fetch('http://localhost:8087/account/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        id:id.value,
        
        notes: notes.value,

      }),

    });

    let update_info = {
      "id" :  id.value,
      "notes" : notes.value
    }
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    store.dispatch('update_message', update_info);
    const data = await response.json(); // Assuming the server returns JSON
    console.log('Response from server:', data);
  } catch (error) {
    console.error('Error during PUT request:', error.message);
  }

  closeForm();
};


const select_allItems = () => {
  selectedItems.value = select_all.value ? session.value.map(item => item.id) : [];
  console.log("the value of selectedallitems" + selectedItems.value)
  button_showing = false;
};

// Watch for changes in the session array and update select_all accordingly
watch(session, () => {
  select_all.value = selectedItems.value.length === session.value.length;
  console.log("the value of selectedallitems" + selectedItems.value)
});




function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12; // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${amPm}`;
}



const is_popup_logout = ref(false);

const show_popup_logout = () => {
  is_popup_logout.value = true;
};

const hide_popup_logout = () => {
  is_popup_logout.value = false;
};





const remove_cookie = async () => {

  try {
    const response2 = await fetch('http://localhost:8087/account/removecookie', {
      method: 'GET',
      credentials: 'include', // Include cookies in the request

    });

    if (!response2.ok) {
      throw new Error('Network response was not ok');
    }
    hide_popup_logout();

    const data = await response2.text();
    console.log('Response2 from server:', data);

    if (data === 'true') {

      router1.push({ name: 'Login' });

    } else {

      console.log('doesnt remove cookie.');

    }
  } catch (error) {
    console.error('Error posting data:', error);
  }


}
function contact() {
  router1.push({ name: 'Contact' });
}

</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

header {
  /* background-color: #3498db;
  color: #fff; */
  text-align: center;
  padding: 20px;
  height: 10%;
    background-color: #f0f0f0;
}

/* tbody,td{
  overflow-y: scroll;
} */

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
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.h1tag {
  font-size: 18px;
  margin-bottom: 10px;
  color: orange;
}

.input1 {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.button1,
.button2,
.button3 {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.button2 {
  background-color: #e74c3c;
}

.button3 {
  position: relative;
  left: 820px;
}

.dele,
.fifth {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

main {
  padding: 20px;
  height: 80%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: #fff;
}

.select-all-checkbox {
  margin-right: 10px;
}

.dele,
.fifth {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.dele:hover,
.fifth:hover {
  background-color: #c0392b;
}

.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  /* background-color: #fff;  */
  z-index: 1000;
}

.main-container {
  margin-top: 200px;

  /* overflow-y: auto;
  
  height: calc(100vh - 70px); */

}

.button-container {
  margin-left: 30px;
  display: flex;
}

.deletebutton {
  margin-left: 30px;
}

.deletebutton:hover {
  /* background-color: red; Change to the desired hover color */
  color: red;
}

.editbutton {
  margin-left: 30px;

}

.editbutton:hover {
  color: forestgreen
}

.submitbutton:hover {

  background-color: green;
}

.th2 {
  width: 50px;
}

.th3 {
  width: 800px;
}

.th5 {
  width: 50px;
}

.popup-logout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-logout-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 250px;
  height: 130px;

}

.td1 {
  width: 10px;
}

.td4 {
  width: 110px;
}

.contact-button {
  /* position: fixed; */
  display: block;
  bottom: 20px;
  right: 96%;
  position: relative;
  bottom: 77px;
  
}

.contact-btn,
.logout-btn {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn {
  background-color: #e74c3c;
  position: relative;
    left: 1466%;
}

.contact-btn:hover,
.logout-btn:hover {
  background-color: #2980b9;
  /* Change to the desired hover color */
}

.table-container {
  max-height: 400px; /* Set the maximum height for the scrollable area */
  overflow-y: auto; /* Add vertical scrollbar if content overflows */
}

thead {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
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
}

.custom-popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 200px;
  height: 200px;
  background-color: lightblue;
  position: relative;
  top:60px;
  border-radius: 19px;
}
.save_edit{
    position: relative;
    top: 70px;
    font-size: large;
    background-color:green;
    color: white;
  }
  .close_edit{
    position: relative;
    top: 70px;
    left:90px;
    font-size: large;
    background-color: red;
    color: white;
  }
.label4{
  font-size: 50px;
}
.input4{
  height:40px;
}
/* footer{
  position: fixed;
} */
.button_flex{
  display:flex;

}
</style>
