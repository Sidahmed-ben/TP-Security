<template>
  <div>
    <center>
      <h1>HELLLOOO !</h1>
      <div class="right_area">
        <button @click="userLogout" class="logout_btn">Logout</button>
      </div>
    </center>
  </div>
</template>

<script>
import UsersDataService from "@/services/UsersDataService";
export default {
  name: "ProfilePage",
  components: {},
  props: [],
  data() {
    return {};
  },
  methods: {
    userLogout() {
      UsersDataService.logoutUser()
        .then(() => {
          console.log(" Users Logout succeffuly");
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e.response.data);
          this.servErrors.push({ error: e.response.data });
        });
    },
  },
};
</script>
