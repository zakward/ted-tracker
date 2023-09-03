import React, { useState, useContext } from "react";
import { UserContext } from "./context/userContext";
export default function BudForm() {
  const { addTedData } = useContext(UserContext);

  const [inputs, setInputs] = useState({
    name: "",
    category: "",
    strength: "",
    price: "",
    flavor: "",
    effects: "",
    lineage: "",
    ailments: "",
    imgUrl: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      return {
        ...inputs,
        [name]: value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addTedData(inputs);
  }

  return (
    <>
      <div id="add-form-container">
        <h2>Add Bud Form</h2>
        <form id="add-bud-form" onSubmit={handleSubmit}>
          <input
            placeholder="bud name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
          <input
            placeholder="category"
            name="category"
            value={inputs.category}
            onChange={handleChange}
          />
          <input
            placeholder="strength"
            name="strength"
            value={inputs.strength}
            onChange={handleChange}
          />
          <input
            placeholder="price"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
          <input
            placeholder="flavor"
            name="flavor"
            value={inputs.flavor}
            onChange={handleChange}
          />
          <input
            placeholder="effects"
            name="effects"
            value={inputs.effects}
            onChange={handleChange}
          />
          <input
            placeholder="lineage"
            name="lineage"
            value={inputs.lineage}
            onChange={handleChange}
          />
          <input
            placeholder="ailments"
            name="ailments"
            value={inputs.ailments}
            onChange={handleChange}
          />
          <input
            placeholder="imgUrl"
            name="imgUrl"
            value={inputs.imgUrl}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}
