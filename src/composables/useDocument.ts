import { doc, deleteDoc } from '@firebase/firestore'
import { ref }            from "@vue/reactivity"
import { db }             from '../firebase/config'

export const useDocument = (collection: string, id: string) => {
  const error     = ref(),
        isPending = ref(false),
        docRef    = doc(db, collection, id)

  const deleteDocument = async () => { 
    isPending.value = true
    error.value = null
    try {
      await deleteDoc(docRef)
      isPending.value = false
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        isPending.value = false
        error.value = 'could not delete the document'
      }
    }
   }

  return { error, isPending, deleteDocument }
}