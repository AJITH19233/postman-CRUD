const express=require("express");
var fs=require("fs");
const router=express.Router();
const bodyParser = require('body-parser');
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const app=new express();
const PORT=process.env.PORT;
app.use(bodyParser.json());
const readData = () => {
  const rawData = fs.readFileSync('Dataset.json');
  return JSON.parse(rawData);
};
const writeData = (data) => {
  fs.writeFileSync('Dataset.json', JSON.stringify(data, null, 2));
};
router.get('/hospitals', (req, res) => {
  const hospitals = readData();
  res.json(hospitals);
});
router.post('/add', (req, res) => {
  const hospitals = readData();
  const newHospital = req.body;
  hospitals.push(newHospital);
  writeData(hospitals);
  res.send("data Posted");
});
router.put('/update/:id', (req, res) => {
  const hospitals = readData();
  const id = req.params.id;
  const updatedHospital = req.body;

  hospitals[id] = updatedHospital;
  writeData(hospitals);
  res.send("Updated Successful");
});
router.delete('/deleted/:id', (req, res) => {
  const hospitals = readData();
  const id = req.params.id;
  const deletedHospital = hospitals.splice(id, 1)[0];
  writeData(hospitals);
  res.send("Deleted Successfully")
});

  module.exports=router;
