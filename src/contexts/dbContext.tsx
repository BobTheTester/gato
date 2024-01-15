import React from 'react'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'

type DBProps = {
  children: ReactNode | ReactNode[]
}

export interface Bon {
  title: string
  imageUrl: string
}

export interface IDBContext {
  getBon: (id: string) => Bon
}

const DBContext = createContext<IDBContext | undefined>(undefined)

const DBContextProvider = ({ children }: DBProps) => {
  const getBon = useCallback((id: string) => {
    console.log('id', id)
    return { title: 'bla', imageUrl: 'ok' } as Bon
  }, [])

  return (
    <DBContext.Provider
      value={{
        getBon
      }}
    >
      {children}
    </DBContext.Provider>
  )
}

const useDB = () => {
  const context = useContext(DBContext)
  if (context === undefined) {
    throw new Error('useWatchedAddresses must be used within a WatchedAddressesContextProvider')
  }
  return context
}

export { DBContextProvider, useDB }
