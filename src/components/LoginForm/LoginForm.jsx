import { useState } from "react";
import UserRequests from "../../services/UserRequests";
import UserStorage from '../../utils/UserStorage.js'

// let userToken = null;
let user = {
  userToken: null,
  userName: null,
};

export function LoginForm({
  onSubmitLogin,
  onClickToRegistration,
  onClickToBoard,
}) {
  const [login, setLogin] = useState(() => {
    return {
      identifier: "",
      password: "",
    };
  });

  function changeInputLoginForm(event) {
    event.persist();
    setLogin((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await UserRequests.login(login.identifier, login.password).then((res) => {
        // console.log(res);
        user.userToken = res.jwt;
        user.userName = res.user.username;
      });
    } catch (error) {
      console.log("No such user!");
    }

    // console.log("user.userToken", user.userToken);
    // console.log("user.userName", user.userName);

    if (!user.userToken) {
      alert("Invalid login or password");
      return;
    }

    // localStorage.setItem("user", JSON.stringify(user));
    UserStorage.setUser(user.userToken, user.userName);

    onSubmitLogin();
  }

  return (
    <>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          Login:
          <input
            name="identifier"
            id="identifier"
            type="text"
            value={login.identifier}
            onChange={changeInputLoginForm}
            required
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            id="password"
            type="password"
            value={login.password}
            onChange={changeInputLoginForm}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onClickToRegistration();
          }}
        >
          Start here
        </button>{" "}
      </p>
      <p>
        Don't want login?{" "}
        <button
          type="button"
          onClick={() => {
            onClickToBoard();
          }}
        >
          Come in!
        </button>
      </p>
    </>
  );
}
