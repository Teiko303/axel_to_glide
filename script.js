import XLSX from 'xlsx';
import * as glide from '@glideapps/tables';

const vehiclesTable = glide.table({
    token: "5d8597d1-0c7f-42d2-8511-bffb6b59f674",
    app: "MSJlwASW2xH6GmANvwNM",
    table: "native-table-1L4wPB53vJM273qy7HAu",
    columns: {
        Plate: { type: "string", name: "nFcdO" },
        brand: { type: "string", name: "GARI1" },
        model: { type: "string", name: "CoRZS" },
        year: { type: "number", name: "63KBt" },
        engine: { type: "number", name: "5hUoq" },
        vin: { type: "string", name: "92P7T" },
        demo: { type: "boolean", name: "wV5rf" },
        lease: { type: "boolean", name: "t6VAe" },
        leaseType: { type: "string", name: "KSQji" },
        leaseCompany: { type: "string", name: "btYpW" },
        leaseContract: { type: "string", name: "PpaZ3" },
        mileage: { type: "number", name: "coYhm" },
        motEndDate: { type: "date-time", name: "EOdKj" },
        image: { type: "image-uri", name: "fgWup" },
        category: { type: "string", name: "a92mh" },
        user: { type: "string", name: "W9G9L" },
        owner: { type: "email-address", name: "tASsx" },
        share: { type: "string", name: "uy2KN" },
        note: { type: "string", name: "HXWeD" },
        active: { type: "boolean", name: "FMQp1" },
        invoice1: { type: "image-uri", name: "DK52g" },
        invoice2: { type: "image-uri", name: "z3t5r" },
        zdjCie1Link: { type: "uri", name: "O4beV" },
        zdjCie2Link: { type: "uri", name: "fQ4A6" },
        temp: { type: "string", name: "sXbjr" },
        dateOfAdd: { type: "date-time", name: "dkXCb" },
        pdf1: { type: "string", name: "gKpGW" },
        pdf1: { type: "string", name: "3Jm9z" }
    }
});

let data = [];

// Obsługa wczytania pliku Excel
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        data = XLSX.utils.sheet_to_json(sheet);

        document.getElementById('uploadButton').disabled = false;
        document.getElementById('message').innerText = `Wczytano ${data.length} rekordów.`;
    };

    reader.readAsBinaryString(file);
});

// Dodawanie danych do Glide
document.getElementById('uploadButton').addEventListener('click', async () => {
    try {
        for (let row of data) {
            await vehiclesTable.add(row);
        }
        document.getElementById('message').innerText = "Dane zostały pomyślnie załadowane do Glide.";
    } catch (error) {
        document.getElementById('message').innerText = "Wystąpił błąd podczas ładowania danych.";
        console.error(error);
    }
});