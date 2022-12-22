//import icons from '../img/icons.svg'; // Para la version 1 de Parcel.
import icons from 'url:../../img/icons.svg'; // Para la version 2 de Parcel.
import View from './View.js';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    //console.log(this._data);

    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
