import React, { useRef } from "react";
import { TextField, Button } from '@mui/material'

function ZipcodeInput({ submitHelper }) {
  const textFieldRef = useRef(null)

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