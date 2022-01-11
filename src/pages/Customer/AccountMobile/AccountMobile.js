import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  FiLogOut as Logout,
  FiShoppingBag as ShoppingBag,
} from "react-icons/fi";
import {
  BiPencil as Edit,
  BiHeart as HeartIcon,
  BiUser as UserIcon,
} from "react-icons/bi";
import { MdDashboard as DashboardIcon } from "react-icons/md";

import Button from "components/Button/Button";

import * as actionTypes from "store/actionTypes";

import styles from "./AccountMobile.module.scss";

function AccountMobile() {
  const isMerchant = useSelector((state) => state.isMerchant);
  const firstName = useSelector((state) => state.firstName);
  const lastName = useSelector((state) => state.lastName);
  const email = useSelector((state) => state.email);
  const mobile = useSelector((state) => state.mobile);
  const avatar = useSelector((state) => state.avatar);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: actionTypes.USER_LOGOUT,
    });

    localStorage.clear();
    window.location.href = "/";
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={avatar} alt={firstName} />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.heading}>
            <p className={styles.title}>
              {firstName} {lastName}
            </p>
            <Edit />
          </div>
          <p className={styles.desc}>{isMerchant ? email : mobile}</p>
        </div>
      </div>
      <div className={styles.body}>
        {isMerchant && (
          <div className={styles.item}>
            <DashboardIcon />
            <p>Dashboard</p>
          </div>
        )}
        <div className={styles.item}>
          <ShoppingBag />
          <p>Orders</p>
        </div>
        <div className={styles.item}>
          <UserIcon />
          <p>Profile</p>
        </div>
        <div className={styles.item}>
          <HeartIcon />
          <p>Wishlist</p>
        </div>
      </div>
      <div className={styles.footer}>
        <Button bordered onClick={handleLogout}>
          <Logout />
          <p>Logout</p>{" "}
        </Button>
      </div>
    </div>
  );
}

export default AccountMobile;
