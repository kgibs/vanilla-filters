# Pure JavaScript Content Filters

[View the demo.](http://thephuse.github.io/pure-js-content-filters)

### Simple, pure JavaScript content filtering.

#### License: [MIT](https://github.com/thephuse/pure-js-content-filters/license.txt)

## Usage

#### 1. Include the script in the footer of your project.
```<script type="text/javascript" src="/vanilla-filters/vanilla-filters.js"></script>```

#### 2. Include the stylesheet in the header.
```<link rel="stylesheet" href="vanilla-filters/style-philters.css" />```

#### 3. Create the HTML for your page, styling as desired. (TO DO)
Your filter links should have a parent container with a unique ID and/or class. Each link should have a unique hash link (can be descriptive of your filter or anything you'd like). 

The Surprise Me and Clear Filters links are optional, but if included must have a unique class or ID.

For example:
```html
  <ul id="filter-links">
    <li><a href="#philter-1">Filter 1</a></li>
    <li><a href="#philter-2">Filter 2</a></li>
    <li><a href="#philter-3">Filter 3</a></li>
    <li><a href="#philter-4">Filter 4</a></li>
    <li><a id="surprise-me" href="#surprise-me">Surprise Me</a></li>
    <li><a id="clear-philters" href="#clear-philters">Clear Filters</a></li>
  </ul>
```

Your results (the content being filtered) should also have a parent container with a unique ID or class. Each single result (the immediate child elements of the parent container) should have classes equal to their relevant filter(s) hash links minus the `#`.

For example:
```html
  <div id="results">
    <div class="philter-1">Post 1</div>
    <div class="philter-1 philter-4">Post 2</div>
    <div class="philter-2">Post 3</div>
    <div class="philter-3">Post 4</div>
    <div class="philter-1 philter-2">Post 5</div>
    <div class="philter-4">Post 6</div>
    <div class="philter-1 philter-3 philter-4">Post 7</div>
    <div class="philter-1 philter-4">Post 8</div>
    <div class="philter-1 philter-2 philter-4">Post 9</div>
  </div>  
```

#### 4. Call the function with your parameters and any desired user options.
`philterContent(philtersContainer, resultsContainer, userOptions);`

The `philtersContainer` and `resultsContainer` parameters are required. You should replace each with the selector for the containing element of each section. For example: 

`philterContent('#filters-container', '.results-container')`. 

Both parameters can accept classes or IDs.

The `userOptions` object is composed of optional key/value pairs to give you additional control over your filters. Defaults are overridden by providing options for this parameter.

#### Defaults:

````js
{
  viewFilters: 'View Filters',
  hideFilters: 'Hide Filters',
  clearTarget: '', // Clear Filters element id or class if functionality is desired. Leave as empty string to exclude from your filters.
  clearFilters: 'Clear Filters',
  surpriseTarget: '', // Surprise element id or class if functionality is desired. Leave as empty string to exclude from your filters.
  surpriseMe: 'Surprise Me',
  warningMsg: 'Whoops! Looks like your search is too narrow. Try removing a selected filter or clear all filters to try again.'
}
````

## Caveat
These filters are designed to work in instances where all filtered content is on the same page. Therefore, the filters will not work properly across paginated results / content.

## Compatibility

This script has been tested in IE 11 and the latest releases of Chrome, Firefox, Safari and mobile Safari browsers.