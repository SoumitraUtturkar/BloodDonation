import { useState, useEffect } from "react";
import axios from "axios";

const RequestBlood = () => {
    const [formData, setFormData] = useState({
        patient_name: "",
        guardian_name: "",
        email: "",
        phone: "",
        bloodType: "",
        hospital: "",
        location: "",
        photo: "" // Now storing as a URL string
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [token, setToken] = useState(null);

    // Fetch token from localStorage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError("You must be logged in to request blood.");
        }
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Check if token is available
        if (!token) {
            setError("Unauthorized - Please log in first.");
            return;
        }

        // Validation Check
        if (!formData.patient_name || !formData.guardian_name || !formData.phone ||
            !formData.bloodType || !formData.hospital || !formData.location) {
            setError("All fields are required!");
            return;
        }

        try {
            console.log("Sending request with token:", token); // Debugging

            const response = await axios.post(
                "http://localhost:3000/api/v3/post", // Ensure backend URL is correct
                formData,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Ensure "Bearer " prefix
                    },
                    withCredentials: true // Ensures cookies (JWT) are sent with request
                }
            );

            if (response.status === 201) {
                setSuccessMessage("Blood request submitted successfully!");
                setFormData({
                    patient_name: "",
                    guardian_name: "",
                    email: "",
                    phone: "",
                    bloodType: "",
                    hospital: "",
                    location: "",
                    photo: ""
                });
            }
        } catch (error) {
            console.error("Error submitting request:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to submit request. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Request Blood</h2>
            
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" name="patient_name" value={formData.patient_name} onChange={handleChange} placeholder="Patient Name" required style={styles.input} />
                <input type="text" name="guardian_name" value={formData.guardian_name} onChange={handleChange} placeholder="Guardian Name" required style={styles.input} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required style={styles.input} />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required style={styles.input} />
                
                <select name="bloodType" value={formData.bloodType} onChange={handleChange} required style={styles.input}>
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>

                <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital Name" required style={styles.input} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required style={styles.input} />

                {/* Changed File Upload to Text Input for Photo URL */}
                <input type="text" name="photo" value={formData.photo} onChange={handleChange} placeholder="Photo URL (optional)" style={styles.input} />

                <button type="submit" style={styles.button}>Submit Request</button>
            </form>
        </div>
    );
};

// Basic Styling
const styles = {
    container: {
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        textAlign: "center"
    },
    title: {
        color: "#333",
        fontSize: "24px",
        marginBottom: "20px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px"
    },
    button: {
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#e63946",
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px"
    },
    error: {
        color: "red",
        fontSize: "14px",
        marginBottom: "10px"
    },
    success: {
        color: "green",
        fontSize: "14px",
        marginBottom: "10px"
    }
};

export default RequestBlood;
