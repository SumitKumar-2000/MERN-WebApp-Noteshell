const Note = require('../models/noteModal');

// getting notes data
const getnotes = async (req,res) =>{
    const notes = await Note.find({user:req.user._id});
    if(notes){
        res.status(201).send(notes)
    }else{
        res.status(404).send("notes not found")
    }
}

// creating notes 
const createnote = async(req,res) =>{
    const {title, content, category} = req.body;

    const note = await Note.create({
        title : title,
        content : content,
        category : category,
        user : req.user._id     // req.user is comming from middleware
    })

    if(note){
        try {
            res.status(202).send({
                title: note.title,
                content: note.content,
                category: note.category,
                user : note.user
              })
        } catch (error) {
            res.status(401).send("error :",error)
        }
    }
}

// getting single note
const getNoteById = async (req,res) =>{
    const note = await Note.findById(req.params._id);
    if(note){
        res.status(202).json(note);
    } else{
        res.status(401).send("note not found")
    }
}

// updating single  note
const updatenote = async (req,res) => {

    const {title,content,category} = req.body;

    const note = await Note.findById(req.params._id)

    if(note.user.toString() !== req.user._id.toString()){
        res.status(404).send("request not be made !")
    }

    if(note){
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save()
        res.status(202).send(updatedNote);
    }else{
        res.status(404).send("note not found !")
    }
}

// delete note
const deletenote = async (req,res) => {
    
    const note = await Note.findById(req.params._id)
    
    if(note.user.toString() !== req.user._id.toString()){
        res.status(404).send("you can't perform the action")
    }

    if(note){
        await note.remove();
        res.status(202).send("Note removed successfully")
    }else{
        res.status(404).send("note not found !");
    }
}

module.exports = {getnotes,createnote,getNoteById,updatenote,deletenote}