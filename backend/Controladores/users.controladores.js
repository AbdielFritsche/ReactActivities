import { sql, sqlConnect } from "../Utils/sql";


export const getUsers = async (req,res) => {
    try{
        const pool = await sqlConnect();
        const data = await pool.request().query("SELECT usermane FROM Users")
        res.json(data);
    }
    catch(error)
    {
        console.log("algo salio mal")
    }
};

export const getUser = async(req,res) => {
    try{
        const pool = await sqlConnect();

        const data = await pool.request()
            .input("user_id", sql.Int, req.params.user_id)
            .query("SELECT username FROM Users WHERE user_id = @user_id")
        
        
        console.log(data.recordset);
        res.json(data.recordset)
    }
    catch(error)
    {
        console.log("Algo salio mal",error)
    }    
};


export const deleteUser = async (req, res) => {
    try { 
        const pool = await sqlConnect();
        const data = await pool.request()
            .input("user_id", sql.Int, req.params.user_id) 
            .query("DELETE FROM Users WHERE user_id=@user_id"); 

        console.log(data);
        res.status(200).json({ operation: true });
    } catch (error) {
        console.log("Algo salió mal", error);
        res.status(500).json({ error: "Server error" });
    }
};
