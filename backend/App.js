const { gql, ApolloServer } = require('apollo-server')
const Page = require("./Page")
const Yelp = require("./Yelp")

const schema = gql`
type Query  {
    user: String
    page: Page
    review(location: String!): String,
    random(location: String!): Yelp
},
type Page {
    response: String,
    responseSplit: [String],
    badReviews: [String],
    randomReview: String,
    firstReview: String
},
type Yelp {
    allPlaces: [String],
    randomPlace: String,
    reviews: Page
}
`;

const resolvers = {
    Query: {
        user: () => { return "Nick Miller" },
        page: async (_parent, _args, { dataSources }) => dataSources.Page.getPage(),
        review: async (_parent, _args, { dataSources }) => dataSources.Yelp.getPage(),
        random: async (parent, { location }, { dataSources }) => dataSources.Yelp.getReviewByPlace(location)
    },
    Yelp: {
        reviews: async (parent, _args, { dataSources }) => dataSources.Page.getReviewByPlace(parent.randomPlace),
    }
}

//ApolloServer: used to init and start server
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources: () => ({
        Page: new Page,
        Yelp: new Yelp
    })
});

//starting the server
server.listen(5000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});