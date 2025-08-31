const jwt = require("jsonwebtoken");
const SECRET = "mysecret";

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET); 
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({
      message: err.name === "TokenExpiredError"
        ? "Unauthorized: Token has expired"
        : "Unauthorized: Invalid token",
    });
  }
};
//delay mechanism
exports.delayMiddleware = (req, res, next) => {
  const delay = Number(req.query.delay || 0)
  if (!delay) return next();
  setTimeout(next, Math.min(delay, 5000))
}

exports.requireAdmin = (req, res, next) => {
  if (req.user?.role !== "Admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

exports.requireUser = (req, res, next) => {
  if (req.user?.role !== "General User") {
    return res.status(403).json({ message: "Forbidden: General Users only" });
  }
  next();
};
