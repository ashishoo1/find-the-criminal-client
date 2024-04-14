import express from 'express';
import { cops,cities,vehicles } from "./server/dataStore.mjs";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5000;
const fugitiveLocation = (cities) =>
  cities[Math.floor(Math.random() * cities.length)];

app.use(express.json())
app.use(cors())
app.get('/vehicles', async function ( req, res) {
    try {
      return res.send({vehicles});
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.get('/cities', (req, res)=> {
    try {
        console.log(cities);
        res.send({cities:cities});
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.get('/cops',function (req, res) {
    try {
    res.send({cops: cops});
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.post('/capture', async function (req, res) {
    try {
      const { copCity, copVehicle } = req.body;
  
      const copRange = vehicles.find(
        (vehicle) => vehicle.kind === copVehicle
      ).range;
      const copLocation = cities.find((city) => city.name === copCity);
  
      const distanceToFugitive = Math.abs(
        fugitiveLocation(cities).distance - copLocation.distance
      );
      const successfulCapture = distanceToFugitive <= copRange;
  
      if (successfulCapture) {
        const capturingCop = cops[Math.floor(Math.random() * cops.length)];
        res.status(200).json({ success: true, capturingCop });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

app.get('/', function (req, res) {
    res.send('hello world');
});

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
  
    next();
  });

app.listen(PORT, () => {
console.log(`Server Running on port: ${PORT}`);
});