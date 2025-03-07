import itemModel from "./item.model.js";  

export const getItems = async (req, res) => {
    try {  
       const items = await itemModel.find();
       res.json(items);
    } catch (error) {
        console.error("Algo salió mal", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

export const getItem = async (req, res) => {
    try { 
        const item = await itemModel.findById(req.params.id);
        res.json(item);
    } catch (error) {
        console.error("Algo salió mal", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

export const postItem = async (req, res) => {
    try { 
        const item = new itemModel(req.body); 
        await item.save();  
        res.json(item);
    } catch (error) {
        console.error("Error en la operación de inserción:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    } 
};

export const putItem = async (req, res) => {
    try { 
        const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(item);
    } catch (error) {
        console.error("Algo salió mal", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try { 
        await itemModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: "Ítem eliminado" });
    } catch (error) {
        console.error("Algo salió mal", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
};
