import axios from 'axios';

const BASE_URL = 'https://graduation-project-7c908-default-rtdb.europe-west1.firebasedatabase.app';
const NUTRIENTS = 'nutrients';
const SETTINGS = 'settings';
const WEIGHT_GAIN = 'Weight Gain';
const WEIGHT_LOSS = 'Weight Loss';
let dataSettingsKey;

export const getNutrientList = (req, res, next) => {
   axios.get(`${BASE_URL}/${NUTRIENTS}.json`)
      .then(response => {
         let nutrients = [];
         for (const key in response.data) {
            nutrients.push({
               id: key,
               name: response.data[key].name,
               unit: response.data[key].unit,
               calories: response.data[key].calories,
               proteins: response.data[key].proteins
            });
         }
         res.status(200).json(nutrients);
      })
      .catch(error => console.log(error));
};

export const getDataSettings = (req, res, next) => {
   axios.get(`${BASE_URL}/${SETTINGS}.json`)
      .then(response => {
         let dataSettings;
         let dailyCalorieTargetLowerBound;
         let dailyCalorieTargetUpperBound;
         let dailyProteinNeed;

         for (const key in response.data) {
            dataSettings = {
               dailyCalorieNeed: response.data[key].dailyCalorieNeed,
               weight: response.data[key].weight,
               fatRatio: response.data[key].fatRatio,
               fitnessGoal: response.data[key].fitnessGoal
            };
            dataSettingsKey = key;
         }

         const fatlessWeight = dataSettings.weight * (100 - dataSettings.fatRatio) / 100;

         switch (dataSettings.fitnessGoal) {
            case WEIGHT_GAIN:
               dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed;
               dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed + 300;
               dailyProteinNeed = fatlessWeight * 2;
               break;
            case WEIGHT_LOSS:
               dailyCalorieTargetLowerBound = dataSettings.dailyCalorieNeed - 500;
               dailyCalorieTargetUpperBound = dataSettings.dailyCalorieNeed;
               dailyProteinNeed = fatlessWeight * 1.5;
               break;
         }

         res.status(200).json({
            dailyCalorieTargetLowerBound,
            dailyCalorieTargetUpperBound,
            dailyProteinNeed
         });
      })
      .catch(error => console.log(error));
};

export const updateSettings = (req, res, next) => {
   axios.put(`${BASE_URL}/${SETTINGS}/${dataSettingsKey}.json`, req.body);
   res.status(200).json();
};

export const updateNutrient = (req, res, next) => {
   axios.put(`${BASE_URL}/${NUTRIENTS}/${req.body.id}.json`, {
      name: req.body.name,
      unit: req.body.unit,
      calories: req.body.calories,
      proteins: req.body.proteins,
   });
   res.status(200).json();
};

export const addNutrient = (req, res, next) => {
   axios.post(`${BASE_URL}/${NUTRIENTS}.json`, req.body);
   res.status(200).json();
};

export const deleteNutrient = (req, res, next) => {
   axios.delete(`${BASE_URL}/${NUTRIENTS}/${req.body.id}.json`);
   res.status(200).json();
};
