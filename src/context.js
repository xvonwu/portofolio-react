import { createContext, useContext } from 'react'

export const AppCtx = createContext({ go: () => {}, loaded: false })
export const useApp = () => useContext(AppCtx)
