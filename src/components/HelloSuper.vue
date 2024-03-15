<template>
  <div>
    <p>Text Variable: {{ text }}</p>
    <input v-model="new_text" placeholder="Enter new text" />
    <button @click="update_text">Update Text </button>
    <p>Text Variable: {{ variable }}</p>
    <input v-model="new_variable" placeholder="Enter new text" />
    <button @click="update_variable">Update Variable</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();


const text = computed(() => store.getters.text);
const new_text = ref('');

const variable=computed(()=>store.getters.variable);
const new_variable = ref('');

const update_text = async () => {
  store.dispatch('update_text', new_text.value);
};
const update_variable = async () =>{
    store.dispatch('update_variable',new_variable.value)
}

</script>
