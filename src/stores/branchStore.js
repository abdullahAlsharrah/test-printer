import { makeAutoObservable, runInAction } from "mobx";

class BranchStore {
  loading = true;
  /* Assign user */
  branch = {};
  branches = [];
  constructor() {
    makeAutoObservable(this);
  }

  unsetBranch = async () => {
    runInAction(() => {
      this.branch = null;
    });
  };

  setBranches = (branches) => {
    runInAction(() => {
      this.branches = branches;
    });
  };
  setBranch = async (branch) => {
    runInAction(() => {
      // this.loading = true;
      this.branch = branch;
      this.loading = false;
    });
  };
}
const branchStore = new BranchStore(); // create instance
// branchStore.fetchBranch();
export default branchStore; // export it
