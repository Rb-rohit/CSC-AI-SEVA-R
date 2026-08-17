import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

function readSession() {
  try { return JSON.parse(localStorage.getItem('csc-session') || 'null') } catch { return null }
}

export function AuthProvider({ children }) {
  const [operator, setOperator] = useState(readSession)
  const value = useMemo(() => ({
    operator,
    isAuthenticated: Boolean(operator),
    signIn: session => { localStorage.setItem('csc-session', JSON.stringify(session)); setOperator(session) },
    signOut: () => { localStorage.removeItem('csc-session'); setOperator(null) },
  }), [operator])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
