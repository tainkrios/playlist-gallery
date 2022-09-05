import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from './../firebase/config'

const error     = ref(),
      isPending = ref(false)

const login = async (email: string, password: string) => {
  error.value = null
  isPending.value = true

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    if (!res) {
      throw new Error('Could not login')
    }

    error.value = null
    isPending.value = false

    return res
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
      isPending.value = false

    }
  }
}

export const useLogin = () => {
  return { error, login, isPending }
}
