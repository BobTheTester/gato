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
  refreshHighScore: () => void
  highScore: number
  changeHighScore: (newHighScore: number) => void
}

const TOKEN = `github_pat_11API3QVI0Nz6WriIDd02Z${process.env.REACT_APP_PAT}`
const GIST_DB_ID = process.env.REACT_APP_GIST_ID
const GIST_BONS_FILENAME = process.env.REACT_APP_GIST_FILENAME || ''
const GIST_SCORE_ID = 'a3059fec9951567b98e1b5df2b65f1a1'
const GIST_SCORE_FILENAME = 'random.json'

const DBContext = createContext<IDBContext | undefined>(undefined)

const DBContextProvider = ({ children }: DBProps) => {
  const [bons, setBons] = useState<BonMapType>({})
  const [highScore, setHighScore] = useState(0)
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
        setBons(JSON.parse(data.files[GIST_BONS_FILENAME].content))
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  const refreshHighScore = useCallback(() => {
    fetch(`https://api.github.com/gists/${GIST_SCORE_ID}`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            setHighScore(JSON.parse(data.files[GIST_SCORE_FILENAME].content).highScore)
          })
          .catch((error) => {
            setError(error)
            setIsLoading(false)
          })
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  const refreshDB = useCallback(() => {
    setIsLoading(true)
    fetch(`https://api.github.com/gists/${GIST_DB_ID}`)
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

  const change = useCallback(
    async (gistID: string, fileName: string, newFile: Record<string, any>) => {
      const req = await fetch(`https://api.github.com/gists/${gistID}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          files: {
            [fileName]: {
              content: JSON.stringify(newFile)
            }
          }
        })
      })

      return req
    },
    []
  )

  const markUsed = useCallback(
    async (id: string, isUsed = true) => {
      if (!bons || isLoading || !GIST_DB_ID) return

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

      const req = await change(GIST_DB_ID, GIST_BONS_FILENAME, newDB)

      setDBFromResponse(req)
    },
    [bons, change, isLoading, setDBFromResponse]
  )

  const changeHighScore = useCallback(
    (newHighScore: number) => {
      change(GIST_SCORE_ID, GIST_SCORE_FILENAME, { highScore: newHighScore })
      setHighScore(newHighScore)
    },
    [change]
  )

  useEffect(() => {
    refreshDB()
  }, [refreshDB])

  useEffect(() => refreshHighScore(), [refreshHighScore])

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
        usedBons,
        refreshHighScore,
        highScore,
        changeHighScore
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
