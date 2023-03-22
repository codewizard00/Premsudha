const db = require("../Database");
const catchAsyncError = require("../Middleware/catchAsyncError");
const { Cloudinary } = require("../Utils/Cloudinary");
const ErrorHandling = require("../Utils/ErrorHandling");
const Books = db.books;

exports.getAllBooks = catchAsyncError(async (req, res) => {
    const data = await Books.findAll();
    res.status(200).json({ message: data });
})

exports.getAllBooksType = catchAsyncError(async (req, res) => {
    const { book_type } = req.params;
    const data = await Books.findAll({where:{book_type}});
    res.status(200).json({ message: data });
})

exports.getBooks = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Books.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        res.status(200).json({ message: data });
    }
})

exports.deleteBook = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const data = await Books.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const data = await Books.destroy({ where: { id } });
        return res.status(200).json({ message: "Succesfully Deleted" });
    }
})


exports.updateBook = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { title,  writer, about, image_base64,pdf_64 , image_alt } = req.body;
    const data = await Competions.findOne({ where: { id } });
    if (!data) {
        return new ErrorHandling("Data Not Found", 404);
    } else {
        const image_64 = await Cloudinary(image_base64, image_alt);
        const data = await Competions.update({ title, place, timings, about, image: image_64.url,url:pdf_64 ,image_alt }, { where: { id } })
        return res.status(200).json({ message: "Succesfully Updated" });
    }
})


exports.createBook = catchAsyncError(async (req, res) => {
    const { title, book_image_64,image_alt, about, writer, book_pdf_base64,book_type,price } = req.body
    console.log("dsaj")
    const book_image = await Cloudinary(book_image_64, image_alt);
    let book;
    if(book_type==="eBook"){
        book = await Cloudinary(book_pdf_base64,image_alt+"_pdf");
    }
    const data = await Books.create({ title, image: book_image.url,url:book?.url, image_alt,about,writer,book_type ,price});
    return res.status(200).json({ message: "Succesfully Created" });
})
