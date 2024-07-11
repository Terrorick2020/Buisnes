import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import SERVER_PATH from "../../constants/SERVER_PATH";
import {selectUI} from "../../slices/ui.slice";
import {selectUser} from "../../slices/user.slice";
import {selectUnreadMessages} from "../../slices/messages.slice";
import DropdownSetout from "../../components/dropdownSetout";
import ListItem from "../../components/ListItem/ListItem";
import ToolbarButtons from "./components/ToolbarButtons/ToolbarButtons";
import MobileMenu from "./MobileMenu";
import ToolbarSearchBar from "./components/ToolbarSearchBar/ToolbarSearchBar";
import ServiceDropdown from "./components/ServiceDropdown/ServiceDropdown";
import logo from '../../img/header/new-logotype.svg';
import arrowDown from '../../img/header/icons/arrow-down-icon.svg';
import styles from './Toolbar.module.scss';

// Исправила и буду исправлять порядок импортов во всем проекте . Лучше импортировать в следующем порядке:
// 1: импорты React
// 2: импорты зависимостей
// 3: компонентов
// 4: стилей

const Toolbar = () => {
  const [visibleCountry, setVisibleCountry] = useState<boolean>(false);
  const [visibleSetout, setVisibleSetout] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(false);

  const ui = useSelector(selectUI);
  const user = useSelector(selectUser);
  const messages = useSelector(selectUnreadMessages);

  return (
    <header>
      <div className={`${styles.toolbar} appContainer`}>
        {/*Заменила лого по требованию ТЗ*/}
        <Link to="/" className={styles.toolbar_logo}>
          <img className={styles.toolbar_logo_img} src={logo} alt="Logo"/>
        </Link>
        {/*Добавила поиск услуг*/}
          <ToolbarSearchBar />
        <ul className={styles.toolbar_lists}>
           <li className={styles.toolbar_lists_item}>
             {/*Вынесла в отдельный компонент, что бы лучше ориентироваться по коду*/}
             <ServiceDropdown />
           </li>
          <li className={styles.toolbar_lists_item}>
            <span className={styles.toolbar_lists_item_link}>
              Город
            </span>
            {/*Заменила формат изображения с PNG на SVG, поскольку SVG сохраняет своё качество при увеличении.*/}
            <img className={styles.toolbar_lists_item_link_arrow} src={arrowDown} alt=""/>
          </li>
          {/*Что бы сократить код и переиспользовать в будущем создала компонент ListItem*/}
          <ListItem link="/articles" className={styles.toolbar_lists_item_link} name="Статьи"/>
          <ListItem link="/reviews" className={styles.toolbar_lists_item_link} name="Отзывы"/>
          <ListItem link="/contact" className={styles.toolbar_lists_item_link} name="Контакты"/>
          <ListItem link="/orders" className={styles.toolbar_lists_item_link} name="Мои заказы"/>
        </ul>
        <div className="header__profile">
          {ui.isAuthorized ? (
            <div className="header__profile">
              <Link to={"/client/requests/create/title"} className="header__button">Дать задание</Link>
              <a href="tel:+79697148750" style={{height: "26px", width: "26px", marginRight: "12px"}}>
                <img className="" src="/img/ellipsewqrew.png" alt=""/>
              </a>
              <Link to={ui.isMaster ? "/master/chat" : "/client/chat"}
                    className='header__chat-link'
                    style={{display: 'flex'}}
                    onClick={() => {
                      setVisibleCountry(false)
                      setVisibleSetout(false)
                    }}
              >
                <img className="" src="/img/hfjsa.png" alt=""/>
                {messages.count > 0 && <div className='chat-message-counter'>{messages.count}</div>}
              </Link>
              <div
                className='yosetout'
                style={{cursor: 'pointer'}}
                onClick={() => {
                  setVisibleSetout(!visibleSetout)
                  setVisibleCountry(false)
                }}
              >
                <img
                  src={SERVER_PATH + user.avatar}
                  width="40px"
                  height="40px"
                  alt=""
                  style={{borderRadius: "20px", objectFit: "cover"}}
                />
                <img src="/img/dropdownuser.png" alt=""/>
                {/* {visibleSetout ? <DropdownSetout /> : null} */}
                <div className="bldropdown">
                  <DropdownSetout/>
                </div>
                {/* </Link> */}
              </div>
              {ui.isMaster && user.master[0] && (
                <>
                  <p className='master__moneys'>
                    {parseFloat(user.master[0].balance).toFixed(2)}₽
                  </p>
                  <div className='master__moneys__full'>
                    <Link to="/master/wallet">Пополнить баланс</Link>
                  </div>
                </>
              )}
            </div>
          ) : (
            // Вынесла в отдельный компонент кнопки, чтобы сократить код
            <ToolbarButtons />
          )}
        </div>
      </div>
      <div className={styles.toolbar_burger} onClick={() => setMenuActive(!menuActive)}>
      </div>
      {/*Вынесла в отдельный компонент кнопки, чтобы сократить код*/}
      <div className={styles.toolbar_mobile}>
          <div className={menuActive ?
            `${styles.toolbar_mobile_menu} ${styles.toolbar_mobile_menu_active}`
            :
            `${styles.toolbar_mobile_menu}`
          }>
            <MobileMenu/>
          </div>
      </div>
    </header>
  );
};

export default Toolbar;