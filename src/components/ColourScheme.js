import { defaultColor } from "../App";

export function getColourScheme(mainColor) {
    const url = "http://colormind.io/api/";
    const data = {
        model : "default",
        input : [[240, 240, 240], "N", getRGBArrayFromHexCode(mainColor), "N", "N"]
    };

    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if(http.readyState == 4) {
                if (http.status == 200) {
                    const palette = JSON.parse(http.responseText).result;
                    console.log(palette);

                    resolve(palette);
                } else {
                    reject(http.readyState);
                }
            }
        }

        http.open("POST", url, true);
        http.send(JSON.stringify(data));
    });
}

// Source:
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

export function getHexCodeFromRGBArray(array) {
    return "#" + componentToHex(array[0]) + componentToHex(array[1]) + componentToHex(array[2]);
}

export function getRGBAFromRGBArray(array, alpha) {
    return `rgba(${array[0]}, ${array[1]}, ${array[2]}, ${alpha})`;
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