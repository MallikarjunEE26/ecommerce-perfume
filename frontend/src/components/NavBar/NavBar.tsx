import React, { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginOutlined, LogoutOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Affix, Badge } from "antd";

import { selectUserFromUserState } from "../../redux-toolkit/user/user-selector";
import { selectCartItemsCount } from "../../redux-toolkit/cart/cart-selector";
import { logoutSuccess } from "../../redux-toolkit/user/user-slice";
import { ACCOUNT, BASE, CONTACTS, LOGIN, MENU, REGISTRATION } from "../../constants/routeConstants";
import { CART } from "../../constants/urlConstants";
import "./NavBar.scss";

const NavBar: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectUserFromUserState);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const handleLogout = (): void => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };

    return (
        <>
            <div className={"navbar-logo-wrapper"}>
                <img alt={"navbar-logo"} src="https://i.ibb.co/fqYvrL8/LOGO4.jpg" />
            </div>

            <Affix>
                <div className={"navbar-wrapper"}>
                    <ul className={"navbar-menu"}>
                        <li>
                            <Link to={BASE}>
                                <span>HOME</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={{ pathname: MENU, state: { id: "all" } }}>
                                <span>PERFUMES</span>
                            </Link>
                        </li>

                        <li>
                            <Link to={CONTACTS}>
                                <span>CONTACTS</span>
                            </Link>
                        </li>

                        <li className={"navbar-cart"}>
                            <Badge count={cartItemsCount} size="small" color={"green"}>
                                <Link to={CART}>
                                    <ShoppingCartOutlined />
                                    <span>CART</span>
                                </Link>
                            </Badge>
                        </li>

                        {usersData ? (
                            <>
                                <li>
                                    <Link to={ACCOUNT}>
                                        <UserOutlined />
                                        <span>MY ACCOUNT</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link id={"handleLogout"} to={BASE} onClick={handleLogout}>
                                        <LogoutOutlined />
                                        <span>EXIT</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to={LOGIN}>
                                        <LoginOutlined />
                                        <span>SIGN IN</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={REGISTRATION}>
                                        <UserAddOutlined />
                                        <span>SIGN UP</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </Affix>
        </>
    );
};

export default NavBar;
