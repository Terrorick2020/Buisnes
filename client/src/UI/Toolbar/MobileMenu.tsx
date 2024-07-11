import React, {useState} from 'react';
import ListItem from "../../components/ListItem/ListItem";
import ServiceDropDownMobile from "./components/ServiceDropDownMobile/ServiceDropDownMobile";
import ToolbarSearchBar from "./components/ToolbarSearchBar/ToolbarSearchBar";
import styles from './MobileMenu.module.scss'
import logo from '../../img/header/new-logotype.svg';
import {Link} from "react-router-dom";

const MobileMenu = () => {
  const [openItem, setOpenItem] = useState<boolean>(false);

  return (
    <div className={styles.mobileMenu}>
      <Link to="/" className={styles.mobileMenu_logo}>
        <img className={styles.mobileMenu_logo_img} src={logo} alt="Logo"/>
      </Link>
      <ul className={styles.mobileMenu_lists}>
        <ListItem link="#footer" name="Услуги" className={styles.mobileMenu_lists_item} onClick={() => setOpenItem(!openItem)}/>
          {openItem && <ServiceDropDownMobile />}
        <ListItem link="#" name="Город" className={styles.mobileMenu_lists_item}/>
        <ListItem link="#" name="Статьи"/>
        <ListItem link="#" name="Отзывы"/>
        <ListItem link="#" name="Контакты"/>
        <ListItem link="/orders" name="Мои заказы"/>
      </ul>
    </div>
  );
};

export default MobileMenu;