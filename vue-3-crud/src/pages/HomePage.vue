<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The content half -->
      <div class="col-md-12 bg-light">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <form @submit.prevent="onSubmit">
                  <img
                    src="../../public/7.jpg"
                    style="height: 200px; width: 200px"
                  />
                  <div v-if="servErrors.length > 0">
                    <p class="mb-4" style="color: red">
                      {{ servErrors[0].error.message }}
                    </p>
                  </div>
                  <!-- Email -->
                  <div class="form-group mb-3">
                    <input
                      id="inputEmail"
                      placeholder="Email address"
                      required=""
                      autofocus=""
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                      v-model="form.email"
                    />
                  </div>
                  <!-- Handle Email error -->
                  <div
                    class="input-errors"
                    v-if="v$.form.email.$errors.length > 0"
                    :key="index"
                  >
                    <div class="error-msg">
                      {{ v$.form.email.$errors[0].$message }}
                    </div>
                  </div>
                  <!--  Password  -->
                  <div class="form-group mb-3">
                    <input
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                      v-model="form.password"
                    />
                  </div>
                  <!-- Handle Password Input -->
                  <div
                    class="input-errors"
                    v-if="v$.form.password.$errors.length > 0"
                    :key="index"
                  >
                    <div class="error-msg">
                      {{ v$.form.password.$errors[0].$message }}
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                  >
                    Valider
                  </button>
                  <button
                    @click="reset"
                    class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                  >
                    Reset
                  </button>
                  <div>
                    <router-link :to="{ name: 'RegisterPage' }"
                      >Créer un compte</router-link
                    >
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
// Import something
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import UsersDataService from "@/services/UsersDataService";

// Import something
export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      servErrors: [],
      v$: useVuelidate(),
      form: {
        name: "",
        email: "",
      },
    };
  },

  // Validate user inputs
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(8),
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      } else {
        this.loginUser();
      }
    },
    reset() {
      this.form.email = "";
      this.form.password = "";
    },

    loginUser() {
      let data = {
        email: this.form.email,
        password: this.form.password,
      };
      this.servErrors = [];
      UsersDataService.loginUser(data)
        .then(() => {
          console.log(" Users loged succeffuly");
          this.$router.push("/profile");
        })
        .catch((e) => {
          this.servErrors = [];
          switch (e.response.status) {
            case 401:
              this.servErrors.push({ error: e.response.data });
              break;
          }
        });
    },
  },
};
</script>

<style scoped>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  background-size: cover;
  background-position: center center;
}
div.row {
  text-align: center;
}

h3 {
  font-weight: bolder;
  margin-bottom: 20px;
}

div .login-text {
  background-color: black;
  width: 100px;
  height: 40px;
  margin: 20px auto;
  text-align: center;
  color: azure;
  padding-top: 8px;
  border-radius: 20px;
  margin-bottom: 80px;
}

button {
  width: 160px;
  margin-top: 30px;
  margin-left: 30px;
}

input {
  margin: 30px 0px auto;
}

div.input-errors {
  color: red;
}
</style>
