import {useEffect} from "react";

import {MapWrapper} from "../../components/mapPage/mapWrapper/MapWrapper";

import styles from './MapPage.module.css';

import {center, geoFindMe} from "../../components/mapPage/geolocation/geoFindMe";
import {load} from "@2gis/mapgl";

import markerIcon from '../../img/markers/01.svg';
import background from '../../img/markers/background.svg'
import card from '../../img/markers/Card.png'

export function MapPage() {
    let map: any;

    useEffect(() => {
        geoFindMe();

        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: center,
                zoom: 13,
                key: 'dab69d26-f8a0-4c36-b1eb-3b23f0b85683',
            });
        });

        load().then((mapglAPI) => {
            const marker = new mapglAPI.Marker(map, {
                coordinates: center,
                icon: markerIcon,
            })

            marker.on('mouseover', (e) => {
                marker.setLabel({
                    text: '2+ маршрута в этом месте',
                    offset: [100, -44],
                    image: {
                        url: background,
                        size: [239, 50],
                        padding: [16, 20, 16, 20],
                    },
                })

                marker.on('click', (e) => {
                    marker.setLabel({
                        text: '.',
                        color: '#fff',
                        offset: [-30, -250],
                        image: {
                            url: card,
                            size: [242, 276],
                            stretchX: [[0, 3000]],
                            stretchY: [[0, 2000]],
                        }
                    })
                })

                marker.on('mouseout', (e) => {
                    marker.setLabel({
                        text: '',
                    })
                })
            });
        })

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);


    return <div className={styles.container}>
        <MapWrapper/>
    </div>
}