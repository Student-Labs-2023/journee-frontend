import {useEffect} from "react";
import {load} from "@2gis/mapgl";

import {MapWrapper} from "../../components/mapPage/mapWrapper/MapWrapper";
import {center, geoFindMe} from "../../components/mapPage/geolocation/geoFindMe";

import {point01} from "./points/point01/point01";
import {point03} from "./points/point03/point03";
import {point02} from "./points/point02/point02";
import {point04} from "./points/point04/point04";

import styles from './MapPage.module.css';

export function MapPage() {
    geoFindMe();

    useEffect(() => {
        load().then((mapglAPI) => {
            const map = new mapglAPI.Map('map-container', {
                center: center,
                zoom: 13,
                key: 'dab69d26-f8a0-4c36-b1eb-3b23f0b85683',
            });

            point01(map, mapglAPI);
            point02(map, mapglAPI);
            point03(map, mapglAPI);
            point04(map, mapglAPI);
        });
    }, []);

    return <div className={styles.container}>
        <MapWrapper/>
    </div>
}