import { db } from '../firebase/config'
import { onSnapshot } from '@firebase/firestore'
import { ref, watchEffect } from 'vue'
import { doc } from 'firebase/firestore'

export const getDocument = (col: string, id: string) => {
  const document = ref(),
        error = ref(),
        docRef = doc(db, col, id)

  const snapRef = onSnapshot(docRef, (docmnt) => {
      if (docmnt.data()) {
        document.value = { ...docmnt.data(), id: docmnt.id}
        error.value = null
      } else {
        error.value = 'that document does not exsist'
      }
    },
    (err) => {
      console.log(err.message)
      error.value = 'could not fetch document'
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      snapRef()
    })
  })

  return { document, error }
}
