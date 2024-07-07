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
        const noteData = new notesModel({ ...req.body, createdBy: req.session.userId });
        const saveNote = await noteData.save();
        res.status(201).json({ success: true, message: "Note Created Successfully", saveNote });

    } catch (error) {
        console.error(error);
        res.json(500).json({ success: false, message: error.message });
    }
});

/*
METHOD : GET
PRIVATE
API Endpoint : /api/notes
GET ALL NOTES
*/
router.get('/notes', async (req, res) => {
    try {
        console.log(req.session.userId)
        const notesData = await notesModel.find({ createdBy: req.session.userId });
        res.status(200).json({ success: true, message: "All Notes Fetched", notesData });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: error.message });
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
        const id = req.params.id;
        const noteData = await notesModel.findOne({ _id: id, createdBy: req.session.userId })
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };
        res.status(200).json({ success: true, message: "Note Data", noteData });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
});

/*
METHOD : DELETE 
PRIVATE
API Endpoint : /api/notes/:id
DELETE A NOTE
*/
router.delete("/notes/:id", async (req, res) => {
    try {
        const { id } = req.params
        const noteData = await notesModel.findOneAndDelete({ _id: id, createdBy: req.session.userId })
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Note Not Found" })
        };
        res.status(200).json({ success: true, message: "Note Deleted" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: error.message })
    }
});

/*
METHOD : DELETE 
PRIVATE
API Endpoint : /api/notes
DELETE All NOTE
*/
router.delete("/notes", async (req, res) => {
    try {

        const noteData = await notesModel.deleteMany({ createdBy: req.session.userId })
        if (!noteData) {
            return res.status(404).json({ success: false, error: "Empty" })
        };
        res.status(200).json({ success: true, message: "All Notes Deleted" });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, error: error.message })
    }
});


/*
METHOD : PUT
PRIVATE
API Endpoint : /api/notes/:id
UPDATE A NOTE BY ID
*/
router.put("/notes/:id", authMiddleware, async (req, res) => {
    try {
        const updatedNote = await notesModel.findOneAndUpdate({
            _id: req.params.id, createdBy: req.session.userId
        },req.body, { new: true });
        if (updatedNote) {
            res.status(201).json({ msg: 'Note Update Successfully' });
        } else {
            res.status(404).json({ msg: "Note not found" })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error: error.message });
    }
});
export default router;