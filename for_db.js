const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Путь к вашему JSON-файлу
const jsonFilePath = 'data.json';

// Путь к файлу базы данных SQLite
const dbPath = 'example.db';

// Создание соединения с базой данных
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database:', dbPath);

    // Чтение файла JSON
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        
        try {
            // Преобразование содержимого файла в объект JavaScript
            const jsonData = JSON.parse(data);
            
            // Создание таблицы
            db.run(`CREATE TABLE IF NOT EXISTS satellite_data (
                id INTEGER PRIMARY KEY,
                satellite_name TEXT,
                image_type TEXT,
                receiving_station TEXT,
                reception_date TEXT,
                download_orbit_number TEXT,
                archiving_date TEXT,
                programming_request_id TEXT,
                acquisition_type TEXT,
                data_strip_id TEXT UNIQUE,
                acquisition_start_date TEXT,
                acquisition_end_date TEXT,
                acquisition_mode TEXT,
                acquisition_orbit_direction TEXT,
                instrument_name TEXT,
                spectral_mode TEXT,
                theoretical_resolution TEXT,
                nw_corner_latitude TEXT,
                nw_corner_longitude TEXT,
                ne_corner_latitude TEXT,
                ne_corner_longitude TEXT,
                se_corner_latitude TEXT,
                se_corner_longitude TEXT,
                sw_corner_latitude TEXT,
                sw_corner_longitude TEXT,
                across_track_incidence_angle TEXT,
                along_track_incidence_angle TEXT,
                incidence_angle TEXT,
                sun_elevation_angle TEXT,
                sun_azimuth_angle TEXT,
                quality_percentage_of_bad_values TEXT,
                quality_computation_mode TEXT
            );`, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                    return;
                }
                console.log('Table "satellite_data" has been created.');
                
                // Вставка данных в таблицу
                jsonData.forEach((item) => {
                    const missionInfo = item["Mission Information"];
                    const dataStripInfo = item["DataStrip Information"];
                    const geoInfo = item["Geographic Location Information"];
                    const techInfo = item["Technical Information (Optic)"];
                    
                    db.run(`INSERT INTO satellite_data (
                        satellite_name,
                        image_type,
                        receiving_station,
                        reception_date,
                        download_orbit_number,
                        archiving_date,
                        programming_request_id,
                        acquisition_type,
                        data_strip_id,
                        acquisition_start_date,
                        acquisition_end_date,
                        acquisition_mode,
                        acquisition_orbit_direction,
                        instrument_name,
                        spectral_mode,
                        theoretical_resolution,
                        nw_corner_latitude,
                        nw_corner_longitude,
                        ne_corner_latitude,
                        ne_corner_longitude,
                        se_corner_latitude,
                        se_corner_longitude,
                        sw_corner_latitude,
                        sw_corner_longitude,
                        across_track_incidence_angle,
                        along_track_incidence_angle,
                        incidence_angle,
                        sun_elevation_angle,
                        sun_azimuth_angle,
                        quality_percentage_of_bad_values,
                        quality_computation_mode
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
                    [
                        missionInfo["Satellite Name"],
                        missionInfo["Image Type"],
                        missionInfo["Receiving Station"],
                        missionInfo["Reception Date"],
                        missionInfo["Download Orbit Number"],
                        missionInfo["Archiving Date"],
                        missionInfo["Programming Request ID"],
                        missionInfo["Acquisition Type"],
                        dataStripInfo["DataStrip ID"],
                        dataStripInfo["Acquisition Start Date"],
                        dataStripInfo["Acquisition End Date"],
                        dataStripInfo["Acquisition Mode"],
                        dataStripInfo["Acquisition Orbit Direction"],
                        dataStripInfo["Instrument Name"],
                        dataStripInfo["Spectral Mode"],
                        dataStripInfo["Theoretical Resolution (in meters)"],
                        geoInfo["NW Corner Latitude"],
                        geoInfo["NW Corner Longitude"],
                        geoInfo["NE Corner Latitude"],
                        geoInfo["NE Corner Longitude"],
                        geoInfo["SE Corner Latitude"],
                        geoInfo["SE Corner Longitude"],
                        geoInfo["SW Corner Latitude"],
                        geoInfo["SW Corner Longitude"],
                        techInfo["Across-Track Incidence Angle"],
                        techInfo["Along-Track Incidence Angle"],
                        techInfo["Incidence Angle"],
                        techInfo["Sun Elevation Angle"],
                        techInfo["Sun Azimuth Angle"],
                        techInfo["Quality / Average Percentage of Bad Values"],
                        techInfo["Quality / Computation Mode"]
                    ], function(err) {
                        if (err) {
                            console.error('Error inserting data:', err.message);
                            return;
                        }
                        console.log(`A row has been inserted with rowid ${this.lastID}`);
                    });
                });
            });
        } catch (err) {
            console.error('Error parsing JSON data:', err);
        }
    });
});
