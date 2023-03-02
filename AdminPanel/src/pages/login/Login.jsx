import { useState } from "react"
import "./login.scss"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toaster from '../../Helper/toaster';
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const data = await axios.post(`${process.env.REACT_APP_PROD_URL}admin/login`, { email, password }, config)
      if (data.status===200) {
        toaster("sucess", "Successfully Logged In");
        localStorage.setItem("adminInfo", JSON.stringify(data.data.message))
        navigate("/")
      } else {
        toaster("error", "Invalid Credentials.");
      }
    }
    catch (err) {
      toaster("error", "Invalid Credentials.")
    }

  }
  return (
    <body style={{ marginTop: "300px" }}>
      <div class="container forms" id="container">
        <div class="form sign-in">
          <form>
            <div class="header">Sign In</div>
            <span class="under__social">
              <a href="#" class="link signup-link">or use your account</a>
            </span>
            <div class="button-input-group">
              <div class="group input-group">
                <input onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder="Email" required />
              </div>
              <div class="group input-group">
                <input onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" required />
              </div>
              <div class="alert-text">
                <span class="help__text">At least 8 character</span>
              </div>
              <div class="form-link forgot">
                <a href="#" class="login-link">Forgot your password?</a>
              </div>
              <div class="group button-group">
                <button type="button" onClick={() => { login() }} class="signup-btn">
                  <span>Sign in</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  )
}

export default Login