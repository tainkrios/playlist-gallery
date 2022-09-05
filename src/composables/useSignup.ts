import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from './../firebase/config'

const error     = ref(),
      isPending = ref(false)


const signup = async (email: string, password: string, displayName: string) => {
  error.value     = null
  isPending.value = true

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await updateProfile(auth.currentUser!, { displayName })
    error.value     = null
    isPending.value = false

    return res
  } catch (err) {
    if (err instanceof Error) {
      error.value     = err.message
      isPending.value = false
    }
  }
}

export const useSignup = () => {
  return { error, signup, isPending }
}
