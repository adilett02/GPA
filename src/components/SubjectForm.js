import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubjName, setKredi, setWeight } from '../store';
const SubjectForm = ({ index }) => {
  const dispatch = useDispatch();

  const defaultName = `Ders ${index + 1}`;
  const { kredi, grade, subjName, weightInvalidate, krediInvalidate } = useSelector(
    (state) => state.counter.info[index],
  );

  const onFocus = () => {
    if (subjName === defaultName) {
      dispatch(setSubjName({ value: '', index }));
    }
  };
  const onBlur = () => {
    if (subjName === '') {
      dispatch(setSubjName({ value: defaultName, index }));
    }
  };

  const onChangeKredi = (value) => {
    dispatch(setKredi({ value, index }));
  };
  const onChangeWeight = (value) => {
    dispatch(setWeight({ value, index }));
  };
  const onChangeName = (value) => {
    dispatch(setSubjName({ value, index }));
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={subjName}
          onChange={(e) => onChangeName(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          name="subject"
          autoComplete="on"
        />
      </td>
      <td className={krediInvalidate ? 'warning' : ''}>
        <select value={kredi} onChange={(e) => onChangeKredi(e.target.value)}>
          <option value hidden>
            Seçiniz
          </option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i}>{i + 1}</option>
          ))}
        </select>
      </td>
      <td className={weightInvalidate ? 'warning' : ''}>
        <select value={grade} required onChange={(e) => onChangeWeight(e.target.value)}>
          <option hidden disabled>
            Seçiniz
          </option>
          <option>AA</option>
          <option>BA</option>
          <option>BB</option>
          <option>CB</option>
          <option>CC</option>
          <option>DC</option>
          <option>DD</option>
          <option>FF</option>
        </select>
      </td>
    </tr>
  );
};

export default SubjectForm;
