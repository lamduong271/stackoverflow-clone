import User from "../models/user";

var jsonWebToken = require("jsonwebtoken");

const verifyToken = (
  req: { headers: { [x: string]: Request }; user: typeof User },
  res: { sendStatus: (arg0: number) => Response },
  next: () => void
) => {
  const token = req.headers["x-access-token"];
  if (token == null) return res.sendStatus(401);
  jsonWebToken.verify(
    token,
    process.env.JWT_SECRET,
    (err: Error, user: typeof User) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    }
  );
};

export default verifyToken;
