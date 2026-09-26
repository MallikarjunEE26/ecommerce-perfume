import React, { FC, ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

import ContentTitle from "../../components/ContentTitle/ContentTitle";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { selectCartItems, selectIsCartLoading } from "../../redux-toolkit/cart/cart-selector";
import { fetchCart } from "../../redux-toolkit/cart/cart-thunks";
import {
    calculateCartPrice,
    removePerfumeById,
    resetCartState,
    setCartItemsCount
} from "../../redux-toolkit/cart/cart-slice";
import CartItem from "./CartItem/CartItem";
import Spinner from "../../components/Spinner/Spinner";
import CartTotalPrice from "./CartTotalPrice";
import { ORDER } from "../../constants/routeConstants";
import "./Cart.css";

const Cart: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const perfumes = useSelector(selectCartItems);
    const isCartLoading = useSelector(selectIsCartLoading);
    const [perfumeInCart, setPerfumeInCart] = useState<Map<number, number>>(new Map());

    useEffect(() => {
        window.scrollTo(0, 0);

        const perfumesFromLocalStorage: Map<number, number> = new Map(
            JSON.parse(localStorage.getItem("perfumes") as string)
        );

        dispatch(fetchCart(Array.from(perfumesFromLocalStorage.keys())));

        setPerfumeInCart(new Map(perfumesFromLocalStorage));

        return () => {
            dispatch(resetCartState());
        };
    }, [dispatch]);

    const deleteFromCart = (perfumeId: number): void => {
        const updatedCart = new Map(perfumeInCart);
        updatedCart.delete(perfumeId);

        if (updatedCart.size === 0) {
            localStorage.removeItem("perfumes");
        } else {
            localStorage.setItem("perfumes", JSON.stringify(Array.from(updatedCart.entries())));
        }

        setPerfumeInCart(updatedCart);

        dispatch(removePerfumeById(perfumeId));
        dispatch(setCartItemsCount(updatedCart.size));
    };

    const onChangePerfumeItemCount = (perfumeId: number, inputValue: number): void => {
        setPerfumes(perfumeId, inputValue);
        dispatch(calculateCartPrice(perfumes));
    };

    const setPerfumes = (perfumeId: number, perfumeCount: number): void => {
        setPerfumeInCart((previousCart) => {
            const updatedCart = new Map(previousCart);
            updatedCart.set(perfumeId, perfumeCount);

            localStorage.setItem("perfumes", JSON.stringify(Array.from(updatedCart.entries())));

            return updatedCart;
        });
    };

    return (
        <ContentWrapper>
            {isCartLoading ? (
                <Spinner />
            ) : (
                <>
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <ContentTitle icon={<ShoppingCartOutlined />} title={"Cart"} />
                    </div>

                    <Row gutter={[24, 24]}>
                        {perfumes.length === 0 ? (
                            <Col span={24}>
                                <Typography.Title level={3} style={{ textAlign: "center" }}>
                                    Cart is empty
                                </Typography.Title>
                            </Col>
                        ) : (
                            <>
                                {/* LEFT: CART ITEMS */}
                                <Col xs={24} md={16}>
                                    {perfumes.map((perfume) => (
                                        <CartItem
                                            key={perfume.id}
                                            perfume={perfume}
                                            perfumeInCart={perfumeInCart.get(perfume.id) ?? 0}
                                            onChangePerfumeItemCount={onChangePerfumeItemCount}
                                            deleteFromCart={deleteFromCart}
                                        />
                                    ))}
                                </Col>

                                {/* RIGHT: TOTAL + BUTTON */}
                                <Col xs={24} md={8}>
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24}>
                                            <CartTotalPrice />
                                        </Col>

                                        <Col xs={24}>
                                            <Link to={ORDER}>
                                                <Button type="primary" icon={<ShoppingOutlined />} size="large" block>
                                                    Checkout
                                                </Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        )}
                    </Row>
                </>
            )}
        </ContentWrapper>
    );
};

export default Cart;
