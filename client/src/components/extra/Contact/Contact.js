import React, { useState } from "react";
import TopNav from "../../dashboard/TopNav/TopNav";
import Button from "@material-ui/core/Button";
import "./contact.css";
import Icon from "@material-ui/core/Icon";


const ContactForm = () => {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <>
      <div className="nav">
        {" "}
        <TopNav />{" "}
      </div>
      <div className="container">
        <h1 style={{ color: "#0080FF", fontSize: "2rem", fontWeight: "bold" }}>
          CONTACT US
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>

          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" required />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
