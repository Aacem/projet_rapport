const express = require("express");
const router = express.Router();

const Book = require("../models/book");
const Issue = require("../models/Issue");





router.post("/addBook", async (req, res) => {

   const { title,author,publisher,year,copies } = req.body ;
     console.log("req.body",req.body)
    if(req.body._id){
        const obj = await Issue.find({_id:req.body._id})
        await obj[0].save()
    }
    const book = await new Book({ title,author,publisher,year,copies})
    await book.save()

    // const book = new Book({
    //     title,author,publisher,year,copies
    // })
    // book.save().then(result => {
    //     res.status(201).json({
    //         message: "Done upload!",
            
    //     })
    // }).catch(err => {
    //     console.log(err),
    //         res.status(500).json({
    //             error: err
    //         });
    // })
 
})
router.get("/allBook", (req, res) => {
    Book.find().sort({ createdAt: -1 }).then(data => {
        res.status(200).json(
           data
        );
    });
});
   
router.post("/removeAbook" , async(req,res)=>{


   
    try {
       await Book.findOneAndDelete({ _id: req.body.bookId }) ;
      
       res.send("you successfully remove the Book")

    } catch (error) {
       console.log(error);
    }

  
});


router.post("/editABook", async (req, res) => {
    try {
      const { _id, title, author, publisher, year, copies } = req.body;
      const updatedBook = await Book.findByIdAndUpdate(
        _id,
        { title, author, publisher, year, copies },
        { new: true }
      );
  
      res.status(200).json(updatedBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update the book" });
    }
  });
  
  module.exports = router;