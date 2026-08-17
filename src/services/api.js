import axios from 'axios'
const api = axios.create({ baseURL: '/api', timeout: 10000 })
api.interceptors.response.use(r => r.data, e => Promise.reject(e))

export const statsAPI       = { get: ()    => api.get('/stats') }
export const docsAPI        = {
  scan:    (file) => { const fd = new FormData(); fd.append('file', file); return api.post('/documents/scan', fd) },
  fill:    (d)    => api.post('/documents/autofill', d),
  genCert: (d)    => api.post('/documents/certificate', d),
  types:   ()     => api.get('/documents/cert-types'),
}
export const chatAPI        = { send: (d)  => api.post('/chatbot', d) }
export const trackerAPI     = { list: (s)  => api.get('/tracker', { params: { status: s } }), check: (id) => api.get(`/tracker/${id}`) }
export const billingAPI     = { fetch: (d) => api.post('/billing/fetch', d), pay: (d) => api.post('/billing/pay', d) }
export const agriAPI        = { register: (d) => api.post('/agriculture/pm-kisan', d), schemes: () => api.get('/agriculture/schemes') }
export const healthAPI      = { ayushman: (d) => api.post('/health/ayushman', d) }
export const eduAPI         = { scholarship: (d) => api.post('/education/scholarship', d) }
export const operatorAPI    = { report: () => api.get('/operator/report'), notifs: () => api.get('/operator/notifications') }
