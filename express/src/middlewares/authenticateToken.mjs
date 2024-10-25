import {verifyToken} from "../utils/jwtUtils.mjs";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send("No Token");
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Unauthorized Token");
  }
};