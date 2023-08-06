import styles from "./MapWrapper.module.css";
import {memo} from "react";

export const MapWrapper = memo(
    () => {
        return <div className={styles.container} id="map-container"></div>;
    },
    () => true,
);