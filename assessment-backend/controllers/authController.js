const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

// Load users from file or initialize empty array
const loadUsers = () => {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
};

// Save users to file
const saveUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

let users = loadUsers();

exports.signup = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check if user already exists
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const newUser = { 
      id: Date.now().toString(),
      username, 
      password: hashed,
      email: email || "",
      name: name || "",
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const user = users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || "secret", 
      { expiresIn: "1h" }
    );
    
    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
