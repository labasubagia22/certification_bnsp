const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { EmployeeController } = require("./controller");
const { EmployeeUseCase } = require("./usecase");
const { EmployeeModel } = require("./model");

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// Setup server
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send({ message: "Hello World" }));

// Routing untuk fitur pegawai
const employeeController = new EmployeeController({
  employeeUseCase: new EmployeeUseCase({
    employeeModel: EmployeeModel,
  }),
});
app.get("/employees", employeeController.getAll());
app.get("/employees/:id", employeeController.getById());
app.post("/employees", employeeController.create());
app.put("/employees/:id", employeeController.update());
app.delete("/employees/:id", employeeController.delete());

// Koneksi ke mongo db
mongoose.connect(MONGO_URL).then(() => {
  // Selanjutnya jalankan server
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});
