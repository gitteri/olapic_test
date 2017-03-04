import axios from 'axios'

// Request URL:http://photorankapi-a.akamaihd.net/customers/217704/streams/search?tag_key=og-category-featured&auth_token=0cc0a1982eadf92e8a18bdd073268c2cfd18e5ea919ec655f98f98647a9c8536&version=v2.2
const apiDomain = 'http://photorankapi-a.akamaihd.net'
const customerId = '215757'
const authToken = '0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18'

const defaultOptions = {method: 'customers', method_id: customerId}

const mediaRequest = (options) => {
  return `${apiDomain}/${options.method}/${options.method_id}/media/recent?auth_token=${authToken}&version=v2.2`
}

export const getPhotos = (customUrl = '') => {
  let url = customUrl || mediaRequest(defaultOptions)
  return axios.get(url)
}
