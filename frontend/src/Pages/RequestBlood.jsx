
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequestBlood = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bloodType: "",
        hospital: "",
        location: "",
        urgency: "",
        age: "",
        gender: "",
        contactNumber: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        } else {
            setError("You must be logged in to request blood.");
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

        if (!formData.bloodType || !formData.hospital || !formData.location ||
            !formData.urgency || !formData.age || !formData.gender || !formData.contactNumber) {
            setError("All fields are required!");
            return;
        }

        try {
            // **Step 1:** Register or Retrieve Patient (`/api/v3/create`)
            const patientResponse = await axios.post(
                "/api/v3/create",
                formData,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );

            console.log("Patient Response:", patientResponse.data); // ✅ Debugging

            if (patientResponse.status === 201) {
                const patientId = patientResponse.data.patient?._id; // ✅ Extracting correct ID

                if (!patientId) {
                    setError("Error: Patient ID is missing.");
                    return;
                }

                // **Step 2:** Create Blood Request (`/api/v4/create`)
                const bloodRequestResponse = await axios.post(
                    "/api/v4/create",
                    { patientId },
                    {
                        headers: { 
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        withCredentials: true
                    }
                );

                if (bloodRequestResponse.status === 201) {
                    setSuccessMessage("Blood request created successfully!");
                    setTimeout(() => navigate(`/patient-request/${patientId}`), 2000);
 // Redirect after 2 sec
                }
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Failed to process request. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Register as a Patient</h2>
            
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

                <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital Name" required style={styles.input} />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required style={styles.input} />
                
                <select name="urgency" value={formData.urgency} onChange={handleChange} required style={styles.input}>
                    <option value="">Select Urgency</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required style={styles.input} />
                
                <select name="gender" value={formData.gender} onChange={handleChange} required style={styles.input}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required style={styles.input} />

                <button type="submit" style={styles.button}>Submit Request</button>
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

export default RequestBlood;

