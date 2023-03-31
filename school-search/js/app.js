const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch('IZFENANE3V', '68bc92f31ece56c7895c84b03bc5d319');

const search = instantsearch({
  indexName: 'Schools',
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
          <strong>{{INSTNM}}</strong>
          <div class="hit-name">
          {{CITY}}, {{STATE}}
          </div>
          <div class="hit-description">
           <strong>Info</strong><br>
            {{#helpers.highlight}}{ "attribute": "INFO" }{{/helpers.highlight}}
            <br><br>
            <strong>Admission Info</strong>
            
            <br>{{#helpers.highlight}}{ "attribute": "ADMISSION_INFO" }{{/helpers.highlight}}<br><br>
            <strong>Majors</strong>
 <br>{{#helpers.highlight}}{ "attribute": "MAJORS" }{{/helpers.highlight}}<br><br>
          </div>
          <a href="/schools/{{FILENAME}}">Details</a>
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
