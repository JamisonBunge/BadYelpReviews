const { RESTDataSource } = require("apollo-datasource-rest");

class Yelp extends RESTDataSource {
    constructor() {
        super();
        this.ClientID = "cC1i7w2v5wDz2muebVGVYjhYyhCPyrWM_YuzDYxTuVhjepAChCxTJDcNl_MlkAQwlgHo8zLhvsKiVEYltVWbcNGUsK9OYnHyGYAzIV9_sn3Axid8oddjla7lVrUCXXYx"
    }
    willSendRequest(request) {
        request.headers.set('Authorization', `Bearer ${this.ClientID}`);

    }
    async getReviewByPlace(location) {

        let result = await this.get("https://api.yelp.com/v3/businesses/search?location=" + location)
        let allPlaces = []
        let randomPlace = "";

        // console.log(result)

        //  let badReviews = []
        //  let responseSplit = []
        // responseSplit = result.split('<p itemprop="description">')
        //  console.log(responseSplit.length)

        // for (var y = 1; y < responseSplit.length; y++) {
        //     let review = responseSplit[y].substr(0, responseSplit[y].indexOf('<p>'));
        //     badReviews.push(review)
        // }
        //console.log(result)
        for (let x in result.businesses) {
            try {
                //console.log(result.businesses[x].alias)
                allPlaces.push(result.businesses[x].alias)
            }
            catch {

            }

        }

        let ran = Math.random() * result.businesses.length
        ran = Math.floor(ran)
        randomPlace = allPlaces[ran]
        //console.log(responseSplit[2])
        // return { "response": result, "responseSplit": responseSplit, "badReviews": badReviews, "firstReview": badReviews[1] }
        return { "allPlaces": allPlaces, "randomPlace": randomPlace }
    }
}
module.exports = Yelp
