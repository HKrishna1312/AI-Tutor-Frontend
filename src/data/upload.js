export const uploadSteps = [
  { name: 'Resume uploaded', ok: true },
  { name: 'Extracting information' },
  { name: 'Analyzing resume' },
  { name: 'Creating AI embeddings' },
  { name: 'Storing resume' },
  { name: 'Resume ready', ok: true },
]

export function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}