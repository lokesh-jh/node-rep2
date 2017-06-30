const express = require("express");
const hbs = require("hbs");

var app = express();
hbs.registerPartials(__dirname+"/views/partials")
app.set("view engine","hbs");
hbs.registerHelper("getYear",()=>{
    return new Date().getFullYear();
});
hbs.registerHelper("screamIt",(text)=>{
    return text.toUpperCase();
})
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.render("home.hbs",{
        pageTitle:"Home Page",        
        welcomeMessage:"welcome to our website"
    });
});

app.get("/about",(req,res)=>{
    res.render("about.hbs",{
        pageTitle:"About Us"        
    });
});

app.get("/bad", (req,res)=>{
    res.send({
        errormessage:"there was an error"
    });
});

app.listen(3000);