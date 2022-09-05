import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from './../firebase/config'

const error = ref()

const login = async (email: string, password: string) => {
  error.value = null

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not login')
    }

    error.value = null
    return res
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  }
}

export const useLogin = () => {
  return { error, login }
}
