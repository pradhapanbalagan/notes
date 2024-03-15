 <template> 
  <router-view></router-view>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  components: {

  },
  setup() {
      const router = useRouter()
  },
  beforeRouteEnter: async function(to, from, next) {
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

      if (data == 'true') {
        if(to.name == "index") {
           next({name: 'Welcome'})
        }
        next()
      } else {
        
        next( {name:'SignUp'} );
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      next({name: "SignUp"}); // Proceed with navigation even if there's an error
    }
  }
  }

</script> 

<!-- 
<template>
  <router-view></router-view>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

router.beforeEach(async (to, from, next) => {
  try {
    const response = await fetch('http://localhost:8087/account/api', {
      method: 'GET',
      credentials: 'include' // Include cookies in the request
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.text()
    console.log('Response from server:', data)

    if (data === 'true') {
      if (to.name === 'index') {
        next({ name: 'Welcome' })
      } else {
        next()
      }
    } else {
      next({ name: 'SignUp' })
    }
  } catch (error) {
    console.error('Error fetching data:', error)
     next({ name: 'SignUp' }); // Proceed with navigation even if there's an error
  }
})
</script> -->
