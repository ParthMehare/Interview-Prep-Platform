import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});
export async function registerUser(username, email, password) {
  try {
    const response = await api.post("/register", {
        username,
        email,
        password,
      });

    return response.data;

  } catch (err) {
    console.log(err);
  }
}

export async function loginUser(email, password) {

    try {
        
        const response = await api.post("/login", {
            email,
            password,
        });
        return response.data;

    }catch (err) {
        console.log(err);
    }
}

export async function logoutUser() {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (err) {
        console.log(err);
    }

}

export async function getCurrentUser() {
    try {
        const response = await api.get("/me");
        return response.data;
    } catch (err) {
        console.log(err);
    }
}