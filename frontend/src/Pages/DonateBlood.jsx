import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DonateBlood = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bloodType: "",
        location: "",
        age: "",
        phone: ""
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError("You must be logged in to donate blood.");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!token) {
            setError("Unauthorized - Please log in first.");
            return;
        }

        if (!formData.bloodType || !formData.location || !formData.age || !formData.phone) {
            setError("All fields are required!");
            return;
        }

        try {
            console.log("Sending donor registration request with token:", token);

            const response = await axios.post(
                "http://localhost:3000/api/v2/register",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                setSuccessMessage("Donor profile created successfully!");
                setTimeout(() => navigate("/live-requests"), 2000);
            }
        } catch (error) {
            console.error("Error registering donor:", error.response?.data || error.message);
            
            // ✅ Instead of showing an error, redirect if user is already a donor
            if (error.response?.data?.message === "User is already registered as a donor") {
                navigate("/live-requests"); // 🔄 Auto-redirect
            } else {
                setError(error.response?.data?.message || "Failed to register as donor. Please try again.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Donate Blood</h2>
            {error && <p style={styles.error}>{error}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
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
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required style={styles.input} />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required style={styles.input} />
                <button type="submit" style={styles.button}>Register as Donor</button>
            </form>
        </div>
    );
};

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

export default DonateBlood;

