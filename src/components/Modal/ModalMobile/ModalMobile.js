import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "react-feather";

import styles from "./ModalMobile.module.scss";

function ModalMobile(props) {
    useEffect(() => {
        document.body.style.overflowY = "hidden";

        return () => {
            document.body.style.overflowY = "auto";
        };
    }, []);

    return (
        <div
            className={`${styles.container} ${
                props.title || props.noTopPadding ? styles.modalWithTitle : ""
            }`}
            onClick={() => (props.onClose ? props.onClose() : "")}
            style={{ zIndex: +props.zIndex || 251 }}
        >
            <div
                className={`${styles.inner} custom-scroll`}
                onClick={(event) => event.stopPropagation()}
            >
                {props.title && (
                    <div className={styles.modalTitle}>
                        <div className={styles.heading}>{props.title}</div>
                        {props.onClose && <X onClick={props.onClose} />}
                    </div>
                )}
                {props.children}
            </div>
        </div>
    );
}

ModalMobile.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    title: PropTypes.any,
    noTopPadding: PropTypes.bool,
    zIndex: PropTypes.string,
};

export default ModalMobile;
