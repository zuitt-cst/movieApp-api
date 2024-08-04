const express = require("express");
const courseController = require("../controllers/movie");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

const router = express.Router();

router.post("/addMovie", verify, verifyAdmin, courseController.addMovie);

router.get("/getMovies", courseController.getMovies);

router.get("/getMovie/:movieId", courseController.getMovie);

router.patch("/updateMovie/:movieId", verify, verifyAdmin, courseController.updateMovie);

router.delete("/deleteMovie/:movieId", verify, verifyAdmin, courseController.deleteMovie);

router.patch("/addComment/:movieId", verify, courseController.commentMovie);

router.get("/getComments/:movieId", verify, courseController.getComments);

module.exports = router;