const titik = (imageData, x, y, r, g, b) => {
    index = 4 * (Math.ceil(x) + Math.ceil(y) * canvas.width);
    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
}

const garis = (imageData, x1, y1, x2, y2, r, g, b) => {
    var dx = x2 - x1;
    var dy = y2 - y1;

    if (Math.abs(dx) > Math.abs(dy)) {
        //jalan di x
        if (x2 > x1) {
            // ke kanan
            var y = y1;
            for (var x = x1; x < x2; x++) {
                y = y + dy / Math.abs(dx);
                titik(imageData, x, y, r, g, b);
            }
        } else {
            // ke kiri
            var y = y1;
            for (var x = x1; x > x2; x--) {
                y = y + dy / Math.abs(dx);
                titik(imageData, x, y, r, g, b);
            }
        }
    } else {
        //jalan di y
        if (y2 > y1) {
            // ke kanan
            var x = x1;
            for (var y = y1; y < y2; y++) {
                x = x + dx / Math.abs(dy);
                titik(imageData, x, y, r, g, b);
            }
        } else {
            // ke kiri
            var x = x1;
            for (var y = y1; y > y2; y--) {
                x = x + dx / Math.abs(dy);
                titik(imageData, x, y, r, g, b);
            }
        }
    }
}

const lingkaran = (imageDataDataTemp, xc, yc, radius, r, g, b) => {
    for (var theta = 0; theta < Math.PI * 2; theta += 0.01) {
        x = xc + radius * Math.cos(theta);
        y = yc + radius * Math.sin(theta);

        titik(imageDataDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);
    }
}

const ellipse_polar = (imageDataDataTemp, xc, yc, radiusX, radiusY, r, g, b) => {
    for (var theta = 0; theta < Math.PI * 2; theta += 0.01) {
        x = xc + radiusX * Math.cos(theta);
        y = yc + radiusY * Math.sin(theta);

        titik(imageDataDataTemp, Math.ceil(x), Math.ceil(y), r, g, b);

    }
}

const polygon = (imageData, array_point, r, g, b) => {
    for (var i = 0; i < array_point.length - 1; i++) {
        garis(imageData, array_point[i].x, array_point[i].y, array_point[i + 1].x, array_point[i + 1].y, r, g, b)
    }
    garis(imageData, array_point[0].x, array_point[0].y, array_point[array_point.length - 1].x, array_point[array_point.length - 1].y, r, g, b)
}

const floodFillStack = (imageData, canvas, x, y, toFlood, color) => {
    var tumpukan = [];
    tumpukan.push({ x: x, y: y });

    while (tumpukan.length > 0) {
        var titik_sekarang = tumpukan.pop();
        var index_sekarang = 4 * (titik_sekarang.x + titik_sekarang.y * canvas.width)
        var r1 = imageData.data[index_sekarang];
        var g1 = imageData.data[index_sekarang + 1];
        var b1 = imageData.data[index_sekarang + 2];

        if ((r1 == toFlood.r) && (g1 == toFlood.g) && (b1 == toFlood.b)) {
            imageData.data[index_sekarang] = color.r;
            imageData.data[index_sekarang + 1] = color.g;
            imageData.data[index_sekarang + 2] = color.b;
            imageData.data[index_sekarang + 3] = 255;

            tumpukan.push({ x: titik_sekarang.x + 1, y: titik_sekarang.y })
            tumpukan.push({ x: titik_sekarang.x - 1, y: titik_sekarang.y })
            tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y + 1 })
            tumpukan.push({ x: titik_sekarang.x, y: titik_sekarang.y - 1 })
        }
    }

}