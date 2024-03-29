const axios = require('axios');
const fs = require('fs');

const url = 'https://cof.cnois.gob.pe/customer-office/net.eads.astrium.faceo.HomePage/catalogueService.rpc';
const cntImages = "999"
const dateFrom = 'bpWyaN_'
const dateTo = 'Vcp2v0A'

const jsonObjects = [];

const filePath = 'data.json';



const west = "-179.356737";
const east = "178.92";
const south = "-76.0918";
const north = "74.7448";
// const key_word = '201905'


const headers = {
    'Accept': '*/*',
    'Content-Type': 'text/x-gwt-rpc; charset=UTF-8',
    'X-GWT-Module-Base': 'https://cof.cnois.gob.pe/customer-office/net.eads.astrium.faceo.HomePage/',
    'X-GWT-Permutation': '1A6EE8D05907E248BF9CABFAEB464359',
    // Добавьте дополнительные заголовки здесь, если это необходимо
};
let countAll = 0;

//const requestData = `7|0|19|https://cof.cnois.gob.pe/customer-office/net.eads.astrium.faceo.HomePage/|9D1AA2A7BC3B5889421A063E7AE29AAC|net.eads.astrium.faceo.middleware.gwt.client.ICatalogueGWTService|queryCatalogueSetRecords|net.eads.astrium.faceo.core.apis.catalogue.CatalogueSetRecordQuery/112575587|net.eads.astrium.faceo.core.apis.common.request.Criteria/4096422861|net.eads.astrium.faceo.core.apis.catalogue.CatalogueRecordQuery/3099495460|java.util.ArrayList/4159755760|net.eads.astrium.faceo.common.data.geographical.Box/1418754578|net.eads.astrium.faceo.common.data.geographical.GeoPosition/3149863295|EPSG:4326|net.eads.astrium.faceo.core.apis.catalogue.Filter/3466992857||java.lang.String/2004016611|SPOT 6/7|PerúSAT-1|net.eads.astrium.faceo.common.data.temporal.Period/2004917229|java.util.Date/3385151746|java.lang.Integer/3438268394|1|2|3|4|2|5|6|5|7|8|1|9|10|0|50|69|10|0|52|74|0|11|8|1|12|8|0|0|0|0|0|0|13|-1|8|2|14|15|14|16|${cntImages}|8|1|17|18|${dateFrom}|18|${dateTo}|8|1|19|0|0|0|6|0|0|0|`;
// const requestData = '7|0|19|https://cof.cnois.gob.pe/customer-office/net.eads.astrium.faceo.HomePage/|9D1AA2A7BC3B5889421A063E7AE29AAC|net.eads.astrium.faceo.middleware.gwt.client.ICatalogueGWTService|queryCatalogueSetRecords|net.eads.astrium.faceo.core.apis.catalogue.CatalogueSetRecordQuery/112575587|net.eads.astrium.faceo.core.apis.common.request.Criteria/4096422861|net.eads.astrium.faceo.core.apis.catalogue.CatalogueRecordQuery/3099495460|java.util.ArrayList/4159755760|net.eads.astrium.faceo.common.data.geographical.Box/1418754578|net.eads.astrium.faceo.common.data.geographical.GeoPosition/3149863295|EPSG:4326|net.eads.astrium.faceo.core.apis.catalogue.Filter/3466992857|DS_PER1||java.lang.String/2004016611|PerúSAT-1|net.eads.astrium.faceo.common.data.temporal.Period/2004917229|java.util.Date/3385151746|java.lang.Integer/3438268394|1|2|3|4|2|5|6|5|7|8|1|9|10|0|-76|-179|10|0|74|178|0|11|8|1|12|8|0|0|13|0|0|0|14|0|8|1|15|16|55|8|1|17|18|bpWyaN_|18|Vcp2v0A|8|1|19|0|0|0|6|0|0|0|'

