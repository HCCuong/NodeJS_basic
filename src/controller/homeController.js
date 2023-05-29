import pool from '../configs/connectDB';


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

module.exports = {
    getHomepage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    postUpdateUser
} 