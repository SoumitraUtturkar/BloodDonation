import React, { useState } from "react";

function BloodBankForm() {
  const [formData, setFormData] = useState({
    bloodBankName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can add logic to send data to backend here
  };

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "80px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginTop: "15px",
      fontWeight: "500",
    },
    input: {
      padding: "10px",
      marginTop: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    textarea: {
      padding: "10px",
      marginTop: "5px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
      resize: "vertical",
    },
    button: {
      marginTop: "20px",
      padding: "12px",
      backgroundColor: "#e63946",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#d62828",
    },
  };

  return (
    <div style={styles.container}>
      <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Blood Bank Registration</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Blood Bank Name</label>
        <input
          style={styles.input}
          type="text"
          name="bloodBankName"
          value={formData.bloodBankName}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Email</label>
        <input
          style={styles.input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Phone</label>
        <input
          style={styles.input}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label style={styles.label}>Address</label>
        <textarea
          style={styles.textarea}
          name="address"
          rows="4"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BloodBankForm;
