import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v4";

const UpdatePatientForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Blood request ID from URL
    const [formData, setFormData] = useState({
        bloodType: "",
        hospital: "",
        location: "",
        urgency: "",
        contactNumber: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setError("You must be logged in to update your details.");
            setLoading(false);
            return;
        }

        const fetchPatientDetails = async () => {
            try {
                // Step 1: Fetch blood request details to get patientId
                const bloodRequestRes = await axios.get(`${API_BASE_URL}/blood-request/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!bloodRequestRes.data.success) throw new Error("Blood request not found.");

                const patientId = bloodRequestRes.data.bloodRequest.patientId?._id;
                if (!patientId) throw new Error("Patient details not found.");

                // Step 2: Fetch patient details using patientId
                const patientRes = await axios.get(`http://localhost:3000/api/v3/details/${patientId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!patientRes.data.success) throw new Error("Patient details not available.");

                // Step 3: Set form data with patient details
                setFormData(patientRes.data.patient);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
    
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v3/update/${patientId}`,
                formData,
                {
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (response.data.success) {
                setSuccessMessage("Patient details updated successfully!");
                setTimeout(() => navigate(`/patient-request/${id}`), 2000); // Navigate to /request
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Update failed. Please try again.");
        }
    };
    

    if (loading) return <p>Loading...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Update Patient Details</h2>
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
                
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required style={styles.input} />

                <button type="submit" style={styles.button}>
                    Update Details
                </button>
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

export default UpdatePatientForm;
