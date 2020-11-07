$(function () {
  let favoriteList = localStorage.getItem("favorite") ? JSON.parse(localStorage.getItem("favorite")) : [];

  const getAllList = async () => {
    try {
      var response = await $.ajax({
        url: `https://api.themoviedb.org/3/tv/popular?api_key=${config.API_KEY}`,
        type: "GET",
        dataType: "json",
      });
      return sanitizeMovies(response);
    } catch (error) {
      console.log(error);
    }
  };

  const sanitizeMovies = (response) => {
    let movieList = [];
    // console.log(response.results)
    response.results.forEach((d) => {
      let data = {
        title: d.original_name,
        image: "https://image.tmdb.org/t/p/w440_and_h660_face" + d.poster_path,
        vote: d.vote_average,
        id: d.id,
      };
      movieList.push(data);
    });
    return movieList;
  };
  const checkfavorite = (item) => {
    const index = favoriteList.findIndex((e) => e.id === item.id);
    return index < 0 ? false : true;
  };

  const handlefavoriteList = (movieList) => {
    $(".fa-heart").click((e) => {
      const target = $(e.target);
      const targetId = target.parent().attr("id");
      const id = parseInt(targetId);
      const favorite = movieList.find((list) => parseInt(list.id) === id);
      const favIndex = favoriteList.findIndex((list) => parseInt(list.id) === id);
      console.log(favIndex);
      if (favIndex < 0) {
        favoriteList.push(favorite);
      } else {
        favoriteList.splice(favIndex, 1);
      }
      localStorage.setItem("favorite", JSON.stringify(favoriteList));
      target.toggleClass("favorite");
      console.log(favoriteList);
    });
  };

  const redirectToTvshowPage = () => {
    $("img").click((e) => {
      const target = $(e.target);
      const id = target.attr("id");
      open(`./tvShowPage.html?id=${id}`, "_blank");
    });
  };

  const displayMovieData = async (movieList) => {
    const list = $(".list");
    list.empty();
    movieList.forEach((d) => {
      console.log(d);
      const isfavorite = checkfavorite(d);
      const card = $('<div class="card"></div>');
      const img = $("<img>").attr("src", d.image).attr("id", d.id);
      const cardBody = $('<div class="card-body"></div>');
      const cardInfo = $('<div class="card-info"></div>').attr("id", d.id);
      const title = $('<h5 class="card-title"></h5>').text(d.title);
      //const vote = $('<h5 class="rating"></h5>').text(`Rate : ${d.vote}%`);
      const icon = isfavorite ? $('<i class="fas fa-heart favorite"></i>') : $('<i class="fas fa-heart"></i>');

      //cardTitle.append(vote);
      cardBody.append(img);
      cardInfo.append(icon);
      cardInfo.append(title);
      cardBody.append(cardInfo);
      card.append(cardBody);
      list.append(card);

      // vote average
      const progressIcon = $('<div class="progress_icon"></div>');
      const progressDiv = $('<div class="progress"></div>').attr("data-value", d.vote * 10);
      const spanLeft = $('<span class="progress-left"></span');
      const spanRight = $('<span class="progress-right"></span');
      const spanBarLeft = $('<span class="progress-bar"></span>');
      const spanBarRight = $('<span class="progress-bar"></span>');

      if (d.vote * 10 >= 80) {
        spanBarLeft.addClass("border-success");
        spanBarRight.addClass("border-success");
      } else {
        spanBarLeft.addClass("border-warning");
        spanBarRight.addClass("border-warning");
      }

      spanLeft.append(spanBarLeft);
      spanRight.append(spanBarRight);
      const progressValue = $('<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"></div>');
      const pValue = $('<div class="p font-weight-bold"></div>').text(d.vote * 10);
      const sup = $('<sup class="small"></sup>').text("%");
      pValue.append(sup);
      progressValue.append(pValue);
      progressDiv.append(spanLeft);
      progressDiv.append(spanRight);
      progressDiv.append(progressValue);
      progressIcon.append(progressDiv);
      card.append(progressIcon);

      list.append(card);
    });

    $(".progress").each(function () {
      var value = $(this).attr("data-value");
      var left = $(this).find(".progress-left .progress-bar");
      var right = $(this).find(".progress-right .progress-bar");

      if (value > 0) {
        if (value <= 50) {
          right.css(
            "transform",
            "rotate(" + percentageToDegrees(value) + "deg)"
          );
        } else {
          right.css("transform", "rotate(180deg)");
          left.css(
            "transform",
            "rotate(" + percentageToDegrees(value - 50) + "deg)"
          );
        }
      }
    });
    handlefavoriteList(movieList);

    redirectToTvshowPage();
  };

  // For progress bar
  const percentageToDegrees = (percentage) => {
    return (percentage / 100) * 360;
  };

  const displayFavoriteList = async (movieList) => {
    const list = $(".list2");
    list.empty();
    if (movieList.length > 0) {
      movieList.forEach((d) => {
        const card = $('<div class="card"></div>');
        const img = $("<img>").attr("src", d.image).attr("id", d.id);
        const cardBody = $('<div class="card-body"></div>');
        const cardInfo = $('<div class="card-info"></div>').attr("id", d.id);
        const title = $('<h5 class="card-title"></h5>').text(d.title);
        cardBody.append(img);
        cardInfo.append(title);
        cardBody.append(cardInfo);
        card.append(cardBody);
        list.append(card);

        // vote average
        const progressIcon = $('<div class="progress_icon"></div>');
        const progressDiv = $('<div class="progress"></div>').attr("data-value", d.vote * 10);
        const spanLeft = $('<span class="progress-left"></span');
        const spanRight = $('<span class="progress-right"></span');
        const spanBarLeft = $('<span class="progress-bar"></span>');
        const spanBarRight = $('<span class="progress-bar"></span>');

        if (d.vote * 10 >= 80) {
          spanBarLeft.addClass("border-success");
          spanBarRight.addClass("border-success");
        } else {
          spanBarLeft.addClass("border-warning");
          spanBarRight.addClass("border-warning");
        }

        spanLeft.append(spanBarLeft);
        spanRight.append(spanBarRight);
        const progressValue = $('<div class="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"></div>');
        const pValue = $('<div class="p font-weight-bold"></div>').text(d.vote * 10);
        const sup = $('<sup class="small"></sup>').text("%");
        pValue.append(sup);
        progressValue.append(pValue);
        progressDiv.append(spanLeft);
        progressDiv.append(spanRight);
        progressDiv.append(progressValue);
        progressIcon.append(progressDiv);
        card.append(progressIcon);

        list.append(card);
      });

      $(".progress").each(function () {
        var value = $(this).attr("data-value");
        var left = $(this).find(".progress-left .progress-bar");
        var right = $(this).find(".progress-right .progress-bar");

        if (value > 0) {
          if (value <= 50) {
            right.css(
              "transform",
              "rotate(" + percentageToDegrees(value) + "deg)"
            );
          } else {
            right.css("transform", "rotate(180deg)");
            left.css(
              "transform",
              "rotate(" + percentageToDegrees(value - 50) + "deg)"
            );
          }
        }
      });
    } else {
      const body = $('<div class="message"></div>');
      const message = $("<h3></h3>").text("You do not have any favorite list");
      body.append(message);
      list.append(body);
    }
  };

  getAllList().then((movieList) => {
    displayMovieData(movieList);
  });
  displayFavoriteList(favoriteList);
});
