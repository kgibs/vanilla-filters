let activeFilters = null;

function philterContent(philtersContainer, resultsContainer, userOptions){
  "use strict";

  /********************
   Set Options
  *********************/
  let optionDefaults = {
    viewFilters: 'View Filters',
    hideFilters: 'Hide Filters',
    clearTarget: '', // Clear Filters element id or class if desired. Leave as empty string to exclude from your filters.
    clearFilters: 'Clear Filters',
    surpriseTarget: '', // Surprise element id or class if desired. Leave as empty string to exclude from your filters.
    surpriseMe: 'Surprise Me',
    warningMsg: 'Whoops! Looks like your search is too narrow. Try removing a selected filter or clear all filters to try again.'
  };

  // combine default and user set options
  let options = extend(optionDefaults, userOptions);

  /***************************************************
    Insert Show/Hide Filters content into container
  ****************************************************/
  const elContainer = document.querySelector(philtersContainer);
  elContainer.classList.add('philters-parent');
  const el = document.createElement('h4');
  el.className = 'philters-trigger';
  el.innerHTML = '<span class="default-title">' + options.viewFilters + '</span><span class="alt-title">' + options.hideFilters + '</span>';

  elContainer.parentNode.insertBefore(el, elContainer);

  // Hide filters intially
  elContainer.classList.add('hide');

  /***************************************************
    Show/Hide Filters functionality
  ****************************************************/
  document.querySelector('.philters-trigger').addEventListener('click', function(e){
    e.preventDefault();
    if(elContainer.classList.contains('hide')) {
      elContainer.classList.remove('hide');
      this.classList.add('philters-open');
    } else {
      elContainer.classList.add('hide');
      this.classList.remove('philters-open');
    }
  });


  /*************************
    Filter Functionality
  *************************/

  // set the initial state of all results to active (display all results by default)
  const resultsParent = document.querySelector(resultsContainer);
  const results = resultsParent.children;

  for (let result of results) {
    result.classList.add('philter-active');
  }

  // set filter as active or inactive on click and update results with toggleVisible() function
  let philterLinks;

  if(options.surpriseTarget !== ''){
    // if user is including Surprise Me functionality, don't add the filter click function to it
    philterLinks = document.querySelectorAll(philtersContainer + ' a:not(' + options.surpriseTarget + ')');
  } else {
    philterLinks = document.querySelectorAll(philtersContainer + ' a');
  }

  for (let link of philterLinks) {
    link.addEventListener('click', function(e){
      e.preventDefault();
      if (this.classList.contains('activate-philter')){
        this.classList.remove('activate-philter');
      } else {
        this.classList.add('activate-philter');
      }
      toggleVisible();
    });
  }

  // Clear Filters functionality. Show if option is true.
  if(options.clearTarget !== ''){
    document.querySelector(options.clearTarget).innerHTML = options.clearFilters;

    document.querySelector(options.clearTarget).addEventListener('click', function(e){
      e.preventDefault();
      // clear all activated filters and reset results upon click of Clear Filters link
      for (let reset of document.querySelectorAll('.activate-philter')) {
        reset.classList.remove('activate-philter');
      }
      toggleVisible();
    });
  }

  // "Surprise me" functionality -- add in if user has set surpriseTarget
  if(options.surpriseTarget !== ''){
    document.querySelector(options.surpriseTarget).innerHTML = options.surpriseMe;

    document.querySelector(options.surpriseTarget).addEventListener('click', function(e){
      e.preventDefault();

      const activeResults = document.querySelectorAll('.philter-active');
      const randomNum = Math.floor(Math.random() * activeResults.length);

      // get a random post of the current active results and trigger the click function on it
      activeResults[randomNum].classList.add('random');

      // hide all results except for randomly selected only
      for (let hideEm of document.querySelectorAll('.philter-active')) {
        hideEm.classList.remove('philter-active');
      }

      // redirect to URL of randomly selected item
      window.location = document.querySelector('.random a').getAttribute('href');
    });
  }

  /*************************
    Append warning message
  *************************/
  const warningMsg = document.createElement('p');
  warningMsg.id = 'philter-warning';
  warningMsg.innerHTML = options.warningMsg;

  resultsParent.parentNode.insertBefore(warningMsg, resultsParent.nextSibling);


  function toggleVisible() {
    // create an empty array that we'll add any active filters to
    activeFilters = [];

    // add href target of activated filters to the activeFilters array
    const getActiveFilters = document.querySelectorAll(philtersContainer + ' a.activate-philter');

    for (let i = 0; i < getActiveFilters.length; i++) {
      let hrefTarget = getActiveFilters[i].getAttribute('href').substr(1);
      activeFilters.push(hrefTarget);
    }

    // loop through results to show only those with a class of the activated filter(s)
    for (let single of results) {
      let showThis = true;

      for (let filter of activeFilters) {
        if (single.classList.contains(filter)) {
          showThis;
        } else {
          showThis = false;
        }
      }

      if(showThis) {
        single.classList.add('philter-active');
      } else {
        single.classList.remove('philter-active');
      }
    }

    // if there are no results with the activated filter(s), show the warning / error message
    const warningAlert = document.querySelector('#philter-warning');

    if(document.querySelectorAll('.result.philter-active').length === 0){
      warningAlert.classList.add('msg-visible');
    } else {
      warningAlert.classList.remove('msg-visible');
    }
  }
}

/*************************************************
  Combine default and any user set parameters
*************************************************/
function extend () {
  // Variables
  let extended = {};

  // Merge the object into the extended object
  let merge = function (obj) {
    for ( let prop in obj ) {
      if ( obj.hasOwnProperty( prop ) ) {
        extended[prop] = obj[prop];
      }
    }
  };

  // Loop through each object and conduct a merge
  for (let i = 0; i < arguments.length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};
