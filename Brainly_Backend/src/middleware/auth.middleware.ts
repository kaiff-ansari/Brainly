import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {


    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: "JWT secret is not defined" });
    }

    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    const token = authorization.startsWith("Bearer ")
        ? authorization.slice(7)
        : authorization;

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (typeof decoded === "string" || typeof decoded.id !== "string") {
            return res.status(401).json({ message: "Invalid authorization token" });
        }

        req.userId = decoded.id;
        return next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired authorization token" });
    }

}
