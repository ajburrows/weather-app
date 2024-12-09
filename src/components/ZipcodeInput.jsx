import React, { useState } from "react";
import { TextField, Button } from '@mui/material'

function ZipcodeInput({ submitHelper }) {

  return (
    <div className="zip-code-input-form">
      <TextField
        id="outlined-based"
        label="Zip code"
        variant="outlined"
        onKeyDown={(event) => {event.key === "Enter" ? submitHelper(event.target.value) : null}}
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