import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';

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

//auth middleware - checking everytime browser makes request to server who the user is, using the token in cookies?
app.use((req, res, next) => {
    const token = req.cookies['get-funded-token'] || 'no-token';
    const sql = `
        SELECT u.id, u.role, u.name
        FROM sessions AS s
        INNER JOIN users AS u
        ON s.user_id = u.id
        WHERE token = ?
    `;
    con.query(sql, [token], (err, result) => {

        console.log(token)
        if (err) return error500(res, err);
        if (result.length === 0) {
            req.user = {
                role: 'guest',
                name: 'Guest',
                id: 0
            }
        } else {
            req.user = {
                role: result[0].role,
                name: result[0].name,
                id: result[0].id
            }
        }
        next();
        console.log(req.user);
    });

    console.log(token);
    console.log(req.user);

});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = `
    SELECT * FROM users 
    WHERE name = ? AND password = ?
    `;
    con.query(sql, [username, md5(password)], (err, result) => {
        if (err) return error500(res, err);
        if (result.length === 0) {
            res.status(401).send({
                msg: { type: 'error', text: 'Invalid user name or password' }
            });
            return;
        }

        const token = md5(v4());
        const userId = result[0].id;
        let time = new Date();
        time = time.setMinutes(time.getMinutes() + (60 * 24));
        time = new Date(time);

        const insertSql = `
            INSERT INTO sessions
            (user_id, token, valid_until)
            VALUES (?, ?, ?)
        `;
        con.query(insertSql, [userId, token, time], (err) => {
            if (err) return error500(res, err);
            res.cookie('get-funded-token', token, { httpOnly: true, SameSite: 'none' });
            res.status(200).json({
                msg: { type: 'success', text: `Hello, ${result[0].name}! How are you?` },
                user: {
                    role: result[0].role,
                    name: result[0].name,
                    id: result[0].id
                }
            });
        });
    });
});

app.get('/auth-user', (req, res) => { //Gets user Data extracted in middleware and JSON parses it, then returns it back
    setTimeout(_ => {
        res.json(req.user);
    }, 1000);
});


app.post('/logout', (req, res) => {
    setTimeout(_ => {
        const token = req.cookies['get-funded-token'] || 'no-token';
        console.log('logout', token);
        const sql = 'DELETE FROM sessions WHERE token = ?';
        con.query(sql, [token], (err) => {
            if (err) {
                res.status(500).send('Klaida bandant atsijungti');
                return;
            }
            res.clearCookie('get-funded-token');
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
//PROJECT
let pid = 0;
app.get('/project/:pid', (req, res) => {
    pid = req.params.pid;

    const sql = `
    SELECT p.id, p.title, p.content, p.image, p.amount_goal, p.amount_collected, p.created_at, u.name as user_name
    FROM projects as p
    INNER JOIN users as u
    ON p.user_id = u.id
    WHERE p.id = ?
    `;

    con.query(sql, [pid], (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,
            project: result
        });
    });

    console.log(pid);
});

app.get('/project/:pid/donations/:donamount', (req, res) => {
    pid = req.params.pid;
    const donationsAmount = req.params.donamount;

    const sqlDonations = `
SELECT d.id, d.amount, d.donated_at, u.name
FROM donations AS d
INNER JOIN users AS u
ON u.id = d.user_id
WHERE d.project_id = ?
ORDER BY d.donated_at DESC
LIMIT ?
    `

    con.query(sqlDonations, [pid, parseInt(donationsAmount)], (err, result) => {
        if (err) return error500(res, err);
        console.log(result);
        res.json({
            success: true,
            donations: result,
        });
    });
});






// Start server


app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});