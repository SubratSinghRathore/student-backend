const Router = require("express");
const router = Router();
const { login, register } = require("./mongo.js");
router.use(Router.urlencoded({ extended: true }));
router.use(Router.json());


// router.post('/login', async (req, res) => {
//     const mail = req.body.email;
//     const password = req.body.pass;
//     console.log(mail)
//     try {
//         const Login = await register.findOne({
//             email
//         });
//         if (Login == null) {
//             res.status(400).send("invalid credentials");
//         }
//         else if (mail == Login.email && Login.pass == password) {
            
//             res.status(200).send(`<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Logged In</title>
// </head>
// <body style="font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f4f4f4;">
//     <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: inline-block;">
//         <h2>Welcome ${login.name}</h2>
//         <p></p>
//         <a href="https://student-learning-platform-1uoa.vercel.app/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: white; background: #007BFF; text-decoration: none; border-radius: 5px;">Go to Login</a>
//     </div>
// </body>
// </html>`)
//         }
//         else {
//             res.send("Something Went Wrong!")
//         }
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });
router.get('/login', async (req, res) => {
    const email = req.query.email;
    const password = req.query.pass;
    console.log(email);

    try {
        const user = await register.findOne({ email });
        console.log(user);

        if (user == null) {
            return res.status(400).send("Invalid credentials");
        }

        if (user.pass === password) { // Use bcrypt.compareSync(password, user.pass) if hashed passwords are used
            
            return res.status(200).json({username: user.name});
        } else {
            return res.status(400).send("Invalid email or password");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});


router.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;

    if (!name) {
        res.status(400).send("Invalid Credentials");
    }
    else if (!email) {
        res.status(400).send("Invalid Credentials")
    }
    else if (!pass) {
        res.status(400).send("Invalid Credentials")
    }
    else {
        try {
            const new_user = await register.create({
                name,
                email,
                pass
            });
            new_user.save();
            res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
</head>
<body style="font-family: Arial, sans-serif; text-align: center; margin: 50px; background-color: #f4f4f4;">
    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: inline-block;">
        <h2>User Created Successfully!</h2>
        <p>Please log in again with your credentials.</p>
        <a href="https://student-learning-platform-1uoa.vercel.app/" style="display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; color: white; background: #007BFF; text-decoration: none; border-radius: 5px;">Go to Login</a>
    </div>
</body>
</html>
`);
        }
        catch (error) {
            res.status(400).redirect("https://student-learning-platform-1uoa.vercel.app/");
        }
    }
})


module.exports = router;