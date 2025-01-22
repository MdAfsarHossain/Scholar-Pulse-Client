import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

const AdminModeratorRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <LoadingSpinner />
    if (role !== 'User') return children
    return <Navigate to='/dashboard' replace='true' />
}

AdminModeratorRoute.propTypes = {
    children: PropTypes.element,
}

export default AdminModeratorRoute;
