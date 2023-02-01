import { FaChalkboardTeacher, FaHome, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getItem from '../helpers/getItem';

const menuItems = [
  getItem(<Link to="/">Dashboard</Link>, '/', <FaHome />),
  getItem(
    <Link to="/meetings">Meetings</Link>,
    '/meetings',
    <FaChalkboardTeacher />
  ),
  getItem(<Link to="/students">Students</Link>, '/students', <FaUser />),
];

export default menuItems;
