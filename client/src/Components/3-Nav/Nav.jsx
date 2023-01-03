import "./nav.css";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function Sort() {

    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }


    const OnClick = () => {
        window.location.reload();
        //  window.location.replace(window.location.href.split('?')[0])
    }

    return (
        <div>
            <nav>
                <div className="burger-menu">
                    <div className={burger_class} onClick={updateMenu}>
                    </div>

                    <div className={burger_class} onClick={updateMenu}>
                    </div>

                    <div className={burger_class} onClick={updateMenu}>
                    </div>
                </div>
            </nav>
            <div className={menu_class}>
                <ul className="buttons-container">
                    <div className="link-position">
                        <li>
                            <Link className="link-home" to="/home" onClick={OnClick}>Home</Link>
                        </li>
                        <li>
                            <Link className="link-create" to="/dog/create">Create Dog</Link>
                        </li>
                        <li>
                            <Link className="link-landing" to="/">Landing</Link>

                        </li>
                    </div>
                </ul>
            </div>
        </div>
    )
}
