'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession, type Session } from 'next-auth/react'

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setIsAuthenticated(status === "authenticated")
    if (session?.user) {
      const typedUser: User = {
        id: session.user.id || "",
        name: session.user.name || null,
        email: session.user.email || null,
        image: session.user.image || null,
      }
      setUser(typedUser)
    } else {
      setUser(null)
    }
  }, [session, status])

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading: status === "loading", user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 