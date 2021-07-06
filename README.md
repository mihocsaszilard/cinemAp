


  <h1 class="text-center ">cinemApp Documentation</h1>

  <p class="text-center w-75 m-auto mb-3 mt-3">To build the server-side component of a “movies” web application. The web
    application will provide userss with access to information about different
    movies, directors, and genres. userss will be able to sign up, update their
    personal information, and create a list of their favorite movies.
  </p>

  <table class="table table-striped table-bordered table-hover table-sm w-75 m-auto">
    <thead class="table-dark">
      <tr>
        <th scope="col">Business Logic</th>
        <th scope="col">URL</th>
        <th scope="col">Query Parameter</th>
        <th scope="col">HTTP Method</th>
        <th scope="col">Request format</th>
        <th scope="col">Response format</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Return a list of movies</td>
        <td>/movies</td>
        <td>none</td>
        <td>GET</td>
        <td>None</td>
        <td>A JSON object holding data about all the movies</td>
      </tr>
      <tr>
        <td>Return data about a movie by title</td>
        <td>/movies/[Title]</td>
        <td>/movies/:Title</td>
        <td>GET</td>
        <td>None</td>
        <td>A JSON object holding data about a movie <br /><em>e.g.:</em> {
          <br> "_id": "60e30c0b9b04b2658012a99a",
          <br> "Title": "Bohemian Rhapsody",
          <br> "Director": "60e496cc8fc408e573889dfc",
          <br> "Genre": ["60e48c48651578ba39b7b385"],
          <br> "Actors": ["Rami Malek"],
          <br> "Description": "The story of the legendary British rock...",
          <br> "ImgPath": "https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg",
          <br> "Featured": true <br> }
        </td>
      </tr>
      <tr>
        <td>Return data about a genre by name</td>
        <td>/genres/[Name]</td>
        <td>/genres/:Name</td>
        <td>GET</td>
        <td>None</td>
        <td>A JSON object holding data about a genre <br /><em>e.g.:</em> {
          <br>"_id": "60e48c48651578ba39b7b385",
          <br>"Name": "Biography",
          <br>"Description": "A biographical film, or biopic ..." <br> }
        </td>
      </tr>
      <tr>
        <td>Return data about a director by name</td>
        <td>/directors/[Name]</td>
        <td>/directors/:Name</td>
        <td>GET</td>
        <td>None</td>
        <td>A JSON object holding data about a director <br /><em>e.g.:</em> {
         <br> {
           <br>"_id": "60e496958fc408e573889dfb",
           <br>"Name": "Francis Ford Coppola",
           <br>"Bio": "Francis Ford Coppola was born in 1939 ...",
           <br>"Birthyear": "1939-04-07T00:00:00.000Z" <br>}
         </tr>
      <tr>
        <td>Allow new users to register</td>
        <td>/users</td>
        <td>None</td>
        <td>POST</td>
        <td>A JSON object holding data about the registered users <br> {
          <br>"Username: "rickSanchez",
          <br>"FirstName": "Rick",
          <br>"LastName": "Sanchez",
          <br>"Password": "squanchy"
          <br> Email: "WubbaLubbaDubDub@gmail.com"
          <br> Birth: "1969-01-28" <br> }
        </td>
        <td>A JSON object holding data about the user that was registered, inculding an ID:
          <br /><em>e.g.:</em> { <br> _id:"60e32d9b9b04b2658012a9a8",
          <br>"Username: "rickSanchez",
          <br>"FirstName": "Rick",
          <br>"LastName": "Sanchez",
          <br>"Password": "squanchy"
          <br> Email: "WubbaLubbaDubDub@gmail.com"
          <br> Birth: "1969-01-28" <br>
          <br> "FavoriteMovies": [] <br> }
        </td>
      </tr>
      <tr>
        <td>Allow users to update their info</td>
        <td>/users/[username]</td>
        <td>/users/:username</td>
        <td>PUT</td>
        <td>A JSON object holding data about the users update <em>e.g.:</em> <br> {
          <br>"Username: "Morty7",
          <br>"FirstName": "Morty",
          <br>"LastName": "Sanchez",
          <br>"Password": "WubbaLubbaDubDub"
          <br> Email: "mortyy7@gmail.com"
          <br> Birth: "1999-05-08" <br> }
        </td>
        <td>A JSON object holding data about the updated user includind an ID <em>e.g.:</em> <br> {
          <br>"_id": "60e32f6a9b04b2658012a9ad",
          <br>"Username: "Morty7",
          <br>"FirstName": "Morty",
          <br>"LastName": "Sanchez",
          <br>"Password": "WubbaLubbaDubDub"
          <br> Email: "mortyy7@gmail.com"
          <br> Birth: "1999-05-08" <br> }
        </td>
      </tr>
      <tr>
        <td>Allow users to add movies to their list of favorites</td>
        <td>/users/[Username]/favorites/[MovieID]</td>
        <td>/users/:Username/favorites/:MovieID</td>
        <td>POST</td>
        <td>None</td>
        <td>A JSON object holding data about the movie whitch added to favorites and about the user who added<br> <em>e.g.:</em> <br> {
            <br> "FavoriteMovies": ["60e30c0b9b04b2658012a99a"],
            <br>"_id": "60e32d9b9b04b2658012a9a8",
            <br>"FirstName": "Rick",
            <br>"LastName": "Sanchez",
            <br>"Username": "rickSanchez10",
            <br>"Password": "WubbaLubbaDubDub",
            <br>"Email": "ricksanchez10@gmail.com",
            <br>"Birth": "1969-01-28" <br> }
          </td>
      </tr>
      <tr>
        <td>Allow users to remove movies to their list of favorites</td>
        <td>/users/[Username]/removeFromFav/[MovieID]</td>
        <td>/users/:Username/removeFromFav/:MovieID</td>
        <td>DELETE</td>
        <td>None</td>
        <td>A JSON object holding data the user who deleted. Note that the MovieID is not is not present FavoriteMovies array. <br> <em>e.g.:</em> <br> {
          <br> "FavoriteMovies": [],
          <br>"_id": "60e32d9b9b04b2658012a9a8",
          <br>"FirstName": "Rick",
          <br>"LastName": "Sanchez",
          <br>"Username": "rickSanchez10",
          <br>"Password": "WubbaLubbaDubDub",
          <br>"Email": "ricksanchez10@gmail.com",
          <br>"Birth": "1969-01-28" <br> }
        </td>
      </tr>
      <tr>
        <td>Allow existing users to deregister</td>
        <td>/users/[Username]</td>
        <td>/users/:Username</td>
        <td>DELETE</td>
        <td>None</td>
        <td>A text message indicating whether the user was successfully deregistered</td>
      </tr>
    </tbody>
  </table>

</body>

</html>
