import React, { useState } from "react";

function ZipcodeInput({ zipCode, onZipCodeChange, submitHelper }) {
  const handleChange = (event) => {
    const input = event.target.value
    console.log(input)
    onZipCodeChange(input)
  };

  function handleSubmit(event){
    event.preventDefault()
    const zipInput = event.target.elements[0].value
    submitHelper(zipInput)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="zipcode">Enter ZIP Code:</label>
      <input
        id="zipcode"
        type="text"
        value={zipCode ? zipCode : ""}
        onChange={handleChange}
        placeholder="e.g. 98101"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ZipcodeInput;