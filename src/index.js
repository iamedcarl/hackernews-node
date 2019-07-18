const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
	Query: {
		info: () => 'This is the API of a Hackernews Clone',
		feed: (root, args, context, info) => {
			return context.prisma.links()
		},
		// link: (parent, args) => {
		// 	const link = links.filter(x => x.id === args.id)
		// 	return link[0]
		// }
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.createLink({
				url: args.url,
				description: args.description
			})
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
	context: { prisma },
})
server.start(() => console.log('Server is running on http://localhost:4000'))