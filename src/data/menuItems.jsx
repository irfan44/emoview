import { FaChalkboardTeacher, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import getItem from "../helpers/getItem";

const menuItems = [
  getItem(<Link to="/">Dashboard</Link>, "/", <FaHome />),
  getItem(
    <Link to="/meetings">Meetings</Link>,
    "/meetings",
    <FaChalkboardTeacher />
  ),
];

export default menuItems;
