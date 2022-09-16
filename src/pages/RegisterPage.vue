<template>
  <div class="wrapper">
    <form @submit.prevent="submitHandler" action="">
      <h2 class="form-header">{{ isRegsitered ? 'Login' : 'Sign up' }}</h2>

      <span>{{ isLoading ? 'it is loading' : '' }}</span>
      <span>{{ isError }}</span>
      <div v-if="!isRegsitered" class="form-control">
        <label for="">Name </label>
        <input type="text" v-model="name" />
      </div>
      <div class="form-control">
        <label for="">Your Email </label>
        <input type="email" v-model="email" />
      </div>
      <div class="form-control">
        <label for="">Your password </label>
        <input type="password" v-model="password" />
      </div>
      <div v-if="!isRegsitered" class="form-control">
        <label for="">Confirm password </label>
        <input type="password" v-model="confirmPassword" />
      </div>
      <button class="submit-button" :disabled="isLoading">
        {{ isMember }}
      </button>
      <p>
        {{
          !isRegsitered
            ? 'DO you have an account?Log in'
            : 'DO not  you have an account?Sign up'
        }}
      </p>
      <button @click="registerStatusHandler" type="button">
        {{ !isRegsitered ? 'Log in' : 'Sign Up' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      isRegsitered: true,
      isLoading: false,
    };
  },

  methods: {
    registerStatusHandler() {
      this.isRegsitered = !this.isRegsitered;
    },
    async submitHandler() {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      if (this.isRegsitered) {
        if (this.email && this.password) {
          this.isLoading = true;
          try {
            await this.$store.dispatch('user/loginHandler', data);

            // if (x) {
            //   this.$router.push('/');
            // }
          } catch (error) {
            console.log(error);
          }

          this.isLoading = false;
        }
      }
      if (!this.isRegsitered) {
        if (
          !this.email &&
          !this.password &&
          !this.name &&
          !this.confirmPassword
        ) {
          console.log('please fill all fields');
        } else if (this.password != this.confirmPassword) {
          console.log('password and confirm passwords must match ');
        } else {
          this.isLoading = true;
          try {
            await this.$store.dispatch('user/register', data);
          } catch (error) {
            console.log(error);
          }
          this.isLoading = false;
        }
      }
    },
  },
  watch: {
    isAuth(auth) {
      if (auth) {
        this.$router.push('/');
      }
    },
  },

  computed: {
    isMember() {
      return this.isRegsitered ? 'Login' : 'Signup';
    },
    isError() {
      return this.$store.getters['user/getErorrMsg'];
    },
    isAuth() {
      return this.$store.getters['user/getUser'];
    },
  },
};
</script>

<style scoped>
.wrapper {
  padding: 7rem 5%;
}
form {
  border: 1px solid green;
  width: min(50rem, 100%);
  margin-inline: auto;
  padding: 1em;
}
.form-header {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.75rem;
}
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
button {
  margin-bottom: 1.5rem;
  padding: 1rem 3rem;
}

.submit-button {
  display: inline-block;
  background-color: rgb(32, 53, 76);
  color: white;
  font-weight: 700;
  font-size: 2rem;
  width: 100%;
}
.submit-button:disabled {
  opacity: 0.7;
}
label {
  font-size: 1.5rem;
}
input {
  height: 3rem;
}
input:focus {
  outline: none;
}
p {
  font-size: 1.5rem;
}
</style>
