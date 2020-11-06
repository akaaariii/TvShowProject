const stringQuery = document.location.search;
const paramsURL = new URLSearchParams(stringQuery);
const tvshowId = paramsURL.get('id');

const getTvshow = async () => {
  try {
    const response = await $.ajax({
      url: `https://api.themoviedb.org/3/tv/${tvshowId}?api_key=${config.API_KEY}`,
      type: 'GET',
      dataType: 'json'
    })
    // console.log(sanitizeTvshowData(response));
    return sanitizeTvshowData(response);
  } catch (error){
    console.error(error);
  }
}

const sanitizeTvshowData = (data) => {
  return {
    id: tvshowId,
    title: data.name,
    image: (typeof data.backdrop_path === 'object') ? 'https://via.placeholder.com/500x281/9e9e9e/FFFFFF/?text=No image for this TV show' : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
    voteAve: data.vote_average,
    type: data.type,
    number_of_seasons: data.number_of_seasons,
    overview: data.overview,
    link: data.homepage
  }
}

const displayTvshowData = (data) => {
  const img = $('<img>').attr('src', data.image);
  $('.tvshow_image').append(img);

  const title = $('<h3></h3>').text(data.title);
  const type = $('<p></p>').text(data.type);
  $('.tvshow_info').append(title);
  $('.tvshow_info').append(type);


}

getTvshow().then((value) => {
  displayTvshowData(value);
})