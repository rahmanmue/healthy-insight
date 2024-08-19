import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      req.role = decoded.role;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.sendStatus(403);
  }
  next();
};
