import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from './../firebase/config'

const error = ref()

const signup = async (email: string, password: string, displayName: string) => {
  error.value = null

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not complete the signup')
    }
    await updateProfile(auth.currentUser!, { displayName })
    error.value = null

    return res
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}

export const useSignup = () => {
  return { error, signup }
}
