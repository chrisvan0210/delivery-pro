const sanityClient = require('@sanity/client')
// const { ImageUrlBuilder } = require('@sanity/image-url/lib/types/builder')
// import myConfiguredSanityClient from './sanityClient'
import imageUrlBuilder from '@sanity/image-url'

const client = sanityClient({
    projectId: '5hcphafm',

    dataset: 'production',
    apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
    //   token: 'sanity-auth-token', // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client