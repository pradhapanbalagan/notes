import { createStore } from 'vuex';

export default createStore({
  state: {
    sessionData: [],
    contact: [],
    name:null

    
  },
  mutations: {
    updateSessionData(state, newArray) {
      state.sessionData = newArray;     
    },
    updateContact(state, newvalue) {
      state.contact = newvalue;
    },
    store_name(state,newName){
      state.name=newName;
    }
    
  },
  actions: {

    set_name({commit},newName){
      commit('store_name',newName);
    },

    // message data  store in store.js
    setSessionData({ commit }, newArray) {      
      commit('updateSessionData', newArray);
    },

    // contact data store in store.js
    setContact({ state, commit }, newvalue) {
      state.contact = [];
      commit('updateContact', newvalue);
    },
    // contact data add that data push to old contact data

    update_contact_info({ state, commit }, value) {
      let existing_contact = state.contact;
      existing_contact.push(value);
      commit('updateContact', existing_contact);
    },
    // delete contact data in store in store.js
    delete_contact_info({state,commit},contact_id){
      let existing_contact =state.contact;
      existing_contact.forEach((element, index) => {
        if(element.id == contact_id){
          existing_contact.splice(index, 1);
        }
      });
      commit('updateContact',existing_contact);

    },

    // update message in store .js

    update_message({state,commit},message){
      let existing_message =state.sessionData;
      existing_message.forEach((element, index) => {
        if(element.id == message.id){
           existing_message[index].notes = message.notes 
        }
      });
      commit('updateSessionData',existing_message);

    },

    // update contact data in store

    update_contact({state,commit},name){
      let existing_contact=state.contact;
      existing_contact.forEach((element,index)=>{
        if(element.id == name.id){
          existing_contact[index].firstname=name.firstname
          existing_contact[index].lastname=name.lastname
          existing_contact[index].email= name.email
        }
        });
        commit('updateSessionData',existing_contact);
      },
    
    
  },
  getters: {
    getSessionData: (state) => state.sessionData,
    getContact: (state) => state.contact,
    getName:(state)=>state.name,
   
  },
});

