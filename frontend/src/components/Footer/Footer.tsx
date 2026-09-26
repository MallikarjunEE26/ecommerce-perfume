import React, { FC, ReactElement } from "react";
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";

import "./Footer.scss";

const Footer: FC = (): ReactElement => {
    return (
        <div className={"footer-wrapper"}>
            <Row>
                <Col span={12}>
                    <Typography.Title level={3}>Perfume</Typography.Title>
                    <Typography.Text>(066) 696-66-23</Typography.Text>
                    <Typography.Text className={"mt-12"}>
                        from 08:00 to 20:00 without breaks and weekends
                    </Typography.Text>
                </Col>

                <Col span={12}>
                    <div className={"footer-wrapper-social"}>
                        <Typography.Title level={3}>Social networks</Typography.Title>

                        <a href="https://www.linkedin.com/in/merikbest/" target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined />
                        </a>

                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined />
                        </a>

                        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined />
                        </a>
                    </div>
                </Col>
            </Row>

            <Row className={"footer-wrapper-copyright"}>
                <Typography.Text>© Copy right by perfume</Typography.Text>
            </Row>
        </div>
    );
};

export default Footer;
