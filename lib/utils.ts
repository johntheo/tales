import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

export async function retryOperation<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation, ${retries} attempts remaining...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return retryOperation(operation, retries - 1)
    }
    throw error
  }
}
