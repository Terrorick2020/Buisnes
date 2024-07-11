import React, { useState } from 'react';
import '../../scss/style.css'
import DropdownService from "../dropdownService";
import {Link} from 'react-router-dom'
import ListItem from "../ListItem/ListItem";



const Menu = ({ active, setActive }) => {
    const [visibleCountry, setVisibleCountry] = useState<boolean>(false);
    const [visibleService, setVisibleService] = useState<boolean>(false);
    const [menuActive, setMenuActive] = useState<boolean>(false);

    return (
        <div className={active ? 'menu active' : 'menu'} onClick={() => setActive(false)}>
            <div className="menu__content" onClick={e => e.stopPropagation()}>
                {/* <div className="header__profile">
                    <Link to="/login" onClick={() => setActive(false)} className='login__link__pourhoie'>
                        Вход
                    </Link>
                    <Link to="/pick-login" onClick={() => setActive(false)} className='regis__link__pourhoie regis__link__pourhoiemenu'>
                        Регистрация
                    </Link>
                </div> */}
                <ul>
                    <ListItem link="#footer" name="Услуги" onClick={() => setActive(false)} />
                    <ListItem link="#" name="Город" onClick={() => setActive(false)} />
                    <ListItem link="#" name="Статьи" onClick={() => setActive(false)} />
                    <ListItem link="#" name="Отзывы" onClick={() => setActive(false)} />
                    <ListItem link="#" name="Контакты" onClick={() => setActive(false)} />
                </ul>
            </div>
        </div>
    );
};

export default Menu;