const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: false},
  Genre: [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  Director: [{type: mongoose.Schema.Types.ObjectId, ref: 'Director'}],
  ImgPath: String,
  Featured: Boolean,
  Actors: [String]
});

let userSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: String,
  Birth: Date,
  FavoriteMovies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
}

let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthyear: Date
});

let actorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true},
  Birthyear: Date
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);
let Actor = mongoose.model('Actor', actorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.Actor = Actor;
