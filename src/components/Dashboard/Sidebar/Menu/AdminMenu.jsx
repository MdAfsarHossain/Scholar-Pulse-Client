import { BsFillHouseAddFill, BsGraphUp } from 'react-icons/bs';
import { FaUserCog } from 'react-icons/fa';
import { MdOutlineManageHistory, MdOutlineReviews } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import MenuItem from './MenuItem';
const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={BsGraphUp} label='Statistics' address='/dashboard/statistics' />
            <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
            <MenuItem icon={BsFillHouseAddFill} label='Add Scholarship' address='add-scholarship'
            />
            <MenuItem icon={SiManageiq} label='Manage Scholarships' address='manage-scholarships'
            />
            <MenuItem icon={MdOutlineManageHistory} label='Manage Applied Applications' address='manage-applied-scholarships'
            />
            <MenuItem icon={MdOutlineReviews} label='Manage Reviews' address='manage-reviews'
            />
        </>
    )
}

export default AdminMenu
