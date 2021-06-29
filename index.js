const express = require('express'),
      morgan = require('morgan'),
      path = require('path');

const app = express();

let topTenMovies = [
  {
       title: 'The Shawshank Redemption',
       rank: '1',
   },
   {
       title: 'The Godfather',
       rank: '2'
   },
   {
       title: 'The Godfather: Part II',
       rank: '3'
   },
   {
       title: 'Pulp Fiction',
       rank: '4'
   },
   {
       title: 'The Good, the Bad and the Ugly',
       rank: '5'
   },
   {
       title: 'The Dark Knight',
       rank: '6'
   },
   {
       title: '12 Angry Men',
       rank: '7'
   },
   {
       title: 'Schindler`s List',
       rank: '8'
   },
   {
       title: 'The Lord of the Rings: The Return of the King',
       rank: '9'
   },
   {
       title: 'Fight Club',
       rank: '10'
   }
];

let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
}

let myLogger = (req, res, next) => {
  console.log('Request URL: ' + req.url);
  next();
}

app.use(requestTime);
app.use(myLogger);
app.use(morgan('common'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  let responseText = 'Welcome to my app!';
  responseText += '<small><br> Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/secreturl', (req, res) => {
  let responseText = 'This is a secret url with super top-secret content.';
  responseText += '<small><br> Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
});

app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/documentation.html'));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Your server is live and listening on port 8080.');
});
