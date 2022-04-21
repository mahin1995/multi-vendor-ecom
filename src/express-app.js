
const { customer, products, shopping } = require('./api');
const HandleErrors = require('./utils/error-handler')
var {home_view,products_view,users_view} = require('./routes');
module.exports = async (app) => {
   

// views
app.get("/session",(req,res)=>{
    req.session.isauth=true
    console.log(req.session)
    console.log(req.session.id)
res.send("hello session text")
})
app.use('/', home_view);
app.use('/',users_view );
app.use('/product-views',products_view );


    //api
    customer(app);
    products(app);
    shopping(app);

    // error handling
    app.use(HandleErrors);
    
}