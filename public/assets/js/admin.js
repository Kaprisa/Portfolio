import '../sass/pages/admin.sass';
import skills from './modules/skills';
import blog from './modules/blog';
import works from './modules/works';
import changePage from './modules/changePage';
import popup from './modules/popup';

function loadPage(path) {
  const locationArray = path.split('/');
  const page = locationArray[locationArray.length - 1]; 
  if ( page === 'about' ) {
    skills();
  } else if ( page === 'blog' ) {
    blog();
  } else if ( page === 'works' ) {
    works()
  }
}

document.querySelector('.admin-tabs').addEventListener('changePage', function(e) {
  loadPage(window.location.pathname);
});

changePage('admin-navigation');

window.onload = function() {
  loadPage(window.location.pathname);
}


