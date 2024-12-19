import React, { useRef } from "react";
import { TextField, Button } from '@mui/material'

function ZipcodeInput({ changeZip }) {
  const textFieldRef = useRef(null)


  const validateInput = (value) => {
    // Check that the user input is an integer with 5 digits
    return /^\d{5}$/.test(value);
  };

  const submitHelper = (value) => {
    if (validateInput(value)) {
      changeZip(value)
    } else {
      console.error("Invalid zip code:", value);
    }
  };

  return (
    <div className="zip-code-input-form">
      <TextField
        id="outlined-based"
        label="Zip code"
        variant="outlined"
        inputRef={textFieldRef}
        onKeyDown={(event) => {event.key === "Enter" ? submitHelper(event.target.value) : null}}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const textFieldValue = textFieldRef.current.value
          submitHelper(textFieldValue)
        }}
        style={{ marginLeft: "10px",}}
      >
        Submit
      </Button>
    </div>
  );
}

export default ZipcodeInput;