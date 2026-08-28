const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`

export function responseItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export async function fetchCollection(component, endpoint = `${API_BASE_URL}/${component}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Could not load ${component}`)
  return responseItems(await response.json())
}