import { useState } from "react";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import TaskBoard from "./TaskBoard";
import UserStorage from "../utils/UserStorage.js";
import "../styles/style.css";

export function App() {
   const hasToken = UserStorage.hasToken();
   const [isRegister, setIsRegister] = useState(true);
   const [isLogin, setIsLogin] = useState(hasToken);

   function handleSubmitLogin() {
      setIsLogin(true);
   }

   function handleSubmitRegister() {
      setIsRegister(true);
   }

   function handleToggleRegLogin(logined = false) {
      if (!isRegister || logined) {
         setIsRegister(true);
         setIsLogin(false);
      } else {
         setIsRegister(false);
         setIsLogin(true);
      }
   }

   return (
      <>
         {!isRegister && (
            <RegisterForm
               onSubmitRegister={handleSubmitRegister}
               onClickToLogin={handleToggleRegLogin}
            />
         )}

         {!isLogin && (
            <LoginForm
               onSubmitLogin={handleSubmitLogin}
               onClickToRegistration={handleToggleRegLogin}
            />
         )}
         {isLogin && isRegister && (
            <TaskBoard onClickToLogout={handleToggleRegLogin} />
         )}
      </>
   );
}
