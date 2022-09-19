import { db } from '../firebase/config'
import { collection, DocumentData, FieldPath, onSnapshot, Query, query, where, WhereFilterOp } from 'firebase/firestore'
import { ref, watchEffect } from 'vue'

export const getCollection = (
  col: string,
  q?: [string | FieldPath, WhereFilterOp, unknown]
) => {
  const documents = ref(),
    error = ref()

  let colRef = collection(db, col)

  if (q) {
    (colRef as Query<DocumentData>) = query(colRef, where(...q))
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
