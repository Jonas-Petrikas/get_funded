import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const port = 3333;
const frontURL = 'http://localhost:5173';
const serverUrl = `http://localhost:${port}/`;

app.use(cookieParser());

app.use(cors(
    {
        origin: frontURL,
        credentials: true
    }
));

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'get_funded'
});


con.connect(err => {
    if (err) {
        console.log('Klaida prisijungiant prie DB');
        return;
    }
    console.log('Prisijungimas prie DB buvo sėkmingas');
});

const error500 = (res, err) => res.status(500).json(err);

//auth middleware
// app.use((req, res, next) => {
//     const token = req.cookies['r2-token'] || 'no-token';
//     const sql = 'SELECT * FROM users WHERE session_id = ?'; // TODO pataisyt
//     con.query(sql, [token], (err, result) => {
//         if (err) {
//             res.status(500).send('Klaida bandant prisijungti');
//             return;
//         }
//         if (result.length === 0) {
//             req.user = {
//                 role: 'guest',
//                 name: 'Guest',
//                 id: 0
//             }
//         } else {
//             req.user = {
//                 role: result[0].role,
//                 name: result[0].name,
//                 id: result[0].id
//             }
//         }
//         next();
//     });
// });


app.post('/login', (req, res) => {
    const { name, password } = req.body;
    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    con.query(sql, [name, md5(password)], (err, result) => {
        if (err) {
            res.status(500).send('Klaida bandant prisijungti');
            return;
        }
        if (result.length === 0) {
            res.status(401).send('Neteisingi prisijungimo duomenys');
            return;
        }
        const token = uuid.v4();
        const updateSql = 'UPDATE users SET session_id = ? WHERE name = ?';
        con.query(updateSql, [token, name], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            res.cookie('r2-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                success: true,
                message: 'Prisijungimas sėkmingas',
                user: {
                    role: result[0].role,
                    name: result[0].name,
                    id: result[0].id
                }
            });
        });
    });
});


//TODO paimti is middleware
app.get('/get-user', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r2-token'] || 'no-token';
        const sql = 'SELECT * FROM users WHERE session_id = ?';
        con.query(sql, [token], (err, result) => {
            if (err) {
                res.status(500).send('Klaida bandant prisijungti');
                return;
            }
            if (result.length === 0) {
                res.status(200).json({
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                });
                return;
            }
            res.status(200).json({
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            });
        });
    }, 1000);
});


app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['r2-token'] || 'no-token';
        console.log('logout', token);
        const sql = 'UPDATE users SET session_id = ? WHERE session_id = ?';
        con.query(sql, [null, token], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant atsijungti');
                return;
            }
            res.clearCookie('r2-token');
            res.status(200).json({
                success: true,
                message: 'Atsijungimas sėkmingas',
                user: {
                    role: 'guest',
                    name: 'Guest',
                    id: 0
                }
            });
        });
    }, 2000);
});




//PROJECTS
app.get('/projects/confirmed-list', (req, res) => {
    const sql = `
    SELECT id, title, content, image, amount_goal, amount_collected
    FROM projects
        WHERE status = 'approved'

`;

    con.query(sql, (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,
            db: result
        });
    });
});

//DONATIONS
app.get('/donations/home-show-latest', (req, res) => {
    const sql = `
    SELECT d.id, d.amount, d.donated_at, d.project_id, u.name, p.title, p.amount_goal, p.amount_collected
    FROM donations AS d
    INNER JOIN users AS u
    ON u.id = d.user_id
    INNER JOIN projects AS p
    ON p.id = d.project_id
    ORDER BY d.donated_at DESC
    LIMIT ?

  

`;
    // 




    con.query(sql, [10], (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,
            db: result
        });
    });
});





// Start server


app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});