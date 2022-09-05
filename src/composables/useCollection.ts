import { ref } from 'vue'
import { db } from '@/firebase/config'
import { collection, addDoc } from '@firebase/firestore'


export const useCollection = (message: string) => {
  const error = ref()
  // const colRef = collection(db, message)

  const docRef = async (doc: {}) => {
    error.value = null

    try {
      await addDoc(collection(db, message), doc)
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        error.value = 'Could not send the message'
      }
    }
  }
  return { error, docRef }
}
