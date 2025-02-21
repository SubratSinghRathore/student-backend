const Router = require("express");
const router = Router();
const { login, register } = require("./mongo.js");
router.use(Router.urlencoded({ extended: true }));
router.use(Router.json());

router.get("/", (req, res) => {
    res.status(200).send("done")
})

router.post('/login', async (req, res) => {
    const mail = req.query.email;
    const password = req.query.pass;
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
            res.status(200).redirect("https://student-learning-platform-1uoa.vercel.app/");
        }
        catch (error) {
            res.status(400).redirect("https://student-learning-platform-1uoa.vercel.app/");
        }
    }
})


module.exports = router;