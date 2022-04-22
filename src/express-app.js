
const { customer, products, shopping } = require('./api');
const HandleErrors = require('./utils/error-handler')
var {home_view,products_view,users_view} = require('./routes');
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false //true for live, false for sandbox


module.exports = async (app) => {
    app.get('/payment-gateway', (req, res) => {
        const txnId=req.query.txnId

        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: txnId, // use unique tran_id for each api call
            success_url: `${process.env.ROOT}/payment-success`,
            fail_url: `${process.env.ROOT}/payment-fail`,
            cancel_url: `${process.env.ROOT}/payment-cancel`,
            ipn_url: `${process.env.ROOT}/payment-ipn`,
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01620182636',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
         
            
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.redirect(GatewayPageURL)
            console.log('Redirecting to: ', GatewayPageURL)
        });
    })
// views
app.post("/payment-success",async (req,res,next)=>{
  
    // tran_id
    return res.redirect(`/order-complite/?txnId=${req.body.tran_id}`) 
})
app.post("/payment-fail",async (req,res,next)=>{
    return res.status(200).json({
        data:req.body
    })
})
app.post("/payment-cancel",async (req,res,next)=>{
    return res.status(200).json({
        data:req.body
    })
})
app.post("/payment-ipn",async (req,res,next)=>{
    return res.status(200).json({
        data:req.body
    })
})

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