import {sqlConnect,sql} from "../Utils/sql.js"


export const getItems = async (req,res) => {
    try{  
        const pool = await sqlConnect();
        const data = await pool.request().query("SELECT * FROM Items")
        res.json(data);

    }
    catch(error)
    {
        console.log("Algo salio mal",error)
    }
};


export const getItem = async (req, res) => {
    try{ 
        const pool = await sqlConnect();
    
        const data = await pool.request()
            .input("item_id", sql.Int, req.params.item_id)
            .query(" SELECT * FROM Items WHERE item_id = @item_id");

        res.json(data.recordset);
    }
    catch(error)
    {
        console.log("Algo salio mal",error)
    }
};

export const postItem = async (req, res) => {
    try { 
        console.log(req.body); 
        const pool = await sqlConnect();
        const { name, value } = req.body;

        if (!name || value == null) { 
          return res.status(400).json({ error: "Missing name or value" });
        }

        const data = await pool.request()
            .input("name", sql.VarChar, req.body.name)
            .input("value", sql.Int, req.body.value) 
            .query("INSERT INTO Items (name, value) OUTPUT INSERTED.* VALUES (@name, @value)");

        console.log(data);
        res.status(200).json(data.recordset[0]);

    } catch (error) {
        console.error("Error en la operación de inserción:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    } 
};


export const putItem = async (req, res) => {
    try { 
        const pool = await sqlConnect();
        const data = await pool.request()
            .input("item_id", sql.Int, req.body.item_id)
            .input("name", sql.VarChar, req.body.name)
            .input("value", sql.Int, req.body.value)
            .query("UPDATE Items SET name=@name, value=@value WHERE item_id=@item_id"); 

        console.log(data);
        res.status(200).json({ operation: true });
    } catch (error) {
        console.log("Algo salió mal", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deleteItem = async (req, res) => {
    try { 
        const pool = await sqlConnect();
        const data = await pool.request()
            .input("id", sql.Int, req.params.item_id) 
            .query("DELETE FROM Items WHERE item_id=@id"); 

        console.log(data);
        res.status(200).json({ operation: true });
    } catch (error) {
        console.log("Algo salió mal", error);
        res.status(500).json({ error: "Server error" });
    }
};