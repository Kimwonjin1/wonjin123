/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Badge } from "antd";
import Icon, { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">계정생성</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">업로드</a>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge
            count={5}
            style={{
              marginRight: "7px",
            }}
          >
            <a href="#" className="head-example" />
            <ShoppingCartOutlined
              style={{
                fontSize: "30px",
              }}
            />
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
