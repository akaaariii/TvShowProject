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
    image: (typeof data.poster_path === 'object') ? 'https://via.placeholder.com/500x281/9e9e9e/FFFFFF/?text=No image for this TV show' : `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    voteAve: data.vote_average,
    genre: data.genres[0].name,
    episode_run_time: Math.ceil((data.episode_run_time[0]) / 60),
    number_of_seasons: data.number_of_seasons,
    overview: data.overview,
    link: data.homepage
  }
}

const displayTvshowData = (data) => {
  const img = $('<img>').attr('src', data.image);
  $('.tvshow_image').append(img);

  const title = $('<h2></h2>').text(data.title);
  const genre = $('<p></p>').text(`${data.genre} • ${data.episode_run_time}h`);
  const seasons = $('<p></p>').text(`Seasons : ${data.number_of_seasons}`);
  $('.tvshow_info').append(title);
  $('.tvshow_info').append(genre);
  $('.tvshow_info').append(seasons);

  // vote average
  const progressIcon = $('<div class="progress_icon"></div>');
  const progressDiv = $('<div class="progress"></div>').attr("data-value", data.voteAve*10);
  const spanLeft = $('<span class="progress-left"></span');
  const spanRight = $('<span class="progress-right"></span');
  const spanBarLeft = $('<span class="progress-bar"></span>');
  const spanBarRight = $('<span class="progress-bar"></span>');
  
  if(data.voteAve*10 >= 80){
    spanBarLeft.addClass('border-success');
    spanBarRight.addClass('border-success');
  } else {
    spanBarLeft.addClass('border-warning');
    spanBarRight.addClass('border-warning');
  }

  spanLeft.append(spanBarLeft);
  spanRight.append(spanBarRight);
  const progressValue = $('<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"></div>');
  const pValue = $('<div class="p font-weight-bold"></div>').text(data.voteAve*10);
  const sup = $('<sup class="small"></sup>').text('%')
  pValue.append(sup);
  progressValue.append(pValue);
  progressDiv.append(spanLeft);
  progressDiv.append(spanRight);
  progressDiv.append(progressValue);
  progressIcon.append(progressDiv);
  $('.tvshow_info').append(progressIcon);

  // overview
  const overviewDiv = $('<div class="overview"></div>');
  const overviewHeader = $('<h4></h4>').text('Overview');
  const overviewText = $('<p></p>').text(data.overview);
  overviewDiv.append(overviewHeader);
  overviewDiv.append(overviewText);
  $('.tvshow_info').append(overviewDiv);

  // homepage
  const linkText = $('<p></p>').text('You want to watch this TV show? Click ');
  const link = $('<a></a>').attr('href', data.link).text('here.');
  linkText.append(link);
  $('.tvshow_info').append(linkText);



  $(".progress").each(function () {
    var value = $(this).attr("data-value");
    var left = $(this).find(".progress-left .progress-bar");
    var right = $(this).find(".progress-right .progress-bar");
  
    if (value > 0) {
      if (value <= 50) {
        right.css("transform", "rotate(" + percentageToDegrees(value) + "deg)");
      } else {
        right.css("transform", "rotate(180deg)");
        left.css(
          "transform",
          "rotate(" + percentageToDegrees(value - 50) + "deg)"
        );
      }
    }
  });
}

// For progress bar
const percentageToDegrees = (percentage) => {
  return (percentage / 100) * 360;
}


getTvshow().then((value) => {
  displayTvshowData(value);
})