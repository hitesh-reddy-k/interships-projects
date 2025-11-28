const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    req.user = {
      id: payload.id,
      role: payload.role     
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access Denied — Admins Only" });

  next();
};

module.exports = { auth, adminOnly };
