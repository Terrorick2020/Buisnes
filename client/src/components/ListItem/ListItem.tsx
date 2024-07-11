import React from 'react';
import {Link} from "react-router-dom";

interface Props {
  link: string;
  name: string;
  onClick?: () => void;
  className?: string;
}

const ListItem: React.FC<Props> = ({link, name, onClick, className}) => {
  return (
    <li onClick={onClick}>
      <Link className={className} to={link}>{name}</Link>
    </li>
  );
};

export default ListItem;