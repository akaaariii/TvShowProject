$(function(){
    let favoriteList = localStorage.getItem('favourite') ? 
    JSON.parse(localStorage.getItem('favourite')) : [];
    
    const getAllList=async()=>{
        try {
            var response = await $.ajax({
                url: `https://api.themoviedb.org/3/tv/popular?api_key=${config.API_KEY}`,
                type: 'GET',
                dataType: 'json'
            })  
             return sanitizeMovies(response);
        } catch (error) {
            console.log(error);
        }
    }
 
    const sanitizeMovies =(response)=>{
        let movieList=[];
        // console.log(response.results)
        response.results.forEach((d)=>{
            let data = {
                title:d.original_name,
                image:'https://image.tmdb.org/t/p/w440_and_h660_face'+ d.poster_path,
                vote:d.vote_average,
                release_date:d.release_date,
                overview:d.overview,
                id:d.id 
              };
              movieList.push(data);
        })
        // console.log(movieList)
        return movieList;
    }
    const checkFavourite = (item) => {
        const id = toString(item.id);
        const index = favoriteList.findIndex(e => e.target === id);
        return (index < 0) ? false : true;
    }

    const handlefavoriteList = (movieList) => {
        $('.fa-heart').click(e => {
            const target = $(e.target);
            const targetId =target.parent().attr('id');
            const id = parseInt(targetId);
            const favorite = movieList.find(list => parseInt(list.id) === id);
            const favIndex = favoriteList.findIndex(list =>parseInt(list.id) === id );
            // console.log(favIndex)
            if (favIndex < 0) {
                favoriteList.push(favorite);
            } else {
                favoriteList.splice(favIndex, 1)
            }
            console.log(favoriteList)
            localStorage.setItem('favourite', JSON.stringify(favoriteList));
            target.toggleClass('favourite');

        })
    }

    const redirectToTvshowPage = () => {
      $('img').click(e => {
        const target = $(e.target);
        const id = target.attr('id');
        document.location.href = `./tvShowPage.html?id=${id}`;
      })
    }

    const displayMovieData = async(movieList) => {
        const list =  $('.list');
        list.empty();
        movieList.forEach((d)=>{
            const isFavourite = checkFavourite(d);
            const card = $('<div class="card"></div>');
            const img = $('<img>').attr('src', d.image).attr('id', d.id);
            const cardBody = $('<div class="card-body"></div>');
            const cardTitle = $('<div class="card-title"></div>').attr('id', d.id);
            const title = $('<h5></h5>').text(`Title : ${d.title}`);
            const vote = $('<h5></h5>').text(`Rate : ${d.vote}`);
            const icon = isFavourite ? $('<i class="fas fa-heart favourite"></i>') : $('<i class="fas fa-heart"></i>');
           
            cardTitle.append(vote);
            cardTitle.append(icon);
            cardBody.append(title);
            cardBody.append(img);
            cardBody.append(cardTitle);
            card.append(cardBody);
            list.append(card);        
        })  
        handlefavoriteList(movieList);
        
        redirectToTvshowPage();
    }

    getAllList().then((movieList) => {displayMovieData(movieList); })    
 
})
