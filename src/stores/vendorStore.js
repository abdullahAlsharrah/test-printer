import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";
class VendorStore {
  loading = false;
  /* Assign user */
  vendor = null;
  constructor() {
    makeAutoObservable(this);
  }

  /* Set Trainee token in local storage */
  fetchVendor = async () => {
    try {
      this.loading = true;
      const res = await instance.get("/vendors/vendor");
      runInAction(() => {
        this.vendor = res.data;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  unsetVendor = async () => {
    runInAction(() => {
      this.vendor = null;
    });
  };
  setVendor = async (vendor) => {
    runInAction(() => {
      this.vendor = vendor;
    });
  };
}
const venodrStore = new VendorStore(); // create instance
// venodrStore.fetchVendor();
export default venodrStore; // export it
