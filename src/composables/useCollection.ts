import { ref } from 'vue'
import { db } from '../firebase/config'
import { collection, addDoc } from '@firebase/firestore'


export const useCollection = (message: string) => {
  const error     = ref(),
        isPending = ref(false)

  const docRef = async (doc: {}) => {
    error.value     = null
    isPending.value = true

    try {
      await addDoc(collection(db, message), doc)
      isPending.value = false
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        error.value     = 'Could not send the message'
        isPending.value = false
      }
    }
  }
  return { error, docRef, isPending }
}
