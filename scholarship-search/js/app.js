const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('IZFENANE3V', '68bc92f31ece56c7895c84b03bc5d319');

const search = instantsearch({
  indexName: 'Scholarships',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
 <div>
          {{Scholarship}}
          <div class="hit-name">
          {{School}}

          </div>
          <div class="hit-description">
            {{#helpers.highlight}}{ "attribute": "Description" }{{/helpers.highlight}}
          </div>
          <a href="{{URL}}">Details</a>
        </div>
`,
    },
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),

  instantsearch.widgets.dynamicWidgets({
    container: '#dynamic-widgets',
    fallbackWidget({ container, attribute }) {
      return instantsearch.widgets.panel({ templates: { header: attribute } })(
        instantsearch.widgets.refinementList
      )({
        container,
        attribute,
      });
    },
    widgets: [
      container =>
        instantsearch.widgets.panel({
          templates: { header: 'URL' },
        })(instantsearch.widgets.refinementList)({
          container,
          attribute: 'URL',
        }),
    ],
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);



search.start();
