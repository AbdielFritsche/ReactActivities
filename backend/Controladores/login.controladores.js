import {sqlConnect,sql} from "../Utils/sql.js"
import { securePassword, verifyPassword } from "../Hashing/hashing.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const { salt, finalHash } = securePassword(password);

        const pool = await sqlConnect();
        await pool
            .request()
            .input("username", sql.VarChar, username)
            .input("hash", sql.VarChar, finalHash)
            .input("salt", sql.VarChar, salt)
            .query("INSERT INTO Users (username, hash, salt) VALUES (@username, @hash, @salt)");

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ isLogin: false, message: "Username and password are required" });
        }

        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, username)
            .query("SELECT hash, salt FROM Users WHERE username=@username");


        if (data.recordset.length === 0) {
            return res.status(404).json({ isLogin: false, message: "User not found" });
        }

        const { hash: storedHash, salt } = data.recordset[0];


        const isLogin = verifyPassword(password, salt, storedHash);

        if (isLogin) {
            const token = jwt.sign({sub:data.recordset.userid},process.env.JWT,{expiresIn:'2h'});

            res.status(200).json({ isLogin: true, message: "Login successful",token: token });
        } else {
            res.status(401).json({ isLogin: false, message: "Incorrect password" });
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ isLogin: false, message: "Server error" });
    }
};
