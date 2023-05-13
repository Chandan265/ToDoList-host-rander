//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = ("mongodb+srv://haldarc084:Chandan-123@cluster0.xv7cave.mongodb.net/TodolistDB",{useNewUrlParser:true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const todolistSchema = {
  name: String
};

const Item = mongoose.model("Item", todolistSchema);

const item1 = new Item({
  name: "Welcome to Your Todolist."
});
const item2 = new Item({
  name: "Hit the + button to add new data."
});
const item3 = new Item({
  name: "<---- Hit this to delete an item."
});
const defaltAdd = [item1,item2,item3];

app.get("/", function(req, res) {
  if (Item.length === 0) {
    Item.insertMany(defaltAdd)
    .then(() => {
      console.log('Data inserted successfully!');

    })
    .catch(err => {
      console.error(err);
    });
  console.log("Data is successfully inter");
  res.redirect("/");
  } else {
  Item.find({}, res.render("list", {listTitle: "Today", newListItems: defaltAdd}));
  };

});


app.get("/:CustomListItem",function(req,res){
  console.log(req.params.CustomListItem)
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
const item = new Item({
  name: itemName
});

item.save();
res.redirect("/");
});

app.post("/delete", function(req,res){
  const checkboxid = req.body.checkbox;
  Item.findByIdAndRemove(checkboxid)
res.redirect("/")
});


MongoClient.connect(uri, function(err, client){});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
