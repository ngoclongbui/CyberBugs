/* eslint-disable no-lone-blocks */
import { baseServices } from "../baseServices";

export class UserServices extends baseServices {
  constructor() {
    {
      super();
    }
  }
  signInUser = (userInfo) => this.post("Users/signin", userInfo);

  signUpUser = (newUser) => this.post("Users/signup", newUser);

  getListUser = () => this.get("Users/getUser");

  getListUserKeyword = (keyword) =>
    this.get(`Users/getUser?keyword=${keyword}`);

  updateUser = (userUpdate) => this.put("Users/editUser", userUpdate);

  deleteUser = (userId) => this.delete(`Users/deleteUser?id=${userId}`);
}

export const userServices = new UserServices();
