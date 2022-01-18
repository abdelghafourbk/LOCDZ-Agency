if (!process.env.PORT) require("dotenv").config();
const express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    //routes should be required here later
     path = require('path'),
     bodyParser = require('body-parser'),
     fileUpload = require('express-fileupload'),
     session = require('express-session'),
     flash = require('connect-flash'),
     jwt = require('jsonwebtoken'),
     morgan = require('morgan'),
     vehiculesRouter = require('./routes/vehicules'),
     categoryRouter = require('./routes/category'), 
     vehiculeRouter = require('./routes/vehicule'), 
     reservationRouter = require('./routes/reservation'),
     reservationsRouter = require('./routes/reservations'),
     contractsRouter = require('./routes/contracts'),
     contractRouter = require('./routes/contract'),
     facturesRouter = require('./routes/factures'),
     factureRouter = require('./routes/facture'),
     clientsRouter = require('./routes/clients'),
     clientRouter = require('./routes/client'),
     employeRouter = require('./routes/employe'),
     authRouter = require('./routes/auth'),
     {homepage, searchVehicule}= require('./middlewares/vehicule'),
      Employe = require("./models/employe"),
    port= process.env.PORT||3000;

   
app.use(morgan('dev'));
app.use(cookieParser());   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})) 
app.use(session({
    secret: 'CarRentalSecretSession',
    saveUninitialized: true,
    resave: true
}))
app.use(flash());
app.use(fileUpload());

app.set('view engine', 'ejs');

app.use(async function (req, res, next) {
    res.locals.title = "Home";
    if (req.cookies.token) {
        const token = req.cookies.token;
        try {
            let payload = jwt.verify(token, process.env.SECRET_KEY);
            req.employe = await Employe.findById(payload.id).select({ password: 0 });
        } catch (e) {
            switch (e.constructor) {
                case jwt.TokenExpiredError:
                    req.AuthError = "Your token has been expired";
                case jwt.JsonWebTokenError:
                    req.AuthError = "Your token is unvalid";
            }
        }
    } else req.AuthError = "You don't have the authorization";
    res.locals.employe = req.employe || null;
    return next();
});

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/assets',express.static(path.join(__dirname,'public/assets')));


//home route
app.route('/').get(homepage);
app.route('/search').post(searchVehicule);
app.use('/', authRouter);
app.use('/vehicules',vehiculesRouter);
app.use('/categories',categoryRouter);
app.use('/vehicule',vehiculeRouter);
app.use('/reservations',reservationsRouter);
app.use('/reservation',reservationRouter);
app.use('/clients',clientsRouter);
app.use('/Rclient',clientRouter);
app.use('/contracts', contractsRouter);
app.use('/contract', contractRouter);
app.use('/factures', facturesRouter);
app.use('/facture', factureRouter);
app.use('/employe', employeRouter);
app.use('/facture', factureRouter);
app.use('/employe', employeRouter);



app.get('/employes', (req, res) => {
    res.render('employes',{title:'Employes'})
});

app.use('*' , function (req,res, next) {
    res.json({error: "This route does not exist"});
})
// Errors handler function
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status).json({ error: err.message });
});

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'Car_Rental',
})
.then((con)=>{
    console.log('Database is connected');
    app.listen(port, () => {
        console.log(`Server started on ${port}`);
    });
})

.catch((err)=>{
    console.error(err);
});
