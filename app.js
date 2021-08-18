const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

var items = [];
var workitems = [];

app.set("view engine", "ejs");

app.get("/", function(req, res){
    var day = date.getDate()
    // or another function from module 
    // var day = date.getDay()
    console.log(day)
    res.render("list", {
        ListTitle: day, newListItem: items
    })
});

app.post("/", function(req, res){
    item = req.body.newItem;
    console.log(item)
    console.log(req.body)
    if (req.body.list === "work"){
        workitems.push(item)
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/");
    }
})


app.get("/work", function(req, res){
    res.render("list", {
        ListTitle: "work list",
        newListItem: workitems
    })
})

app.get("/about", function(req, res){
    res.render("about")
})


app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
});