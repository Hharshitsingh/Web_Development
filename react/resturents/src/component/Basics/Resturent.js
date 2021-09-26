import React, { useState } from 'react'
import './style.css'
import Menu from './menuApi'
import MenuCard from './MenuCard'
import Navbar from './Navbar'

const uniqueList = [...new Set(Menu.map((curElem) => {
    return curElem.category;
})
), "All"
]
console.log(uniqueList);

export default function Resturent() {
    const [menuData, setMenuData] = useState(Menu);
    const [menuList, setMenuList] = useState(uniqueList);

    const filterItem = (category) => {

        if(category === "All"){
            setMenuData(Menu);
            return;
        }

        const updatedLit = Menu.filter((curElem) => {
            return curElem.category === category;
        });
        setMenuData(updatedLit);

    };
    return (
        <>
            <Navbar filterItem={filterItem} menuList={menuList} />
            <MenuCard menuData={menuData} />
        </>
    )
}
