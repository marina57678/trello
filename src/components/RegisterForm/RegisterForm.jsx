import { useState } from "react";
import UserRequests from "../../services/UserRequests";
import UserStorage from '../../utils/UserStorage.js'

let user = {
  userToken: null,
  userName: null,
};

export function RegisterForm({
  onSubmitRegister,
  onClickToLogin,
  onClickToBoard,
}) {
  const [register, setRegister] = useState(() => {
    return {
      username: "",
      email: "",
      password: "",
      confirm: "",
    };
  });

  function changeInputRegisterForm(event) {
    event.persist();
    setRegister((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (register.password !== register.confirm) {
      alert("Password and password confirmation don't match! Please try again");
      return;
    }

    try {
      await UserRequests.registration(
        register.username,
        register.email,
        register.password
      ).then((res) => {
        console.log(res);
        user.userToken = res.jwt;
        user.userName = res.user.username;
      });
    } catch (error) {
      console.log("Something went wrong. Try again");
    }

    UserStorage.setUser(user.userToken, user.userName);
    onSubmitRegister();
  }

  return (
    <>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label>
          Login:
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={changeInputRegisterForm}
            autoFocus
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={register.email}
            onChange={changeInputRegisterForm}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={register.password}
            onChange={changeInputRegisterForm}
            required
          />
        </label>
        <label>
          Confirm password:
          <input
            type="password"
            id="confirm"
            name="confirm"
            value={register.confirm}
            onChange={changeInputRegisterForm}
            required
          />
        </label>
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => {
            onClickToLogin();
          }}
        >
          Log in
        </button>
      </p>
      <p>
        Don't want register?{" "}
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
