const { GraphQLServer } = require('graphql-yoga');

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

let idCount = links.length

const resolvers = {
	Query: {
		info: () => 'This is the API of a Hackernews Clone',
		feed: () => links,
	},
	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}
			links.push(link)
			return link
		}
	},
	Link: {
		id: (parent) => parent.id,
		description: (parent) => parent.description,
		url: (parent) => parent.url,
	}
}

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
})
server.start(() => console.log('Server is running on http://localhost:4000'))