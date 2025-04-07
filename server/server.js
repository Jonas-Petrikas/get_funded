import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import md5 from 'md5';
import cookieParser from 'cookie-parser';
import { v4 } from 'uuid';
import fs from 'fs';

const app = express();
const port = 3333;
const frontURL = 'http://localhost:5173';
const serverUrl = `http://localhost:${port}/`;

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));



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


const error400 = (res, customCode = 0) => res.status(400).json({
    msg: { type: 'error', text: 'Invalid request. Code: ' + customCode }
});
const error401 = (res, message) => res.status(401).json({
    msg: { type: 'error', text: message }
});
const error500 = (res, err) => res.status(500).json(err);

//Helper
const saveImageAsFile = imageBase64String => {

    if (!imageBase64String) {
        return null;
    }

    let type, image;

    if (imageBase64String.indexOf('data:image/png;base64,') === 0) {
        type = 'png';
        image = Buffer.from(imageBase64String.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else if (imageBase64String.indexOf('data:image/jpeg;base64,') === 0) {
        type = 'jpg';
        image = Buffer.from(imageBase64String.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    } else {
        error400(res, 'Bad image format 1255');
        return;
    }

    const fileName = md5(v4()) + '.' + type;

    fs.writeFileSync('public/uploads/' + fileName, image);

    return fileName;

}






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
    });
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
    SELECT id, title, content, image, amount_goal, amount_collected, status
    FROM projects
    WHERE status = 'approved' OR status = 'done'
    ORDER BY status, updated_at DESC


`;

    con.query(sql, (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,
            db: result
        });
    });
});

app.get('/projects/all', (req, res) => {
    const sql = 'SELECT * FROM projects';

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
    SELECT d.id, d.amount, d.donated_at, d.custom_name, d.project_id, u.name, p.title, p.amount_goal, p.amount_collected
    FROM donations AS d
    LEFT JOIN users AS u
    ON u.id = d.user_id
    INNER JOIN projects AS p
    ON p.id = d.project_id
    ORDER BY d.donated_at DESC
    LIMIT ?
`;

    con.query(sql, [10], (err, result) => {
        if (err) return error500(res, err);
        res.json({
            success: true,
            db: result
        });
    });
});

//MAKE DONATION
app.post('/make-donation/:pid', (req, res) => {
    const pid = req.params.pid;
    const userID = req.user.id === 0 ? null : req.user.id;

    const { amount, donor } = req.body;
    const donated_at = new Date();
    console.log('pid', pid, 'amount: ', amount, 'donor:', donor);


    const sql = `
    INSERT INTO donations
    (project_id, amount, donated_at, user_id, custom_name)
    VALUES (?, ?, ?, ?, ?)
    `

    console.log(donated_at);

    con.query(sql, [pid, amount, donated_at, userID, donor], (err) => {
        if (err) return error500(res, err);

        const sql2 = `
        UPDATE projects
        SET amount_collected = amount_collected + ?
        WHERE id = ?
        `
        con.query(sql2, [amount, pid], (err) => {
            const sql3 = `
            UPDATE projects
            SET status = ?
            WHERE amount_collected >= amount_goal
            `;
            con.query(sql3, ['done'], (err) => {
                res.status(200).json({
                    success: true,
                    message: 'Successfully donated',
                })
            })
        })
    });

})


