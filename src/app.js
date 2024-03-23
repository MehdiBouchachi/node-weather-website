const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const  {forcast}  = require("./utils/forcast");

//console.log(path.join(__dirname,'../public'))

const app = express();
//Difine paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../tamplates/views");
const partialPath = path.join(__dirname, "../tamplates/partials");

// Setup handlbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app routers
// app.com
// app.com/help
// app.com/about


app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mehdi",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  /* if(!address){
    return res.send({
      error: "you must provide address term",
    });
  } */
  geoCode(address ,(error ,{location ,lat , lon})=>{
    if(error){
      return res.send({
        error: error,
      });
    }
    forcast(lat , lon, (error, forcastData)=>{
      if(error){
        return res.send({
          error: error,
        });
      }

      res.send({
        title: "Weather",
        location: location,
        forecast: forcastData,
      });
    })
  })

  
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mehdi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Mehdi bch",
    text: "This some helpful text",
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mehdi bch",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mehdi bch",
    errorMessage: "Page not found",
  });
});

//to start our server we use the listen method

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

/* 
app.get("/products", (req, res) => {
  console.log(req.query);

  if (!req.query.search) {
    return res.send({
      error: "you must provide some search term",
    });
  }

  res.send({
    prodcuts: [],
  });
});
 */