const router = require("express").Router();
//joi import...
const joi = require("joi");
//data here...
const genres = [
  {
    id: 1,
    genre: "Comedy",
  },
  {
    id: 2,
    genre: "Horror",
  },
];
//retrive data...
router.get("/", (req, res) => {
  console.log("genres retrive successfully");
  res.send(genres);
});

//Serch Data...
router.get("/:id", (req, res) => {
  let id = req.params.id;
  const gen = genres.find((gener) => {
    return gener.id === Number.parseInt(id);
  });
  if (!gen) {
    return res.status(404).send("genres is not present");
  } else {
    console.log(gen);
    console.log("geners search successfully");
    res.send(gen);
  }
});
//Add Data...
router.post("/", (req, res) => {
  let gen = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  const { error } = validateHere(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    genres.push(gen);
    console.log(gen);
    console.log("genres inserted successfully");
    res.send(gen);
  }
});
//update Data...
router.put("/:id", (req, res) => {
  let id = req.params.id;
  const gen = genres.find((gener) => {
    return gener.id === Number.parseInt(id);
  });
  if (!gen) {
    return res.status(404).send("genres is not present");
  }

  const { error } = validateHere(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    gen.genre = req.body.genre;
    console.log(gen);
    console.log("genres updated successfully");
    res.send(gen);
  }
});
//Delete Data...
router.delete("/:id", (req, res) => {
  //parameter
  let id = req.params.id;
  //find parameter present or not
  let gen = genres.find((gener) => {
    return gener.id === Number.parseInt(id);
  });

  if (!gen) {
    return res.status(404).send("genres is not present");
  } else {
    const index = genres.indexOf(gen);
    genres.splice(index, 1);
    console.log(gen);
    console.log("genres deleted successfully");
    res.send(gen);
  }
});
function validateHere(input) {
  //schema to validate body....
  let schema = joi.object({
    genre: joi.string().min(5).max(10).required(),
  });
  return schema.validate(input);
}
//exports data in index
module.exports = router;
