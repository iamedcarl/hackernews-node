const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
	type Query {
		info: String!
		feed: [Link!]!
	}

	type Link {
		id: ID!
		description: String!
		url: String!
	}
`

// Temporaryily storing in-memory rather than being persisted in a database
let links = [
	{
		id: 'link-0',
		url: 'www.howtographql.com',
		description: 'Fullstack Tutorial for GraphQL'
	},
	{
		id: 'link-1',
		url: 'www.edcarladraincem.com',
		description: 'Personal Site of Edcarl Adraincem'
	}
]

const resolvers = {
	Query: {
		info: () => 'This is the API of a Hackernews Clone',
		feed: () => links,
	},
	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url,
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers,
})
server.start(() => console.log('Server is running on http://localhost:4000'))