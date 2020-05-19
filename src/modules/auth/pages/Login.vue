<template>
  <div>
    <form @submit.prevent="submit()">
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" required v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" required v-model="form.password" class="form-control" id="exampleInputPassword1">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions('auth', ['ActionDoLogin']),
    async submit(){
      try {
        await this.ActionDoLogin(this.form)
        this.$router.push({name: 'Home'})
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

<style scoped langs="scss">
form{
  width: 100vw;
  height:100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form div input{
  width: 80vw;
}
</style>
