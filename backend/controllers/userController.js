import User from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Invalid User Data' });
    }
};
