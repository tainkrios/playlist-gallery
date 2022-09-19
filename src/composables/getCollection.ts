import { db } from '../firebase/config'
import { collection, onSnapshot, query, where, WhereFilterOp } from 'firebase/firestore'
import { ref, watchEffect } from 'vue'

export const getCollection = ( col: string, qry?: any) => {
  const documents = ref(),
        error = ref(),
        colRef = collection(db, col)

  if (qry) {
    const queryRef = query(colRef, where(...qry))
  }

  const snapRef = onSnapshot(
    colRef,
    (snap) => {
      const results: { id: string }[] = []
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch data'
    }
  )

  watchEffect((onInvalidate) => {
    onInvalidate(() => {
      snapRef()
    })
  })

  return { documents, error }
}
