const BASE_URL = '/api'

const request = async (url, options = {}) => {
  const fullUrl = `${BASE_URL}${url}`
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  if (config.method !== 'GET' && options.data) {
    config.body = JSON.stringify(options.data)
  }

  try {
    const response = await fetch(fullUrl, config)
    const data = await response.json()
    
    if (data.code === 200) {
      return data
    } else {
      throw new Error(data.message || '请求失败')
    }
  } catch (error) {
    console.error('Request error:', error)
    throw error
  }
}

export const get = (url, params = {}) => {
  const queryString = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  const fullUrl = queryString ? `${url}?${queryString}` : url
  return request(fullUrl, { method: 'GET' })
}

export const post = (url, data = {}) => {
  return request(url, { method: 'POST', data })
}

export const put = (url, data = {}) => {
  return request(url, { method: 'PUT', data })
}

export const del = (url, data = {}) => {
  return request(url, { method: 'DELETE', data })
}

export default request