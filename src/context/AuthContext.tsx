import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
    email: string;
    name: string;
    role: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for persisted session
        const storedUser = localStorage.getItem('ocean_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string) => {
        // Simulate API call
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                // In a real app, validate password here. 
                // Since this is a demo with static credentials handled in UI, we just set the user.
                const newUser = {
                    email,
                    name: 'Ahmed Ben Salah',
                    role: 'Facility Manager',
                    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Ben+Salah&background=0A2540&color=fff'
                };
                setUser(newUser);
                localStorage.setItem('ocean_user', JSON.stringify(newUser));
                resolve(true);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ocean_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
