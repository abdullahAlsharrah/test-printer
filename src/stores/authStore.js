import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";
class AuthStore {
  loading = true;
  /* Assign user */
  allowed = true;
  user = null;
  constructor() {
    makeAutoObservable(this);
  }

  /* Create New Trainee */
  registerVendor = async (newUser) => {
    try {
      const res = await instance.post("/vendor/signup", newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error(error); // error message
    }
  };
  registerBranch = async (newUser) => {
    try {
      const res = await instance.post("/branch/signup", newUser);
      this.setUser(res.data.token);
    } catch (error) {
      console.error(error); // error message
    }
  };

  /* Login Trainee */
  login = async (userData) => {
    try {
      const res = await instance.post("/signin", userData);
      this.setUser(res.data.token);
    } catch (error) {
      console.error(error);
    }
  };

  /* Logout Trainee */
  logout = async () => {
    // await localStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
    runInAction(() => {
      this.user = null;
    });
  };

  /* Set Trainee token in local storage */
  setUser = async (token) => {
    const user = decode(token);
    if (user.user_type !== "branch") {
      runInAction(() => {
        this.allowed = false;
      });
    } else {
      // localStorage.setItem("myToken", token);
      runInAction(() => {
        this.allowed = true;

        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        this.user = decode(token);
      });
    }
  };

  /* Check the Trainee Token */
  checkForToken = async () => {
    // console.log("s");
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJwZW9ueS1zcyIsImVtYWlsIjpudWxsLCJ1c2VyX3R5cGUiOiJicmFuY2gifQ.RxaLuVTeUzWslDq3oAUqOip029lvR-ls5A6xU1IO8do";
    if (token) {
      //const currentTime = Date.now();
      const user = decode(token);
      if (user) {
        runInAction(() => {
          this.setUser(token);
        });
      }
    }
    runInAction(() => {
      this.loading = false;
    });
  };

  /* Forget User Password */
  forgotPass = async (userName) => {
    try {
      await instance.post("/forgot-password", userName);
    } catch (error) {
      console.error(error);
    }
  };
  /* Change User Password */
  changePass = async (profile) => {
    try {
      await instance.post("/change-password", profile);
    } catch (error) {
      console.error(error);
    }
  };
}
const authStore = new AuthStore(); // create instance
authStore.checkForToken();
export default authStore; // export it
