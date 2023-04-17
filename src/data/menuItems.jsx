import { FaChalkboardTeacher, FaHome, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getItem from '../helpers/getItem';

const menuItems = [
  getItem(<Link to="/">Home</Link>, '/', <FaHome />),
  getItem(<Link to="/class">Class</Link>, '/class', <FaChalkboardTeacher />),
  getItem(<Link to="/students">Student Reports</Link>, '/students', <FaUser />),
];

export default menuItems;
