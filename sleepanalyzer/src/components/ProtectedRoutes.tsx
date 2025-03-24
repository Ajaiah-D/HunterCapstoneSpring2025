import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router'
import { AuthContext } from './AuthProvider'

const ProtectedRoutes = ({...rest}) => {

    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Route {...rest}/>
}

export default ProtectedRoutes