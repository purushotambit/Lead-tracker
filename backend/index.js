const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cron = require('node-cron');
// const path = require("path");
const connectDB = require('./config/db');
 
connectDB();

app.use(cors());


app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// dotEnv Configuration
dotEnv.config({ path: "./.env" });

const port = process.env.PORT || 5001;

// router configuration

const myCronJob = async () => {
  console.log('Cron job started!');
  const currentDate = new Date();

  const currentDateString = currentDate.toISOString().slice(0, 10);
  
  let allLeads = await Lead.find();


  for await (let lead of allLeads) {
    const providedDateString = lead.dueDate.toISOString().slice(0, 10);
    if (currentDateString == providedDateString) {
      

      console.log(currentDateString)
      await sendEmail(lead.email, lead.name, 'hello');
    }
  }

  console.log('Cron job ended!');
};
const cronSchedule = '* * * * *'; 

const scheduledJob = cron.schedule(cronSchedule, myCronJob);
scheduledJob.start();

// router configuration
app.use('/api/users' , require('./router/userDataRouter'));
app.use('/api/leads' , require('./router/leadDataRouter'));
app.use('/api/comms' , require('./router/communicationHIstoryRouter'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
      });
}

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname,  "client/build", "index.html"));
    });
}

app.listen(port, () => {
  console.log(`Express Server is Started at PORT : ${port}`);
});
