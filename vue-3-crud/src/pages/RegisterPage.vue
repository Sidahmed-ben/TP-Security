<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The content half -->
      <div class="col-md-12 bg-light">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="row"></div>
            <!-- ----------------- -->
            <form @submit.prevent="onSubmit">
              <div v-if="servErrors.length > 0">
                <p class="mb-4" style="color: red">
                  {{ servErrors[0].error.message }}
                </p>
              </div>
              <!-- Name -->
              <div class="form-group mb-3">
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required=""
                  autofocus=""
                  class="form-control rounded-pill border-0 shadow-sm px-4"
                  v-model="form.name"
                />
              </div>
              <!-- Handle Name error -->
              <div
                class="input-errors"
                v-if="v$.form.name.$errors.length > 0"
                :key="index"
              >
                <div class="error-msg">
                  {{ v$.form.name.$errors[0].$message }}
                </div>
              </div>
              <!-- Email  -->
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
              <!-- Email Validation  -->
              <div
                class="input-errors"
                v-if="v$.form.email.$errors.length > 0"
                :key="index"
              >
                <div class="error-msg">
                  {{ v$.form.email.$errors[0].$message }}
                </div>
              </div>
              <!-- Password  -->
              <div class="form-group mb-3">
                <input
                  id="inputPassword"
                  type="password"
                  placeholder="Password"
                  required=""
                  autofocus=""
                  class="form-control rounded-pill border-0 shadow-sm px-4"
                  v-model="form.password"
                />
              </div>
              <!-- Password Validation  -->
              <div
                class="input-errors"
                v-if="v$.form.password.$errors.length > 0"
                :key="index"
              >
                <div class="error-msg">
                  {{ v$.form.password.$errors[0].$message }}
                </div>
              </div>
              <!-- Password2 -->
              <div class="form-group mb-3">
                <input
                  id="inputPassword2"
                  type="password"
                  placeholder="Confirm password"
                  required=""
                  class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                  v-model="form.password2"
                />
              </div>
              <div
                class="input-errors"
                v-if="v$.form.password2.$errors.length > 0"
                :key="index"
              >
                <div class="error-msg">
                  {{ v$.form.password2.$errors[0].$message }}
                </div>
              </div>
              <button
                type="submit"
                class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import UsersDataService from "@/services/UsersDataService";

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}

// Import something
export default {
  name: "RegisterPage",
  components: {},
  data() {
    return {
      servErrors: [],
      v$: useVuelidate(),
      form: {
        name: "",
        email: "",
        password: "",
        passowrd2: "",
      },
    };
  },

  validations() {
    return {
      form: {
        name: {
          required,
          name_validation: {
            $validator: validName,
            $message:
              "Invalid Name. Valid name only contain letters, dashes (-) and spaces",
          },
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(8),
        },
        password2: {
          required,
          sameAs: sameAs(this.form.password),
        },
      },
    };
  },
  updated() {},
  methods: {
    onSubmit() {
      this.v$.$validate();
      if (this.v$.$error) {
        return;
      } else {
        this.registerUser();
      }
    },
    registerUser() {
      let data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        password2: this.form.password2,
      };
      this.servErrors = [];
      UsersDataService.registerUser(data)
        .then(() => {
          console.log(" User registered succeffuly");
          this.$router.push("/login");
        })
        .catch((e) => {
          if (
            e.response.status === 400 ||
            e.response.status === 500 ||
            e.response.status === 409
          ) {
            console.log(e.response.data);
            this.servErrors.push({ error: e.response.data });
          } else {
            console.log(" ERROR CAN NOT BE IDENTIFIED ?? ");
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
  width: 200px;
  margin-top: 30px;
}

input {
  margin: 30px 0px auto;
}

div.input-errors {
  color: red;
}
</style>