function getAll(key_word) {
    
    const requestData = `7|0|19|https://cof.cnois.gob.pe/customer-office/net.eads.astrium.faceo.HomePage/|9D1AA2A7BC3B5889421A063E7AE29AAC|net.eads.astrium.faceo.middleware.gwt.client.ICatalogueGWTService|queryCatalogueSetRecords|net.eads.astrium.faceo.core.apis.catalogue.CatalogueSetRecordQuery/112575587|net.eads.astrium.faceo.core.apis.common.request.Criteria/4096422861|net.eads.astrium.faceo.core.apis.catalogue.CatalogueRecordQuery/3099495460|java.util.ArrayList/4159755760|net.eads.astrium.faceo.common.data.geographical.Box/1418754578|net.eads.astrium.faceo.common.data.geographical.GeoPosition/3149863295|EPSG:4326|net.eads.astrium.faceo.core.apis.catalogue.Filter/3466992857|${key_word}||java.lang.String/2004016611|PerúSAT-1|net.eads.astrium.faceo.common.data.temporal.Period/2004917229|java.util.Date/3385151746|java.lang.Integer/3438268394|1|2|3|4|2|5|6|5|7|8|1|9|10|0|${south}|${west}|10|0|${north}|${east}|0|11|8|1|12|8|0|0|13|0|0|0|14|0|8|1|15|16|${cntImages}|8|1|17|18|${dateFrom}|18|${dateTo}|8|1|19|0|0|0|6|0|0|0|`;

    return new Promise((resolve, reject) => {
        // ваш код с использованием axios.post()
        axios.post(url, requestData, { headers: headers })
            .then(response => {
                // обработка данных
                const xmlString = response.data;

                // Регулярное выражение для извлечения содержимого с глобальным флагом
                const regex = /<\/gmd:MD_Metadata>(.*?)https:\/\/cof\.cnois\.gob\.pe\/customer-office/g;
                let count = 0; // Счётчик найденных экземпляров
                let match;
                while ((match = regex.exec(xmlString)) !== null) {
                    count++; // Увеличиваем счётчик при каждом найденном экземпляре
                    countAll++;
                    // Доступ к захваченной группе через match[1]
                    const rawData = match[1].trim();
                    const startIndex = rawData.indexOf('{');
                    const endIndex = rawData.lastIndexOf('}') + 1; // +1, чтобы включить сам символ '}'

                    // Обрезаем строку, оставляя только валидный JSON
                    const validJsonString = rawData.substring(startIndex, endIndex);

                    const test = validJsonString.replace(/\\n|\\t/g, "");
                    const test2 = test.replace(/\\/g, "");
                    const cleanedJsonObject = JSON.parse(test2);
                    jsonObjects.push(cleanedJsonObject);
                }
                console.log(count);
                console.log(countAll);
                resolve(jsonObjects); // возвращаем результат
                //console.log(count);
            })
            .catch(error => {
                reject(error); // обрабатываем ошибку
            });
    });
}





// getAll().then(data => {
// }).catch(error => {
//     console.error(error);
// });

async function sendPeriodData() {
    const startPeriod = 201609; // Начальный период
    const endPeriod = 202403; // Конечный период

    // Функция для форматирования периода
    function formatPeriod(period) {
        return "DS_PER1_" + period.toString();
    }

    // Функция для генерации следующего периода
    function getNextPeriod(period) {
        const year = Math.floor(period / 100);
        const month = period % 100;
        if (month === 12) {
            return (year + 1) * 100 + 1; // Начало следующего года
        } else {
            return year * 100 + month + 1; // Следующий месяц
        }
    }

    // Отправка данных
    let currentPeriod = startPeriod;
    try {
        while (currentPeriod <= endPeriod) {
            const data = formatPeriod(currentPeriod);
            console.log(data)
            await getAll(data);
            console.log("Sent data for period:", data);
            currentPeriod = getNextPeriod(currentPeriod);
        }
        fs.writeFile(filePath, JSON.stringify(jsonObjects, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON data to file:', err);
                return;
            }
            console.log('JSON data has been written to', filePath);
        });
        console.log("All data sent successfully.");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Вызов функции для отправки данных
sendPeriodData();


module.exports = {
    getAll: getAll
};
