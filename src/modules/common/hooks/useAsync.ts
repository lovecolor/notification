import { useState, useCallback, useEffect } from "react"

const useAsync = <T>(asyncFuntion: (...data: any) => any, immediate = false) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<T>()

  const run = useCallback(
    async (...data: any) => {
      setLoading(true)
      setError(null)
      try {
        const responseData = await asyncFuntion(...data)
        setResult(responseData)
        setLoading(false)
      } catch (error: any) {
        setError(error)
        setLoading(false)
      }
    },
    [asyncFuntion]
  )

  useEffect(() => {
    immediate && run()
  }, [])

  return {
    run,
    loading,
    error,
    result,
    resolve: setResult,
  }
}

export default useAsync
