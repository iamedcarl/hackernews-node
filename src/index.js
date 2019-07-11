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
		// link: (parent, args) => {
		// 	const link = links.filter(x => x.id === args.id)
		// 	return link[0]
		// }
	},
	Mutation: {
		createLink: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url,
			}
			links.push(link)
			return link
		},
		// updateLink: (parent, args) => {
		// 	const link = {
		// 		description: args.description,
		// 		url: args.url,
		// 	}
		// },
		// deleteLink: (parent, args) => {
		// 	return links.map(x => {
		// 		if (x.id !== args.id) {
		// 			return x
		// 		}
		// 	})
		// }
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