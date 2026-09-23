import config from "@/config";
import axios from "axios";
const baseurl = "";
const api = {
  async register(
    fullname: string,
    email: string,
    phoneNumber: string,
    password: string,
    role: "patient" | "caregiver",
  ) {
    try {
      return await axios.post(`${config.backend_url}/api/register`, {
        fullname,
        email,
        phoneNumber,
        password,
        role,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${config.backend_url}/api/login`, {
        email,
        password,
      });
      console.log("Gay");
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default api;
