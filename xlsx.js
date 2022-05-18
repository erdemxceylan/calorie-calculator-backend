import axios from 'axios';
import XLSX from 'xlsx';

const BASE_URL = 'https://graduation-project-7c908-default-rtdb.europe-west1.firebasedatabase.app';
const NUTRIENTS = 'nutrients';

let workbook = XLSX.readFile('Nutrient List.xlsx');
let worksheet = workbook.Sheets[workbook.SheetNames[0]];

for (let index = 1; index <= 243; index++) {
   const name = worksheet[`A${index}`].v;
   const unit = worksheet[`B${index}`].v;
   const calories = worksheet[`C${index}`].v.toFixed(2);
   const proteins = worksheet[`D${index}`].v.toFixed(2);
   axios.post(`${BASE_URL}/${NUTRIENTS}.json`, { name, unit, calories, proteins });
}
