import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import UsersDataService from "../services/UsersDataService";
import ProfilePage from "../pages/ProfilePage";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    props: true,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
    props: true,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
    props: true,
    meta: {
      userMustAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// let isAuthenticated = false;
router.beforeEach(async (to, from, next) => {
  // // Send a request to server in order to verify the authaurisation
  if (to.path !== "/" && to.meta.userMustAuth) {
    await UsersDataService.checkUserHomeAutho()
      .then((response) => {
        // Status 200 authorized
        // If the user is logged so he is Auth from the server
        console.log(" CONNECTED ");
        console.log(response);
        // router.push({ path: '/user' });
        return next();
      })
      .catch((err) => {
        // Status 401 not authorized from server because no logging detected
        console.log(" NOT CONNECTED ");
        console.log(err);
        // return next('/login');
        // router.push({ path: '/user' });
        return next({ path: "/" });
      });

    // Vérify the id of the sessionType in the url.
  } else {
    return next();
  }
});

export default router;
