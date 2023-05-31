import pool from '../configs/connectDB';
import multer from 'multer';
import path from 'path';

let getHomepage = async (req, res) => {

    const [rows, fields] = await pool.execute('SELECT * FROM `users` ');
    return res.render('index.ejs', { dataUser: rows, test: 'String test' });

}

let getDetailPage = async (req, res) => {
    let userId = req.params.userId;
    let user = await pool.execute('select * from `users` where `id` = ?', [userId]);
    return res.send(JSON.stringify(user[0]));
}

let createNewUser = async (req, res) => {
    //return res.send('Create new user');
    let { fname, lname, email, address } = req.body;
    await pool.execute('insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)', [fname, lname, email, address]);
    return res.redirect('/');
}


let deleteUser = async (req, res) => {
    //return res.send(`Delete user ${req.body.userId}`);
    let userId = req.body.userId;
    await pool.execute('delete from `users` where `id` = ?', [userId]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    //return res.send(`Edit user ${req.params.id}`);
    let userId = req.params.id;
    const [rows, fields] = await pool.execute('SELECT * FROM `users` where id = ?', [userId]);
    //console.log(rows);
    //return res.send(JSON.stringify(user));
    return res.render('update.ejs', { dataUser: rows[0] });
}

let postUpdateUser = async (req, res) => {
    let { fname, lname, email, address, id } = req.body;
    await pool.execute('update `users` set firstName = ?, lastName = ?, email = ?, address = ? where `id` = ?', [fname, lname, email, address, id]);
    return res.redirect('/');
}

let getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
}


const upload = multer().single('file');

let handleUploadFile = async (req, res) => {

    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload-file">Upload another image</a>`);
    });
}

let uploadMultipleFile = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload-file">Upload more images</a>';
    res.send(result);
}

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser,
    getUploadFilePage,
    handleUploadFile,
    uploadMultipleFile
} 