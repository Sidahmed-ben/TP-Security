import http from "./backendConnection/http-common";

class UsersDataService {
  //  Cette partie concerne les deux utilisateurs (User,Coach)
  registerUser(data) {
    return http.post("/users/register", data);
  }

  loginUser(data) {
    return http.post("/users/login", data);
  }

  logoutUser() {
    return http.get("/users/logout");
  }

  checkUserHomeAutho() {
    return http.get("/users/dashboard");
  }
}

export default new UsersDataService();
