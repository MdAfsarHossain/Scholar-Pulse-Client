import { BsFingerprint } from 'react-icons/bs'
import { MdOutlineReviews } from "react-icons/md"
import MenuItem from './MenuItem'

const UserMenu = () => {

    return (
        <>
            <MenuItem icon={BsFingerprint} label='My Applications' address='my-applications' />
            <MenuItem icon={MdOutlineReviews} label='My reviews' address='my-reviews' />
        </>
    )
}

export default UserMenu
