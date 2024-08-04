const Movie = require("../models/Movie");

module.exports.addMovie = (req, res) => {

	let newMovie = new Movie({
		title: req.body.title,
		director: req.body.director,
		year : req.body.year,
		description : req.body.description,
		genre : req.body.genre
	});


	    return newMovie.save()
	    .then(savedMovie => res.status(201).send(savedMovie))
	    .catch(saveErr => {
	        console.error("Error in saving the course: ", saveErr)

	        return res.status(500).send({ error: 'Failed to save the movie' });
	    });

};

module.exports.getMovies = (req, res) => {

	return Movie.find({}).then(movies => {
		return res.status(200).send({ movies });
	}).catch(findErr => {
	    console.error("Error in finding movies: ", findErr)

	    return res.status(500).send({ message:'Error finding movies' });
	});
}; 


module.exports.getMovie = (req, res) => {

	return Movie.findById(req.params.movieId).then(movie => {
		return res.status(200).send(movie);
	}).catch(findErr => {
	    console.error("Error in finding movie: ", findErr)

	    return res.status(500).send({ message:'Error finding movie' });
	});
}; 

module.exports.updateMovie = (req, res) => {

	let updatedMovie = {
        title: req.body.title,
		director: req.body.director,
		year : req.body.year,
		description : req.body.description,
		genre : req.body.genre,
    }

    return Movie.findByIdAndUpdate(req.params.movieId, updatedMovie)
    .then(updatedMovie => {
        if (!updatedMovie) {
            return res.status(404).send({ error: 'Movie not found' });
        }

        return res.status(200).send({ 
        	message: 'Movie updated successfully', 
        	updatedMovie: updatedMovie 
        });

    })
    .catch(err => {
		console.error("Error in updating a movie: ", err)
		return res.status(500).send({ error: 'Error in updating a movie.' });
	});
};

module.exports.deleteMovie = (req, res) => {

    return Movie.findByIdAndDelete(req.params.movieId)
    .then(deletedMovie => {
        if (!deletedMovie) {
            return res.status(404).send({ error: 'Movie not deleted' });
        }

        return res.status(200).send({message: 'Movie deleted successfully'});

    })
    .catch(err => {
		console.error("Error in deleting a movie: ", err)
		return res.status(500).send({ error: 'Error in deleting a movie.' });
	});
};

module.exports.commentMovie = (req, res) => {

	if(req.user.isAdmin){
    	return res.send("Action Forbidden")
  	}

	return Movie.findById(req.params.movieId).then(movie => {

    	let userComment = {
    		userId: req.user.id,
        	comment: req.body.comment
    	}

	    movie.comments.push(userComment);
	    
	    return movie.save()
	    .then(updatedMovie => {
	        if (!updatedMovie) {
	            return res.status(404).send({ error: 'Movie not found' });
	        }

	        return res.status(200).send({ 
	        	message: 'comment added successfully', 
	        	updatedMovie: updatedMovie 
	        });

	    })
	    .catch(err => {
			console.error("Error in updating a movie: ", err)
			return res.status(500).send({ error: 'Error in updating a movie.' });
		});
	})
};


module.exports.getComments = (req, res) => {

	return Movie.findById(req.params.movieId).then(movie => {

		return res.status(200).send({ comments: movie.comments });
	})
};
