<template>
  <h1>Upload</h1>
  <img :src="selectedImageObjectUrl" />
  <input
    type="file"
    accept="image/*"
    label="Upload"
    @change="handleInputChange"
  />
  <button @click="uploadFile" :disabled="!selectedFile">Upload</button>
  <h1>Uploaded File</h1>
  <img src="/test.jpg" />
</template>

<script setup lang="ts">
const selectedFile = ref<File>()
const selectedImageObjectUrl = ref<string>()

async function handleInputChange(event: Event) {
  selectedFile.value = parseEventToFile(event)
  setPreviewImage(selectedFile.value)
}

function setPreviewImage(file: File): void {
  selectedImageObjectUrl.value = URL.createObjectURL(file)
}

function parseEventToFile(event: Event): File {
  const target = <HTMLInputElement>event.target
  const files = target?.files
  if (!files) throw 'No files selected'
  return files[0]
}

function readFileAsync(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = reject

    reader.readAsDataURL(file)
  })
}

async function uploadFile() {
  if (!selectedFile.value) throw 'No file selected'
  let dataUrl = await readFileAsync(selectedFile.value)

  try {
    await $fetch(`/api/upload/`, {
      method: 'POST',
      body: {
        fileName: 'test.jpg',
        file: dataUrl,
      },
    })
    location.reload()
  } catch (e) {
    alert(`Error: ${e}`)
  }
}
</script>

<style scoped>
img {
  max-height: 300px;
  max-width: 300px;
}
</style>
