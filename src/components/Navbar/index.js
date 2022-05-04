import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { MenuList } from "./MenuList";
import Logo from '../../assets/marketlogo.png'
import "./styles.scss";
import { MenuOutlined } from "@ant-design/icons";


const Navbar = () => {
  const history = useHistory()
  const [clicked, setClicked] = useState(false);
  const user = JSON.parse(localStorage.getItem('userAuth'))
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        <NavLink exact to={url} activeClassName="active">
          {title}
        </NavLink>
      </li>
    );
  });

  const handleClick = () => {
    setClicked(!clicked);
  }

  const logout = () => {
    localStorage.clear()
    history.push('/')
    window.location.reload();
  }

  return (
    <nav>
      <div onClick={()=> history.push('/')} className="logo">
        <img src={Logo} style={{width:300, height:50, objectFit:'contain'}} alt='logo' />
      </div>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}><MenuOutlined /></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list closes"}>
        {menuList}
        {user && user.userType === 'admin' && <li>
          <NavLink to={'/usermanage'}  activeClassName="active">
            User Management
          </NavLink>
        </li>}
        {user && user.userType === 'admin' && <li>
          <NavLink to={'/adminreports'}  activeClassName="active">
            Reports
          </NavLink>
        </li>}
        <li>
          <NavLink to={'/'} onClick={logout} className='logout'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar