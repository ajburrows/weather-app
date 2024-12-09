import React, { useState } from "react";
import { TextField, Button } from '@mui/material'

function ZipcodeInput({ submitHelper }) {
  /*
  const handleChange = (event) => {
    const input = event.target.value
    onZipCodeChange(input)
  };
  */

  return (
    <div className="zip-code-input-form">
      <TextField
        id="outlined-based"
        label="Zip code"
        variant="outlined"
        //value={zipCode}
        onKeyDown={(event) => {event.key === "Enter" ? submitHelper(event.target.value) : null}}
        //onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={(event) => submitHelper(event.target.value)}
        style={{ marginLeft: "10px",}}
      >
        Submit
      </Button>
    </div>
  );
}

export default ZipcodeInput;