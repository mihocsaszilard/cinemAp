const mongoose = require('mongoose'),
  Models = require('./models.js'),
  express = require('express'),
  morgan = require('morgan'),
  path = require('path'),
  bodyParser = require('body-parser'),
  app = express(),
  {
    check,
    validationResult
  } = require('express-validator');

const cors = require('cors');

let allowedOrigins = ['http://localhost:8080'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) { //If a specific origin isn’t found on the list
      let message = 'The CORS policy for this application doesn`t allow accsess from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));


auth = require('./auth')(app),
  uuid = require('uuid'),
  bcrypt = require('bcrypt');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;
const Actors = Models.Actor;

app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const passport = require('passport');
require('./passport');

// mongoose.connect('mongodb://localhost:27017/cinemAppDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/', (req, res) => {
  const responseText = '<body style="background-color: black"><div style= "height: 90vh; width: 94vw; background: black; background: url(/img/CinemApp5.png) center center no-repeat; padding: 2%;"><h1 style= "color: white; font-weight: 100; font-family: sans-serif; text-align: center; padding-top: 15%;"> Welcome to </h1></div></body>';
  res.send(responseText);
});

//------------------movie requests---------------
//get all movies
app.get('/movies', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(200).json(movies);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

//get movie by title
app.get('/movies/:Title', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.findOne({
      Title: req.params.Title
    })
    .then((movie) => {
      res.json(movie);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

//add movie
// app.post('/movies', passport.authenticate('jwt', {
//   session: false
// }), (req, res) => {
//   Movies.findOne({
//       Title: req.body.Title
//     })
//     .then((movie) => {
//       if (movie) {
//         return res.status(400).send(req.body.Title + ' already exists!');
//       } else {
//         Movies
//           .create({
//             Title: req.body.Title,
//             Description: req.body.Description,
//             Genre: req.body.Genre,
//             Director: req.body.Director,
//             Actors: [req.body.Actors],
//             ImgPath: req.body.ImgPath,
//             Featured: req.body.Featured
//           })
//           .then((movie) => {
//             res.status(201).json(movie)
//           })
//           .catch((error) => {
//             console.error(error);
//             res.status(500).send('Error: ' + error);
//           })
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error: ' + error);
//     });
// });

//update movie by title
// app.put('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
//   Movies.findOneAndUpdate({
//       Title: req.params.Title
//     }, {
//       $set: {
//         Title: req.body.Title,
//         Description: req.body.Description,
//         Description: req.body.Description,
//         Genre: req.body.Genre,
//         Actors: [req.body.Actors],
//         ImgPath: req.body.ImgPath,
//         Featured: req.body.Featured
//       }
//     }, {
//       new: true
//     },
//     (err, updatedMovie) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       } else {
//         res.json(updatedMovie);
//       }
//     });
// });

//add movies to users favorite list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $push: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true
    }, //this line makes sure that updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//delete movie from users favorite list
app.delete('/users/:Username/removeFromFav/:MovieID', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $pull: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true //This line makes sure that the updated Document is returned
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

//----------------genre requests--------------------
//get all genres
app.get('/genres', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Genres.find()
    .then((genre) => {
      res.status(200).json(genre);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

//get genres by name
app.get('/genres/:Name', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Genres.findOne({
      Name: req.params.Name
    })
    .then((genre) => {
      res.json(genre);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

//----------------director requests--------------------
//get all directors
app.get('/directors', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Directors.find()
    .then((director) => {
      res.status(200).json(director);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

//get directors by name
app.get('/directors/:Name', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Directors.findOne({
      Name: req.params.Name
    })
    .then((director) => {
      res.json(director);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

//------------------user requests---------------
//gett all users
app.get('/users', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//get user by username
app.get('/users/:Username', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOne({
      Username: req.params.Username
    })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//add user
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required!').isLength({
      min: 5
    }),
    check('Username', 'Username contains non alphanumerical characters!').isAlphanumeric(),
    check('Password', 'Password is required!').not().isEmpty(),
    check('Email', 'Email adress is not valid!').isEmail()
  ], (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    let hashedPasswod = Users.hashPassword(req.body.Password);
    Users.findOne({
        Username: req.body.Username //search user by username
      })
      .then((user) => {
        if (user) { //if user is found, send a response that is already exists
          return res.status(400).send(req.body.Username + ' already exists!');
        } else {
          Users
            .create({
              FirstName: req.body.FirstName,
              LastName: req.body.LastName,
              Username: req.body.Username,
              Password: hashedPasswod,
              Email: req.body.Email,
              Birth: req.body.Birth
            }).then((user) => {
              res.status(201).json(user)
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            })
        }
      }).catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

//update user by username
//?? how to update a single field without turning the other fields to null???
app.put('/users/:Username',
  [
    check('Username', 'Username is required!').isLength({
      min: 5
    }),
    check('Username', 'Username contains non alphanumerical characters!').isAlphanumeric(),
    check('Password', 'Password is required!').not().isEmpty(),
    check('Email', 'Email adress is not valid!').isEmail()
  ],
  passport.authenticate('jwt', {
    session: false
  }), (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    Users.findOneAndUpdate({
        Username: req.params.Username
      }, {
        $set: {
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birth: req.body.Birth
        }
      }, {
        new: true
      }, //this line makes sure that updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error: ' + err);
        } else {
          res.json(updatedUser);
        }
      });
  });

//delete user by username
app.delete('/users/:Username', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndDelete({
    Username: req.params.Username
  }).then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + ' was not found!');
    } else {
      res.status(200).send(req.params.Username + ' was removed!');
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//--------------------Actor queries----------------

//get all actors
app.get('/actors', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Actors.find()
    .then((actors) => {
      res.status(200).json(actors);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

//get actor by name
app.get('/actors/:Name', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Actors.findOne({
      Name: req.params.Name
    })
    .then((actor) => {
      res.json(actor);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

//get movies by actor
app.get('/movies/:ActorID', passport.authenticate('jwt', {
  session:false
}), (req, res) => {
  Movies.findOne({
    Actors: req.params.ActorID
  })
  .then((movie) => {
    res.json(movie);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  })
});

//-------------------documentation--------------
app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/documentation.html'));
});

//---------------------error handling------------
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Your server is live and listening on Port ' + port);
});
