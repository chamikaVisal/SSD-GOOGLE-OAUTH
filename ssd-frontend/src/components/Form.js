//Form - ravindu
import React from "react";
import "./Form.css";
import FormSigUp from "./FormSigUp";
import { useState } from "react";

function Form() {
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // function submitForm() {
  //   setIsSubmitted(true);
  // }
  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src="img/img-2.svg" alt="spaceship" />
        </div>
       <FormSigUp /> 
      </div>
    </>
  );
}

export default Form;
//-------------------------------------------------------------------