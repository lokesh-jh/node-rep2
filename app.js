const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT||3000;

var app = express();
hbs.registerPartials(__dirname+"/views/partials");
app.set("view engine","hbs");
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync("server.log",log+"\n");
    next();
});
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

app.get("/projects",(req,res)=>{
    res.render("projects.hbs",{
        pageTitle:"Projects",
        welcomeMessage:"Our projects listed here"       
    });
});

app.get("/bad", (req,res)=>{
    res.send({
        errormessage:"there was an error"
    });
});

app.listen(port,()=>{
    console.log(`server is up on port ${port}`);
});