
document.getElementById("prueba").innerHTML="si corre"
var map = L.map('map').
    setView([16.9022927, -99.8324937],
        15);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

function fs(color) {
    var coordenadas_zana1 = [
        [16.9066862, -99.8255889],
        [16.9100121, -99.8318148],
        [16.908575, -99.8327402],
        [16.9072611, -99.8335775],
        [16.9062756, -99.8343074],
        [16.9056802, -99.8348227],
        [16.9053517, -99.8350159],
        [16.9047974, -99.8351661],
        [16.9044689, -99.8354452],
        [16.9039351, -99.8357243],
        [16.9035451, -99.8360464],
        [16.9033603, -99.8362181],
        [16.9031139, -99.8364543],
        [16.902806, -99.8365831],
        [16.9022106, -99.836948],
        [16.9021079, -99.8370876],
        [16.9017692, -99.8373238],
        [16.9018615, -99.837517],
        [16.9014817, -99.8377639],
        [16.9010608, -99.8379785],
        [16.900681, -99.8383006],
        [16.9002704, -99.8385475],
        [16.8998803, -99.8388695],
        [16.8991207, -99.8376887],
        [16.8986279, -99.838],
        [16.8981146, -99.8384616],
        [16.8978375, -99.8387192],
        [16.8975808, -99.8389446],
        [16.8973653, -99.8390305],
        [16.8970675, -99.8389768],
        [16.8966775, -99.8389768],
        [16.8963695, -99.8390198],
        [16.8961128, -99.8391915],
        [16.8957433, -99.8394921],
        [16.8952505, -99.8397712],
        [16.8947475, -99.8399966],
        [16.894573, -99.8401576],
        [16.8942342, -99.8402757],
        [16.8941418, -99.8403615],
        [16.8936901, -99.8395457],
        [16.8935875, -99.8394169],
        [16.8933616, -99.8391271],
        [16.8931563, -99.8388909],
        [16.8930023, -99.838483],
        [16.8927457, -99.8381396],
        [16.8925711, -99.8378927],
        [16.892335, -99.8375062],
        [16.892181, -99.8371949],
        [16.8919962, -99.8369695],
        [16.8917807, -99.8366153],
        [16.8915753, -99.8362611],
        [16.8912366, -99.8357351],
        [16.8911339, -99.8355419],
        [16.8960204, -99.8323968],
        [16.9008247, -99.8293053],
        [16.9054031, -99.8263749],
        [16.9057418, -99.8260636],
        [16.906676, -99.8255698]];
    var polygon2 = L.polygon(coordenadas_zana1, {
        color: color,
        fillOpacity: 0.5,
        opacity: 2,
        weight: 1
    }).addTo(map);

}
fs2();
//leer archivos con datos y marcar los phshdfduntos en el mapa 
function fs2() {
    var datos = '[[58,16.89460338799645, -99.8387343181296,"zapata"],' +
        '[0,16.893320159931818, -99.83825152055529,"zapata"],' +
        '[20,16.893299628211846, -99.83694260268716,"zapata"],' +
        '[10,16.892416762111374, -99.83554785384892,"zapata"],' +
        '[0,16.894983221812115, -99.83376686709096,"zapata"],' +
        '[10,16.897837084019862, -99.83561222660941,"zapata"],' +
        '[0,16.89666680043721, -99.83348791728247 ,"zapata"],' +
        '[10,16.900280284234803, -99.83735029787691,"zapata"],' +
        '[10,16.89886364258755, -99.83348791728247,"zapata"],' +
        '[0,16.90360627070342, -99.83466808892221,"zapata"],' +
        '[0,16.904140065544695, -99.82938950205816,"zapata"],' +
        '[0,16.907322272539506, -99.83151381138512,"zapata"],' +
        '[0,16.90576197130576, -99.82805912652007,"zapata"],' +
        '[0,16.907137500699132, -99.82677166632193,"zapata"],' +
        '[100   ,16.908944150960235, -99.8312992346188,"zapata"]]';
    var obj = JSON.parse(datos);
    var markerGroup = L.layerGroup().addTo(map)
    for (var i = 0; i < obj.length; i++) {
        //obj[i][0]=1;
        L.marker([obj[i][1], obj[i][2]], {
            draggable: false,
            title: "cant : " + obj[i][0] + " , Zona : " + obj[i][3]
        }).addTo(markerGroup);
        // console.log("[" + obj[i][1] + "," + obj[i][2] + "]")
    }
    //funcion que recibe arreglo de base de datos en una zona en especifico 
    fs(color = calcularPorcentaje(obj));
}
/*
1) Porcentaje de Ovitrampa Positiva (IPO):
        (Ovitrampas Positivas / Ovitrampas Revisadas) x 100
2) Promedio de Huevos por Ovitrampa (PHO):
        (Total de Huevos / Número de Ovitrampas Positivas)
*/
function calcularPorcentaje(obj) {
    var pos = 0,
        longitud = obj.length,
        suma = 0
    for (var i = 0; i < obj.length; i++) {
        suma += obj[i][0]
        if (obj[i][0] != 0) {
            pos++;
        }
    }
    console.log("summa : " + suma + "  positivas: " + pos + "  negativas :" + (longitud - pos))
    var pop = (pos / longitud) * 100;
    var pho = (suma / pos);
    console.log("Porcentaje de Ovitrampa Positiva { " + parseInt(pop) +
        " % \nPromedio de Huevos por Ovitrampa : " + parseInt(pho))
    document.getElementById("dat1").innerHTML =
        "Porcentaje de Ovitrampa Positiva(IPO) :<p style='color:red'>" + parseInt(pop) + "%</p>"
    document.getElementById("dat2").innerHTML =
        "Promedio de Huevos por Ovitrampa (PHO) :<p style='color:red'>" + parseInt(pho) + "</p>"
    var semf = "green";
    if (pop >= 0 & pop <= 33) {
        semf = "green"
    } else if (pop > 33 & pop <= 66) {
        semf = "yellow"
    } else {
        semf = "red"
    }
    return semf;
}

        ///fin de leer archivo