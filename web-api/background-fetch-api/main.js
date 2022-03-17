(function () {
  const movie = document.querySelector('#movie');
  movie.addEventListener('click', async ({target}) => {
    const movieItem = target.closest('.movie-item');
    const movieSrc = movieItem.dataset.src;

    if (!('BackgroundFetchManager' in self)) {
      // fallback
      console.log('fetch fallback!');
      return;
    }

    const reg = await navigator.serviceWorker.ready;
    const bgFetch = await reg.backgroundFetch.fetch(movieSrc, [movieSrc], {
      title: 'download movie',
    });
  })

  function init() {
    navigator.serviceWorker.register('./sw.js', {scope: './'});
  }

  if ('serviceWorker' in navigator) {
    init();
  }
})();
