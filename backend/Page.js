const { RESTDataSource } = require("apollo-datasource-rest");

class Page extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "ed2n0vspsa3f8qjz10kbe7yq99vzvd"
    }
    willSendRequest(request) {
        request.headers.set('Client-ID', this.ClientID);
    }
    async getPage() {

        let result = await this.get("https://www.yelp.com/biz/upper-crust-bake-house-fredonia?sort_by=rating_asc")

        let badReviews = []
        let responseSplit = []
        responseSplit = result.split('<p itemprop="description">')
        console.log(responseSplit.length)

        for (var y = 1; y < responseSplit.length; y++) {
            let review = responseSplit[y].substr(0, responseSplit[y].indexOf('<p>'));
            badReviews.push(review)
        }

        console.log(responseSplit[2])
        return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1] }
    }


    async getReviewByPlace(location) {

        console.log("https://www.yelp.com/biz/" + location + "?sort_by=rating_asc")
        let result = await this.get("https://www.yelp.com/biz/" + location + "?sort_by=rating_asc")
        let badReviews = []
        let responseSplit = []
        console.log("https://www.yelp.com/biz/" + location + "?sort_by=rating_asc")
        responseSplit = result.split('<p itemprop="description">')
        console.log(result)
        //console.log(responseSplit.length)

        for (var y = 1; y < responseSplit.length; y++) {
            let review = responseSplit[y].substr(0, responseSplit[y].indexOf('<p>'));
            badReviews.push(review)
        }

        // console.log(responseSplit[2])
        return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1], "randomReview": "Nick Millers House" }
    }



}
module.exports = Page
