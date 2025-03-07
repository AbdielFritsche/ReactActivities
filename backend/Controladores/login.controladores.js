import {sqlConnect,sql} from "../Utils/sql.js"

export const login = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool
            .request()
            .input("username", sql.VarChar, req.body.username)
            .query("SELECT * FROM Users WHERE username=@username");

        if (data.recordset.length > 0) {
            const isLogin = data.recordset[0].password === req.body.password;
            if (isLogin) {
                res.status(200).json({ isLogin: true, user: data.recordset[0] });
            } else {
                res.status(401).json({ isLogin: false, message: 'Incorrect password' });
            }
        } else {
            res.status(404).json({ isLogin: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Database connection or query error:', error);
        res.status(500).json({ isLogin: false, message: 'Server error' });
    }
};
