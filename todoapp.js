//JShint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");


const app = express();

const items = ["Buy vegies", "cook food", "have food", "go to sleep"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  //here date() calls the getDate function from date.js 
  const day = date.getDate();

  // let today = new Date();

  // let options = {
  //   weekday: 'long',
  //   day: 'numeric',
  //   month: 'long'
  // };

  // //   var currentDay = today.getDay();
  // let day = today.toLocaleDateString("en-US", options);


  //   if(currentDay === 6 || currentDay === 0)
  //   {  day = "weekend";
  //      }
  //   else {
  //      day = "weekday";
  // }

  // switch (currentDay) {
  //    case 0:  day="sunday";
  //       break;
  //    case 1:  day="monday";
  //       break;
  //    case 2:  day="tuesday";
  //       break;
  //    case 3:  day="wednesday";
  //       break;
  //    case 4:  day="thursday";
  //       break;
  //    case 5:  day="friday";
  //       break;
  //    case 6:  day="saturday";
  //       break;
  //    default:console.log("Error: currentDay is equal to:"+currentDay);
  //       break;
  // }

  res.render("lists", { ListTitle: day, newListItems: items });
});



app.post("/", function (req, res) {
  const item = req.body.newItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    //control goes to app.get and renders from there
    res.redirect("/");
  }


});

//Functions for WORK
app.get("/work", function (req, res) {
  res.render("lists", { ListTitle: "work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

// app.post("/work", function (req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);

//   res.redirect("/work");
// })


app.listen(3000, function () {
  console.log("Server stated on port 3000");
});








