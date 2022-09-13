import { storage } from '../firebase/config'
import { ref } from '@vue/reactivity'
import { getUser } from './getUser'
import { getDownloadURL, ref as stRef, uploadBytes } from 'firebase/storage'

const { user } = getUser()

export const useStorage  = () => {
  const error    = ref(),
        url      = ref(),
        filePath = ref()

  const uploadImage = async (file: File) => { 
    filePath.value = `covers/${user.value?.uid}/${file.name}`
    const storageRef = stRef(storage, filePath.value)

    try {
      await uploadBytes(storageRef, file)
      url.value = getDownloadURL(storageRef)
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        error.value = err.message
      }
    }
   }

  return { error, url, filePath, uploadImage }
}