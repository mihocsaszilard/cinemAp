const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: false},
  Genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  Director: {
    Name: String,
    Bio: String,
    Birth: Date
  },
  ImgPath: String,
  Featured: Boolean,
  Actors: [String]
});

let userSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birth: Date,
  FavoriteMovies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthyear: Date
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
