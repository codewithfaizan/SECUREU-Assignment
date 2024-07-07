import express from "express";
import notesModel from "../../models/notes/Notes.js";
import authMiddleware from "../../middlewares/isAuthenticated.js";
const router = express();

router.use(authMiddleware);
/*
METHOD : POST
PRIVATE
API Endpoint : /api/notes
ADD A NOTE
*/
router.post('/notes', async (req, res) => {
    try {
        const noteData = new notesModel({...req.body, createdBy : req.session.userId});
        // noteData.createdBy = req.payload.user_id;
        console.log(noteData);
        // const saveNote = await noteData.save();
        res.status(201).json({ success: true, message: "Note Created Successfully" });

    } catch (error) {
        console.error(error);
        res.json(500).json({ success: false, message: "Internal Server Error" });
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes
GET ALL NOTES
*/
router.get('/notes',async (req, res) => {
    try {
        const notesData = await notesModel.find();
        res.status(200).json({ success: true, message: "All Notes Fetched", notesData });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes/:id
GET A NOTE BY ID
*/

router.get("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const noteData = await notesModel.findById(id)
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };
        res.status(200).json({ success: true, message: "Note Data", noteData });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes/:id
DELETE A NOTE
*/
router.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const noteData = await notesModel.findById(id)
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };
        res.status(200).json({ success: true, message: "Note Data", noteData });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: "Internal Server Error" })
    }
});

export default router;