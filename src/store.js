import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const gradeTable = {
  AA: 4,
  BA: 3.5,
  BB: 3,
  CB: 2.5,
  CC: 2,
  DC: 1.5,
  DD: 1,
  FF: 0,
};
const defaultOption = 'Seçiniz';

const initialState = {
  subjNum: 1,
  info: [
    {
      subjName: 'Ders 1',
      grade: defaultOption,
      kredi: defaultOption,
      weightInvalidate: false,
      krediInvalidate: false,
    },
  ],
  krediSum: 0,
  weightSum: 0,
  GPA: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSubjName: (state, action) => {
      state.info[action.payload.index]['subjName'] = action.payload.value;
    },
    setKredi: (state, action) => {
      state.info[action.payload.index]['kredi'] = action.payload.value;
      state.info[action.payload.index].krediInvalidate = false;
    },
    setWeight: (state, action) => {
      state.info[action.payload.index]['grade'] = action.payload.value;
      state.info[action.payload.index].weightInvalidate = false;
    },
    setClean: (state) => {
      for (let i = 0; i < state.info.length; i++) {
        state.info[i] = {
          subjName: `Ders ${i + 1}`,
          grade: defaultOption,
          kredi: defaultOption,
          weightInvalidate: false,
          krediInvalidate: false,
        };
      }
      state.krediSum = 0;
      state.weightSum = 0;
      state.GPA = 0;
    },
    setSubjNum: (state, action) => {
      state.subjNum = action.payload;
      for (let i = 0; i < action.payload; i++) {
        if (!state.info[i]) {
          state.info[i] = {
            subjName: `Ders ${i + 1}`,
            grade: defaultOption,
            kredi: defaultOption,
            weightInvalidate: false,
            krediInvalidate: false,
          };
        }
      }
      state.info = state.info.slice(0, action.payload);
    },
    setCalculate: (state) => {
      //validate
      for (let i = 0; i < state.info.length; i++) {
        if (state.info[i].kredi === defaultOption) {
          state.info[i].krediInvalidate = true;
          alert('Lütfen bütün boşlukları doldurun!');
          return;
        }
        if (state.info[i].grade === defaultOption) {
          state.info[i].weightInvalidate = true;
          alert('Lütfen bütün boşlukları doldurun!');
          return;
        }
      }

      //calculate
      state.krediSum = 0;
      state.weightSum = 0;
      for (let i = 0; i < state.info.length; i++) {
        state.krediSum += Number(state.info[i].kredi);

        let gradee = state.info[i].grade;
        state.weightSum += gradeTable[gradee] * state.info[i].kredi;
      }
      state.GPA = Math.round((state.weightSum / state.krediSum) * 100) / 100;
    },
  },
});

export const { setKredi, setWeight, setClean, setSubjNum, setSubjName, setCalculate } =
  counterSlice.actions;

export default counterSlice.reducer;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
