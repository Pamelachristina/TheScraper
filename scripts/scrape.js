var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.vogue.com/", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];
        var list = document.querySelector("#main > div.infinite-scroll > div > div > div:nth-child(3) > div > div > div"); 
        $("article").each(function(i, element){

            var headNeat = head.replace(/(\r\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r\t|\s+)/gm, " ").trim();

            if(head && sum){
                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };
                articles.push(dataToAdd);
            }

        });
        cb(articles);
    });
};

module.exports = scrape