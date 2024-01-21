import React, { useMemo } from 'react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

type DBProps = {
  children: ReactNode | ReactNode[]
}

export type BonMapType = Record<string, Bon>

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
  markUsed: (id: string, isUsed?: boolean) => Promise<void>
  bons: BonMapType
  usedBons: BonMapType
}

const TOKEN = `github_pat_11API3QVI05hq5aGZhQQIz${process.env.REACT_APP_PAT}`
const GIST_ID = process.env.REACT_APP_GIST_ID
const GIST_FILENAME = process.env.REACT_APP_GIST_FILENAME || ''

const DBContext = createContext<IDBContext | undefined>(undefined)

const DBContextProvider = ({ children }: DBProps) => {
  const [bons, setBons] = useState<BonMapType>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const usedBons = useMemo(() => {
    const res: BonMapType = {}
    Object.entries(bons).forEach(([id, bon]) => {
      if (bon.isUsed) res[id] = bon
    })

    return res
  }, [bons])

  const setDBFromResponse = useCallback((res: Response) => {
    res
      .json()
      .then((data) => {
        setBons(JSON.parse(data.files[GIST_FILENAME].content))
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

      if (!bons[id].imageUrl) {
        return
      }
      return bons[id]
    },
    [isLoading, bons]
  )

  const markUsed = useCallback(
    async (id: string, isUsed = true) => {
      if (!bons || isLoading) return

      if (!bons[id].title) {
        console.error('no bon found for id', id)
      }

      const newDB = { ...bons }
      if (isUsed) {
        newDB[id].isUsed = true
        newDB[id].usedDate = Date.now()
      } else {
        newDB[id].isUsed = false
        newDB[id].usedDate = 0
      }

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
    [bons, isLoading, setDBFromResponse]
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
        markUsed,
        bons,
        usedBons
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
