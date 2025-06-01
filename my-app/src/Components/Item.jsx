import React from 'react'
import Button from './Button';
import { Link } from 'react-router-dom';

const Item = ({item,ondelete}) => {
    return (
        <div>
          <ol>
            <li>{item.name}</li>
            <li>{item.value}</li>
            <li>
              <Button 
               click={() => ondelete(item._id)}
               name={"X"}/> 
            </li>
            <li>
                <Link to={`/items/?id=${item._id}`}>
                  <Button name="Ver Detalle" />
                </Link>
            </li>
          </ol>
        </div>
    );
};

export default Item;