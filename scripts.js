
//https://api.themoviedb.org/3/account/719ef349785fecd706a9b04f07619433/favorite/movie 

// 'https://api.themoviedb.org/3/movie/changes


async function renderMovies(filter=null) {

    const moviewrapper = document.getElementById('shop');
    
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTQwNzIwNTRkNDFhMTZlNWZkM2FhNzY2MTgyNjczNSIsIm5iZiI6MTcyODg2NDI3OC4xOTI3NTksInN1YiI6IjY3MGM1ZGQ1M2JiNDU1N2M2NjliZDY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ti66TBc3pP40Ou45YW8VfpgrzkOAUBIf1tw1UAo3g0c'
        }
      };

      const authentication =await (fetch('https://api.themoviedb.org/3/authentication', options)
      .then(response => response.json())
      .then(response => console.log(''))
      .catch(err => console.error(err)));
      
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

    let movies = await fetch('https://api.themoviedb.org/3/account/719ef349785fecd706a9b04f07619433/favorite/movies?title=deadpool', options)

    let movieData = await movies.json();

    
    if(filter != null) {
        console.log(filter.target.value)
        filter = filter.target.value;
        filtered_array = [];

        
        if(filter != 'RELASE_DATE_ASC' && filter != 'RELASE_DATE_DSC' && filter != 'ALPHABETICAL') {
            
            movieData.results.forEach(element => {

                if(element.title.toLowerCase().includes(filter)) {
                    
                    filtered_array.push(element);
                }
            });
    
            movieData.results = filtered_array;
        } else if (filter == 'RELASE_DATE_ASC') {
            

            movieData.results.sort((a,b) => {return a.release_date.localeCompare(b.release_date)})


        } else if (filter == 'RELASE_DATE_DSC') {
            filtered_array = movieData.results;

            movieData.results.sort((a,b) => {return b.release_date.localeCompare(a.release_date)})

            
        } else if (filter == 'ALPHABETICAL') {
            filtered_array = movieData.results;

            movieData.results.sort((a,b) => {return a.title.localeCompare(b.title)})

           
        }
        
        

    }

    const movieHtml = movieData.results.map( movie => {

        let description = movie.overview;

        let short_description = description.substring(0, 50)

        let more__description = description.substring(51, description.length)

        return `<div id="${movie.id}" class="movie">
          <figure class="movie__img--wrapper">
            <img class="movie__img" src="${imageBaseUrl + movie.poster_path}" alt="" />
          </figure>
        
          <div class="movie__title">
            ${movie.title}
            </div>
            <div class="movie__date">
              ${movie.release_date}
            </div>
            <div class="movie__description">
              <p class="overview">${short_description} <span class="more">${more__description}</span> <a href="javascript:showMore(${movie.id})" class="show-more">more...</a></p>
            </div>

        </div>
      </div>`;
    }).join("");
    moviewrapper.classList.remove("movies__loading");
      moviewrapper.innerHTML = movieHtml;
    
}
function sortMovies(filter) {
    const moviewrapper = document.getElementById('shop');

    movieData = getMovies();
    
    }

async function getMovies() {
        let options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTQwNzIwNTRkNDFhMTZlNWZkM2FhNzY2MTgyNjczNSIsIm5iZiI6MTcyODg2NDI3OC4xOTI3NTksInN1YiI6IjY3MGM1ZGQ1M2JiNDU1N2M2NjliZDY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ti66TBc3pP40Ou45YW8VfpgrzkOAUBIf1tw1UAo3g0c'
            }
          };
    
          let authentication =await (fetch('https://api.themoviedb.org/3/authentication', options)
          .then(response => response.json())
          .then(response => console.log(''))
          .catch(err => console.error(err)));
          
        
    
        moviesinfo = await fetch('https://api.themoviedb.org/3/account/719ef349785fecd706a9b04f07619433/favorite/movies?', options)

        movieDatainfo = await movies.json();

        return movieDatainfo;
}

function showMore(id) {
    movie = document.getElementById(id);

    description = movie.querySelector('.movie__description').querySelector('.overview');

    if (description.classList.contains("active")) {
        description.querySelector(".show-more").innerHTML = "more..."
        description.classList.remove("active")

    } else {
        description.classList +=' active'
        description.querySelector(".show-more").innerHTML = "less..."
    }
}

setTimeout(() =>{
    document.readyState(renderMovies())
  }, 1000)