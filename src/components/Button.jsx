import React from "react";
import { memo } from "react";

export const  Button = memo(({ type = "button", className, onClick, value }) => {
	console.log("render btn",className)
   return (
      <button type={type} className={className} onClick={onClick}>
         {value}
      </button>
   );
})
