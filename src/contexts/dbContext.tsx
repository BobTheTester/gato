import React from 'react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

type DBProps = {
  children: ReactNode | ReactNode[]
}

export interface Bon {
  title: string
  imageUrl: string
  description: string
  isUsed: boolean
  usedDate: number
}

export interface IDBContext {
  isLoading: boolean
  getBon: (id: string) => Bon | undefined
  markUsed: (id: string) => Promise<void>
}

const TOKEN = process.env.REACT_APP_PAT
const GIST_ID = process.env.REACT_APP_GIST_ID
const GIST_FILENAME = process.env.REACT_APP_GIST_FILENAME || ''

const DBContext = createContext<IDBContext | undefined>(undefined)

const DBContextProvider = ({ children }: DBProps) => {
  const [db, setDB] = useState<Record<string, Bon>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const setDBFromResponse = useCallback((res: Response) => {
    res
      .json()
      .then((data) => {
        setDB(JSON.parse(data.files[GIST_FILENAME].content))
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  const refreshDB = useCallback(() => {
    setIsLoading(true)
    fetch(`https://api.github.com/gists/${GIST_ID}`)
      .then((response) => setDBFromResponse(response))
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [setDBFromResponse])

  const getBon = useCallback(
    (id: string) => {
      if (isLoading) return

      if (!db[id].imageUrl) {
        return
      }
      return db[id]
    },
    [isLoading, db]
  )

  const markUsed = useCallback(
    async (id: string) => {
      if (!db || isLoading) return

      if (!db[id].title) {
        console.error('no bon found for id', id)
      }

      const newDB = { ...db }
      newDB[id].isUsed = true
      newDB[id].usedDate = Date.now()

      const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          files: {
            [GIST_FILENAME]: {
              content: JSON.stringify(newDB)
            }
          }
        })
      })

      setDBFromResponse(req)
    },
    [db, isLoading, setDBFromResponse]
  )

  useEffect(() => {
    refreshDB()
  }, [refreshDB])

  useEffect(() => {
    if (error) console.error(error)
  }, [error])

  return (
    <DBContext.Provider
      value={{
        isLoading,
        getBon,
        markUsed
      }}
    >
      {children}
    </DBContext.Provider>
  )
}

const useDB = () => {
  const context = useContext(DBContext)
  if (context === undefined) {
    throw new Error('useDB must be used within a DBContextProvider')
  }
  return context
}

export { DBContextProvider, useDB }
