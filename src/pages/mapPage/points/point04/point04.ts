import {load} from "@2gis/mapgl";
import markerIcon from "../../../../img/markers/01.svg";

export function point04(map: any, mapglAPI: any) {
    load().then((mapglAPI) => {
        const marker = new mapglAPI.Marker(map, {
            coordinates: [73.368029, 54.984996],
            icon: markerIcon,
        })

        const popup = new mapglAPI.HtmlMarker(map, {
            coordinates: marker.getCoordinates(),
            html: `<div style="background-color: white; border-radius: 6px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10); border: 1px solid #D4D4D4;">
                    <img style="width: 466px; height: 270px; border-radius: 5px 5px 0px 0px;" src="https://n1s1.elle.ru/0e/7f/7c/0e7f7caff07dcdbcf82459a5c12a59c7/728x524_1_ab0212eac500bbc337e818e5ea254632@940x676_0xc35dbb80_14689052981497610633.jpeg" alt="photo" />
                    <p style="font-weight: 600; font-size: 16px; padding: 8px 12px;">Шумные улицы и бульвары Москвы</p>
                    <p style="max-width: 419px; padding-left: 12px">Этот 8-километровый маршрут — отличный способ познакомиться с главными улицами Москвы и прогуляться по широким бульварам города...</p>
                    <div style="display: flex; flex-direction: row; padding: 12px 12px 16px 12px">
                        <p style="color: #141414; font-size: 16px; font-weight: bold;">8 километров</p>
                        <p style="margin-left: auto; color: #141414; font-size: 16px; font-weight: 500; padding-right: 8px;">3.5</p>
                        <p style="color: rgba(20, 20, 20, 0.40); font-size: 16px; font-weight: 500; border-bottom: 1px solid rgba(20, 20, 20, 0.40);">104 отзыва</p>
                    </div>
                    <div style="display: flex; flex-direction: row; padding: 0px 12px 16px 12px">
                    <button style="margin-left: auto; border-radius: 6px; background: #FF933C; padding: 7px 18px; border: 0px; color: white; font-size: 14px; font-weight: 500;">
                        Открыть маршрут</button> 
                    <button style="margin-right: auto; margin-left: 20px; border-radius: 6px; background: #F2F2F2; padding: 7px 18px; border: 0px; color: black; font-size: 14px; font-weight: 500;">
                        Читать статью</button> 
                    </div>
                </div>`
        })

        const popupHtml = popup.getContent();
        hidePopup();

        map.on('click', hidePopup);

        marker.on('click', () => {
            popupHtml.style.display = 'block';
        })

        function hidePopup() {
            popupHtml.style.display = 'none';
        }
    })
}