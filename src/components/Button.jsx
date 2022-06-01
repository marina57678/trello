import React,  { memo } from "react";

export const  Button = memo(({ type = "button", className, onClick, value }) => {

   return (
      <button type={type} className={className} onClick={onClick}>
         {value}
      </button>
   );
})
