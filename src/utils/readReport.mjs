import { __dirname } from "./utils.mjs";
import { createReadStream } from "node:fs";
import path from "path";
import { parse } from "csv-parse";

const BREACH_SUBMISSION_DATE_CSV_INDEX = 5;
const INDIVIDUALS_AFFECTED_CSV_INDEX = 4;
const dataMap = new Map();
export const dataArray = [];
const readFile = async () => {
  const reportPath = path.resolve(
    __dirname,
    "../../public/reports/breach_report.csv"
  );

  createReadStream(reportPath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      dataMap.set(
        row[BREACH_SUBMISSION_DATE_CSV_INDEX],
        row[INDIVIDUALS_AFFECTED_CSV_INDEX]
      );
      //console.log(row);
    })
    .on("end", processMapData)
    .on("error", function (error) {
      console.log(error.message);
    });
};

readFile();

function processMapData() {
  const groupedData = {};
  dataMap.keys((entry) => console.log(entry));
  for (const [data, affectedIndividuals] of dataMap.entries()) {
    const year = new Date(Date.parse(data)).getFullYear();
    if (!(year in groupedData)) {
      groupedData[year] = 0;
    }
    if (year in groupedData)
      groupedData[year] += parseFloat(affectedIndividuals)
        ? parseFloat(affectedIndividuals)
        : 0;
  }

  for (const [year, individuals] of Object.entries(groupedData)) {
    dataArray.push({
      year,
      individuals,
    });
  }
}
