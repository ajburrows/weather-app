import React, { useState } from "react";
import { TextField, Button } from '@mui/material'

function ZipcodeInput({ zipCode, onZipCodeChange, submitHelper }) {
  const handleChange = (event) => {
    const input = event.target.value
    onZipCodeChange(input)
  };

  return (
    <div className="zip-code-input-form">
      <TextField
        id="outlined-based"
        label="Zip code"
        variant="outlined"
        helperText="e.g. 98101"
        value={zipCode}
        onKeyDown={(event) => {event.key === "Enter" ? submitHelper(zipCode) : null}}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => submitHelper(zipCode)}
        style={{ marginLeft: "10px",
                 marginBottom: "20px"
         }}
      >
        Submit
      </Button>
    </div>
  );
}

export default ZipcodeInput;