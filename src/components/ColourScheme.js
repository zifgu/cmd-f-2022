import { defaultColor } from "../App";

export function getColourScheme(mainColor) {
    const url = "http://colormind.io/api/";
    const data = {
        model : "default",
        input : ["N", "N", getRGBArrayFromHexCode(mainColor), "N", "N"]
    }

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(http.readyState === 4 && http.status === 200) {
            const palette = JSON.parse(http.responseText).result;

            console.log(palette);
        }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}

// Assume hex strings are formatted like #FFFFFF
function getRGBArrayFromHexCode(hexCode) {
    try {
        return [
            parseInt(hexCode.slice(1, 3), 16),
            parseInt(hexCode.slice(3, 5), 16),
            parseInt(hexCode.slice(5, 7), 16),
        ];
    } catch (e) {
        console.log("Error converting hex string to numeric array");
        console.log(e);
        return getRGBArrayFromHexCode(defaultColor);
    }
}