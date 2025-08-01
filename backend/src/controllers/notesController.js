import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Erreur lors de la récupération des notes", error)
        res.status(500).json({message:"Erreur serveur!"})
    }
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note introuvable" });
        res.json(note);
    } catch (error) {
        console.error("Erreur lors de la récupération de la note", error)
        res.status(500).json({message:"Erreur serveur!"})
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        await newNote.save();
        res.status(201).json({ message: "Notes créées avec succès" })
    } catch (error) {
        console.error("Erreur lors de la création des notes", error)
        res.status(500).json({message:"Erreur serveur!"})
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content }, 
            {
                new:true
        }
    );
        if(!updatedNote) return res.status(404).json({ message: "Note introuvable" })
        res.status(200).json({ message: "Note modifiée avec succès!" })
    } catch (error) {
        console.error("Erreur lors de la modification des notes", error)
        res.status(500).json({message:"Erreur serveur!"})
    }
};

export async function deleteNote (req, res) {
    try {
       const deletedNote =  await Note.findByIdAndDelete(
            req.params.id,
        );
        if (!deletedNote) return res.status(404).json({ message: "Note introuvable" });
        res.status(200).json({ message: "Note supprimée avec succès!" })

    } catch (error) {
        console.error("Erreur lors de la suppression des notes", error)
        res.status(500).json({message:"Erreur serveur!"})
    }
}