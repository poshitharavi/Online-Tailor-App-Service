const createCsvWriter = require("csv-writer").createObjectCsvWriter;

export const writeDataInCsv = async (data) => {
  const csvWriter = createCsvWriter({
    path: "out.csv",
    header: [
      { id: "height", title: "Height", value: "sd" },
      { id: "chest", title: "Chest" },
      { id: "wasitWidth", title: "WasitWidth" },
      { id: "hip", title: "Hip" },
      { id: "legLength", title: "LegLength" },
      { id: "shoulderWidth", title: "ShoulderWidth" },
    ],
  });

  csvWriter
    .writeRecords(data)
    .then(() => console.log("The CSV file was written successfully"));
};