//PROJECT
let pid = 0;
app.get('/project/:pid', (req, res) => {
    pid = req.params.pid;

    const sql = `
    SELECT p.id, p.title, p.content, p.image, p.amount_goal, p.amount_collected, p.created_at, p.status, u.name as user_name
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
});

app.get('/project/:pid/donations/:donamount', (req, res) => {
    pid = req.params.pid;
    const donationsAmount = req.params.donamount;

    const sqlDonations = `
    SELECT d.id, d.amount, d.donated_at, d.custom_name, u.name
    FROM donations AS d
    LEFT JOIN users AS u
    ON u.id = d.user_id
    WHERE d.project_id = ?
    ORDER BY d.donated_at DESC
    LIMIT ?
        `

    con.query(sqlDonations, [pid, parseInt(donationsAmount)], (err, result) => {
        if (err) return error500(res, err);

        res.json({
            success: true,
            donations: result,
        });
    });
});

app.post('/project/new', (req, res) => {
    if (!req.user.role || req.user.role === 'guest') {
        error401(res, 'Please login first.');
        return;
    }
    const newProject = req.body;



    const title = newProject.title;
    const content = newProject.content;
    const user_id = req.user.id;
    const image = frontURL + '/uploads/' + saveImageAsFile(req.body.image.src);
    const amount_goal = newProject.amountGoal;
    const amount_collected = 0;
    const created_at = new Date();
    const updated_at = new Date();
    const status = req.user.role === 'user' ? 'to_review' : 'approved';


    const sql = `
    INSERT INTO projects
    (title, content, user_id, image, amount_goal, amount_collected, created_at, updated_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    con.query(sql, [title, content, user_id, image, amount_goal, amount_collected, created_at, updated_at, status], (err, result) => {
        if (err) return error500(res, err);
        res.status(200).json({
            success: true,
            message: 'Project successfully created',
            result: result
        })
    })
})

//BACK-office
app.post('/admin/useAdminChange', (req, res) => {
    if (!req.user.role || req.user.role !== 'admin') {
        error401(res, 'Please login as ADMIN first.');
        return;
    }

    const projects = req.body;

    //check if there's anything to do

    if (!projects || (projects.changes.length === 0 && projects.delete.length === 0)) {
        return res.status(400).json({
            success: false,
            message: 'No project data provided'
        });
    }
    //check if there's anything to delete

    if (projects.delete && projects.delete.length > 0) {
        const sql1 = `
        DELETE FROM projects
        WHERE id IN (?)
        `
        con.query(sql1, [projects.delete], (err) => {
            if (err) return error500(res, err);
            console.log('Deleted projects:', projects.delete);

            //check if there's anything to change after deletion

            if (projects.changes && projects.changes.length > 0) {
                const updatePromises = projects.projects.map(project => {
                    return new Promise((resolve, reject) => {
                        const sql2 = `
                    UPDATE projects
                    SET status = ?
                    WHERE id = ?
                `;

                        con.query(sql2, [project.status, project.id], (err, result) => {
                            console.log('Deleted projects:', projects.change);
                            if (err) reject(err);
                            else resolve(result);

                        });
                    });
                });

                // Wait for all updates to complete
                Promise.all(updatePromises)
                    .then(() => {
                        res.status(200).json({
                            success: true,
                            message: 'Projects successfully changed'
                        });
                    })
                    .catch(err => error500(res, err));
            } else {
                // No changes to make
                return res.status(200).json({
                    success: true,
                    message: 'No changes required'
                });
            }
        });

    } else {
        //if there's nothing to delete check if there's anything to change
        if (projects.changes && projects.changes.length > 0) {
            const updatePromises = projects.projects.map(project => {
                return new Promise((resolve, reject) => {
                    const sql2 = `
                UPDATE projects
                SET status = ?
                WHERE id = ?
            `;

                    con.query(sql2, [project.status, project.id], (err, result) => {
                        console.log('projects to Change:', projects.changes, project);
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
            });

            // Wait for all updates to complete
            Promise.all(updatePromises)
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'Projects successfully changed'
                    });
                })
                .catch(err => error500(res, err));
        } else {
            // No changes to make
            return res.status(200).json({
                success: true,
                message: 'No changes required'
            });

        }
    }
});




//Login
app.post('/register', (req, res) => {
    const regData = req.body;

    const sql = `
    INSERT INTO users
    (name, password, email, role)
    VALUES (?,?,?,?)
    `
    con.query(sql, [regData.name, md5(regData.password), regData.email, regData.role], (err) => {
        if (err) return error500(res, err);

        console.log(regData);
    });
});








// Start server


app.listen(port, () => {
    console.log(`Serveris pasiruošęs ir laukia ant ${port} porto!`);
});