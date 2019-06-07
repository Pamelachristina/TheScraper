$(document).ready(function() {
    var articleContainer = $(".article-container");
    $(document).on("click", "btn.save", handleArticleSave);
    $(document).on("click", "scrape-new", handleArticleScrape);

    //Once the page is ready, run the initPage function to kick things off
    initPage();

    function initPage() {
        // empty the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data) {
            // if we have headlines, render them to the page
            if (data && data.length) {
                renderArticles(data);
            }
            else {
                // Otherwise render a message explaining we have no articles
                renderEmpty();
            }

        });
    }

    function renderArticles(articles) {
        // This function handles appending HTML coantaining our article datat to the page
        // We are passed an array of JSON containing all available articles in our databases

        var articlePanels = [];
        // We pass each article JSON object to the createPanel function which returns a bootstrap panel with our 
        // article data inside
        for (var i = 0; i < articles.length i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        // ONce we have all of the HTML for thr articles stored in our articlePanels array, 
        // append them to the articlePanels container

    articleContainer.append(articlePanels);

    }

    function createPanel(article) {
        var panel = 
            $(["<div class= 'panel-default>",
              "<div class= 'panel-heading'>",
              "<h3>",
              article.headline,
              "<a class='btn btn-success save'>",
              "Save Article",
              "</a>",
              "</h3>",
              "</div>",
              "<div class='panel-body'>",
              article.summary,
              "</div>",
              "</div>"
             ].join(""));

        
    }
    
})