import {sqlConnect,sql} from "../Utils/sql.js"


export const getItems = async (req,res) => {
    try{  
        const pool = await sqlConnect();
        const data = await pool.request().query("SELECT * FROM Items")
        console.log(data)
    }
    catch(error)
    {
        console.log("Algo salio mal",error)
    }
};


export const postItem = async (req, res) => {
    try { 
        const pool = await sqlConnect();
        const data = await pool.request()
            .input("name", sql.VarChar, req.body.name)
            .input("price", sql.Float, req.body.price)
            .query("insert into items (name, price) values (@name, @price)");

        res.status(200).json({operation:true});
    }
    catch(error)
    {
        console.log("Algo salio mal", error)
    }
    finally {
        await sql.close(); 
    }
};


export const getItem = async (req,res) => {
    try{  
        const pool = await sqlConnect();
        const data = await pool.rquest().query

        ("SELECT * FROM Items WHERE @myid = ")
        console.log(data)
    }
    catch(error)
    {
        console.log("Algo salio mal", error)
    }
    finally {
        await sql.close(); 
    }
};