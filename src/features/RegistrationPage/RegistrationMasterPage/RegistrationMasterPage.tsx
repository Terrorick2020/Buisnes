import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import MultiSelect, {Option} from "../../../components/MultiSelect/MultiSelect";
import {ConfirmPoliticsContext} from "../../../components/ConfirmPolitics/ConfirmPoliticsContext";
import ConfirmPolitics from "../../../components/ConfirmPolitics/ConfirmPolitics";
// import Error from "../../../components/Error/Error";
import styles from './RegistrationMasterPage.module.scss';

// Старая страница register-master.jsx  !!! НЕ УДАЛЯТЬ ФАЙЛ
const RegistrationMasterPage = () => {
  const [accept, setAccept] = useState(false);

  const [categoryOptionSelected, setCategoryOptionSelected] = useState<Option[] | null>();
  const [brandOptionSelected, setBrandOptionSelected] = useState<Option[] | null>();
  const [typeOfRepairSelected, setTypeOfRepairOptionSelected] = useState<Option[] | null>();

  useEffect(() => {
    document.title = 'Регистрация мастера';
  }, []);

  // В будущем статичные данные будут удалены

  const categoriesOptions = [
    { value: 0, label: "Ремонт телефонов" },
    { value: 1, label: "Ремонт компьютеров" },
    { value: 2, label: "Ремонт ноутбуков" },
    { value: 3, label: "Ремонт планшетов" },
    { value: 4, label: "Ремонт мониторов" },
    { value: 5, label: "Ремонт принтеров" },
  ];

  const brandsOptions = [
    { value: 0, label: "Apple" },
    { value: 1, label: "Samsung" },
    { value: 2, label: "Huawei" },
    { value: 3, label: "Xiaomi" },
    { value: 4, label: "Sony" },
    { value: 5, label: "LG" },
    { value: 6, label: "Google" },
    { value: 7, label: "OnePlus" },
  ];

  const typeOfRepairOptions = [
    { value: 0, label: "Ремонт экрана" },
    { value: 1, label: "Замена батареи" },
    { value: 2, label: "Ремонт от воды" },
    { value: 3, label: "Прошивка устройства" },
    { value: 4, label: "Ремонт разъемов и портов" },
    { value: 5, label: "Восстановление программного обеспечения" },
  ];

  const onSubmit = (e) => {
    e.preventDefault()

    if (!accept) {
      // @ts-ignore
      return setError("Чтобы продолжить необходимо принять политику конфиденциальности.");
    }

    try {
      //запрос
    } catch {
      //ошибка
    }
  };

  return (
      <ConfirmPoliticsContext.Provider value={{accept, setAccept}}>
        <div className={`${styles.registrationMasterPage} appContainer`}>
          <h1 className={styles.registrationMasterPage_title}>Регистрация мастера</h1>
          <form className={styles.registrationMasterPage_form} onSubmit={onSubmit}>
            {/*{error && (*/}
            {/*  // В старом коде className="auth-err"*/}
            {/*  <Error error={error} />*/}
            {/*)}*/}
            <input
              className={styles.registrationMasterPage_form_input}
              type="text"
              name="login"
              placeholder="Логин"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="text"
              name="address"
              placeholder="Адрес"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="text"
              name="name"
              placeholder="Имя"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="text"
              name="lastname"
              placeholder="Фамилия"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="text"
              name="phone"
              placeholder="Телефон"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="email"
              name="email"
              placeholder="Электронная почта"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="password"
              name="password"
              placeholder="Пароль"
              // value={}
              // onChange={}
              required
            />
            <input
              className={styles.registrationMasterPage_form_input}
              type="password"
              placeholder="Подтвердите пароль"
              // value={}
              // onChange={}
              required
            />

            <MultiSelect
              key="category_id"
              placeholder="Вид услуги"
              options={categoriesOptions}
              onChange={(selected: Option[]) => setCategoryOptionSelected(selected)}
              value={categoryOptionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
            <MultiSelect
              key="category_id"
              placeholder="Категории"
              options={categoriesOptions}
              onChange={(selected: Option[]) => setCategoryOptionSelected(selected)}
              value={categoryOptionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
            <MultiSelect
              key="brand_id"
              placeholder="Бренды"
              options={brandsOptions}
              onChange={(selected: Option[]) => setBrandOptionSelected(selected)}
              value={brandOptionSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
            {/* <MultiSelect
              key="typeOfRepair_id"
              placeholder="Виды ремонта"
              options={typeOfRepairOptions}
              onChange={(selected: Option[]) => setTypeOfRepairOptionSelected(selected)}
              value={typeOfRepairSelected}
              isSelectAll={true}
              menuPlacement={"bottom"}
            /> */}

              {/*Вынесла в отдельный компонент, т.к. будет переиспользован*/}
              <ConfirmPolitics/>

              <button className={styles.registrationMasterPage_form_button} type="submit">Зарегистрироваться</button>
          </form>
        </div>
      </ConfirmPoliticsContext.Provider>
  );
};

export default RegistrationMasterPage;