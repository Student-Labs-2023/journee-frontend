import {load} from "@2gis/mapgl";
import markerIcon from "../../../../img/markers/01.svg";

export function point03(map: any, mapglAPI: any) {
    load().then((mapglAPI) => {
        const marker = new mapglAPI.Marker(map, {
            coordinates: [73.373456, 54.986208],
            icon: markerIcon,
        })

        const popup = new mapglAPI.HtmlMarker(map, {
            coordinates: marker.getCoordinates(),
            html: `<div style="background-color: white; border-radius: 6px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10); border: 1px solid #D4D4D4;">
                    <img style="width: 240px; height: 138px; border-radius: 5px 5px 0px 0px;" src="https://n1s1.elle.ru/2d/77/d4/2d77d4055512ffcf2be99bc3349c8b6d/728x546_1_a2acaed1b8782f5a57226099ae31655b@940x705_0xc35dbb80_7455606241497610704.jpeg" alt="photo" />
                    <p style="font-weight: 600; font-size: 16px; padding: 8px 12px; max-width: 218px;">От Китай-города до Пятницкой улицы</p>
                    <div style="display: flex; flex-direction: row; padding: 12px 12px 16px 12px">
                        <button style="border-radius: 6px; background: #FF933C; padding: 7px 18px; border: 0px; color: white; font-size: 14px; font-weight: 500;">
                        Подробнее</button> 
                        <p style="margin-left: auto; color: #141414; font-size: 16px; font-weight: 500;">4.6</p>
                        <p style="color: rgba(20, 20, 20, 0.40); font-size: 16px; font-weight: 500;">/104</p>
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