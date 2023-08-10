import {useEffect} from "react";
import {load} from "@2gis/mapgl";

import {MapWrapper} from "../../components/mapPage/mapWrapper/MapWrapper";
import {center, geoFindMe} from "../../components/mapPage/geolocation/geoFindMe";

import styles from './Create.module.css';
import {Directions} from "@2gis/mapgl-directions";
import {MapPointerEvent} from "@2gis/mapgl/global";

export function CreateRoutePage() {
    geoFindMe();

    useEffect((): void => {
        load().then((mapglAPI): void => {
            const markers: any[] = [];

            let firstPoint: undefined | number[];
            let secondPoint: undefined | number[];

            let selecting: string = 'a';

            let typeOfRoute: boolean = true;

            const map: any = new mapglAPI.Map('map-container', {
                center: center,
                zoom: 13,
                key: '28c8e2c3-f889-4f71-bdae-3bb3962a0f6c',
            });

            const directions: Directions = new Directions(map, {
                directionsApiKey: '28c8e2c3-f889-4f71-bdae-3bb3962a0f6c',
            })

            const controlsHtml: any =
                `<div style="display: flex; flex-direction: column;">
                    <button style="margin-bottom: 10px; font-weight: 500; cursor: pointer; padding: 10px; border-radius: 4px; border: 1px solid #e6e6e6; box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.5);" id="reset" onmouseover="this.style.color='#676767';" onmouseout="this.style.color='black';">Удалить маршрут</button>
                    <button style="border-bottom: 1px solid #e6e6e6; font-weight: 500; cursor: pointer; padding: 10px; border-radius: 4px 4px 0px 0px; border: 1px solid #e6e6e6; box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.5);" id="pedestrian" onmouseover="this.style.color='#676767';" onmouseout="this.style.color='black';">Пешком</button>
                    <button style="font-weight: 500; cursor: pointer; padding: 10px; border-radius: 0px 0px 4px 4px; border: 1px solid #e6e6e6; box-shadow: 0 1px 3px 0 rgba(38, 38, 38, 0.5);" id="car" onmouseover="this.style.color='#676767';" onmouseout="this.style.color='black';">На машине</button>
                </div>`;

            new mapglAPI.Control(map, controlsHtml, {
                position: 'topLeft',
            });

            const resetButton: any = document.getElementById('reset');
            const pedestrianButton: any = document.getElementById('pedestrian');
            const carButton: any = document.getElementById('car');

            resetButton.addEventListener('click', function (): void {
                resetButton.style.color = '#4db0ff';

                setTimeout((): void => {
                    resetButton.style.color = 'black';
                }, 100);

                selecting = 'a';
                firstPoint = undefined;
                secondPoint = undefined;
                directions.clear();
            });

            pedestrianButton.addEventListener('click', function (): void {
                typeOfRoute = true;

                pedestrianButton.style.color = '#4db0ff';

                setTimeout((): void => {
                    pedestrianButton.style.color = 'black';
                }, 100);

                selecting = 'a';
                firstPoint = undefined;
                secondPoint = undefined;
                directions.clear();
            });

            carButton.addEventListener('click', function (): void {
                typeOfRoute = false;

                carButton.style.color = '#4db0ff';

                setTimeout((): void => {
                    carButton.style.color = 'black';
                }, 100);

                selecting = 'a';
                firstPoint = undefined;
                secondPoint = undefined;
                directions.clear();
            });


            map.on('click', (e: MapPointerEvent): void => {
                const coords: number[] = e.lngLat;

                if (selecting != 'end') {
                    markers.push(
                        new mapglAPI.Marker(map, {
                            coordinates: coords,
                            icon: 'https://docs.2gis.com/img/dotMarker.svg',
                        }),
                    );
                }

                if (selecting === 'a') {
                    firstPoint = coords;
                    selecting = 'b';
                } else if (selecting === 'b') {
                    secondPoint = coords;
                    selecting = 'end';
                }

                if (firstPoint && secondPoint) {
                    if (typeOfRoute) {
                        directions.pedestrianRoute({
                            points: [firstPoint, secondPoint],
                        });
                        markers.forEach((m: any): void => {
                            m.destroy();
                        });
                    } else {
                        directions.carRoute({
                            points: [firstPoint, secondPoint],
                        });
                        markers.forEach((m: any): void => {
                            m.destroy();
                        });
                    }
                }
            });
        });
    }, []);

    return <div className={styles.container}>
        <MapWrapper/>
    </div>
}