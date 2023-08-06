import markerIcon from "../../../../img/markers/01.svg";
import background from "../../../../img/markers/background.svg";

export function point01(map: any, mapglAPI: any) {
    const marker = new mapglAPI.Marker(map, {
        coordinates: [73.371633, 54.988278],
        icon: markerIcon,
    })

    marker.on('mouseover', () => {
        marker.setLabel({
            text: '2+ маршрута в этом месте',
            offset: [100, -44],
            image: {
                url: background,
                size: [239, 50],
                padding: [16, 20, 16, 20],
            },
        })

        marker.on('mouseout', () => {
            marker.setLabel({
                text: '',
            })
        })
    });
}