import {load} from "@2gis/mapgl";
import markerIcon from "../../../../img/markers/01.svg";

export function point02(map: any, mapglAPI: any) {
    load().then((mapglAPI) => {
        const marker = new mapglAPI.Marker(map, {
            coordinates: [73.368542, 54.991200],
            icon: markerIcon,
        })

        const popup = new mapglAPI.HtmlMarker(map, {
            coordinates: marker.getCoordinates(),
            html: `<div style="background-color: white; border-radius: 6px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.10); border: 1px solid #D4D4D4;">
                    <img style="width: 240px; height: 138px; border-radius: 5px 5px 0px 0px;" src="https://modamix.net/wp-content/uploads/2019/10/940x627_1_9ca74810876efa4bc5847062fed153a9-940x627_0xc35dbb80_14293302101497610845.jpg" alt="photo" />
                    <p style="font-weight: 600; font-size: 16px; padding: 8px 12px; max-width: 218px;">От Цветного бульвара до Китай-города</p>
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