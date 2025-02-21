const Router = require("express");
const router = Router();
const { login } = require("./mongo.js");
router.use(Router.urlencoded({ extended: true }));
router.use(Router.json());

router.get("/", (req, res) => {
    res.status(200).send("done")
})

router.post('/login', async (req, res) => {
    const mail = req.body.email;
    const password = req.body.pass;
    try {
        const Login = await login.findOne({
            db_mail,
            db_pass
        });
        if (Login == null) {
            res.status(400).send("invalid credentials");
        }
        else if (mail == Login.db_mail && Login.password == db_pass) {
            const link_url = Login.url;
            res.status(200).json({
                msg: "user created"
            });
        }
        else {
            res.send("Something Went Wrong!")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username) {
        res.status(400).send("Invalid Credentials");
    }
    else if (!password) {
        res.status(400).send("Invalid Credentials")
    }
    else {
        try {
            const new_user = await login.create({
                username,
                password
            });
            new_user.save();
            res.status(200).send("User Created Sucessfully Please Login With Your Credentials");
        }
        catch (error) {
            res.status(400).redirect("https://student-learning-platform-1uoa.vercel.app/");
        }
    }
})


module.exports = router;