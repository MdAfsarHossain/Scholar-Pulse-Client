import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdOutlineManageHistory, MdOutlineReviews } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import MenuItem from './MenuItem';

const ModeratorMenu = () => {
    return (
        <>
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

export default ModeratorMenu;
