const {Router} = require('express');
const router = Router();
const  fs = require('fs-extra');  
const  path = require('path');

const Book = require('../models/Book');


router.get("/", async (req, res) => {
    try {
      const books = await Book.find().sort("-_id");
      res.json(books);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  

  router.post('/', async (req, res) => {
    const {title, author, isbn}= req.body;
    const imagepath = '/uploads/' + req.file.filename;
    const newBook = new Book ({title, author, isbn, imagepath});
    await newBook.save();
    res.json({message: 'Book Saved'});
});

  
router.delete("/:id", async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      await fs.unlink(path.resolve("./backend/public/" + book.imagepath));
      res.json({ message: "Book Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  

module.exports = router;
