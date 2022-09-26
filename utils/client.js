import sanityClient from '@sanity/client'
import config from './config'

const client = sanityClient({
    projectId:config.projectId,
    dataset:config.dataset,
    useCdn: false,
    apiVersion:'2022-09-20'
})

export default client;