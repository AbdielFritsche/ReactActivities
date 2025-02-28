import {sqlConnect,sql} from "../Utils/sql.js"

export const login = async (req, res) => {
    const pool = await sqlConnect();

    const data = await pool
        .request()
        .input("username", sql.Varchar, req.body.username)
        .query("select * from users where username=@username")

    let isLogin = data.recordset[0].password === req.body.password

    res.status(200).json({isLogin: isLogin});
};