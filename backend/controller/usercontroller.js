const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config({ path: path.join(__dirname, '..', 'env', '.env') });
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

const SALT_ROUNDS = 10


const login = async(req, res) => {
    try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id ,role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Server error' });
  }
}

const register = async(req, res) => {
    try {
    const { name, email, password,role  } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ name, email, password: hashed, role: role || "user" });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({
      message: 'User registered',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'Server error' });
  }
}

exports.login = login;
exports.register = register;