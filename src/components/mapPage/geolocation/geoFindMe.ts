export let center: any;

function success(pos: any) {
    center = [pos.coords.longitude, pos.coords.latitude];
}

function error() {
    center = [0, 0];
}

export function geoFindMe() {
    if (!navigator.geolocation) {
        error();

        alert('Геолокация не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}