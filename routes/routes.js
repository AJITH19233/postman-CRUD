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
router.put('/update/:name', (req, res) => {
  const data = readData();
  const itemId = req.params.name;
  const updatedItem = req.body;

  const index = data.findIndex((item) => item.name === itemId);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});
router.put('/delete/:name', (req, res) => {
  const data = readData();
  const itemId = req.params.name;
  const updatedItem = req.body;

  const index = data.findIndex((item) => item.name === itemId);

  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});


  module.exports=router;
