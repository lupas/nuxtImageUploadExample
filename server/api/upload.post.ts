import fs from 'fs-extra'

export default defineEventHandler(async (event) => {
  const { fileName, file } = await readBody(event)

  await saveFile(fileName, file)
  return 'Success'
})

async function saveFile(fileName: string, file: string) {
  // IMPORTANT: Don't do this, this won't work.
  // Issue: This is not a cloud-native approach, will not work in docker or on iAPC etc.
  // Solution: Save assets to external storage instead of local file system, e.g. S3.
  const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '')
  fs.writeFileSync(`./public/${fileName}`, base64Data, 'base64')
}
