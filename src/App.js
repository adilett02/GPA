import SubjectForm from './components/SubjectForm';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCalculate, setClean, setSubjNum } from './store';
import logo from './logo.png';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const { subjNum, weightSum, krediSum, GPA } = useSelector((state) => state.counter);

  const onClickClean = (e) => {
    e.preventDefault();
    dispatch(setClean());
  };

  const onClickCalculate = (e) => {
    e.preventDefault();
    dispatch(setCalculate());
  };

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = '';
    });

    return () => {
      window.removeEventListener('beforeunload', (event) => {
        event.preventDefault();
        event.returnValue = '';
      });
    };
  }, []);

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Manas Üniversite Not Ortalaması Hesaplama Aracı</h1>
      </div>
      <div className="lessons_num">
        {' '}
        Dönem Ders Sayısı:{' '}
        <select value={subjNum} onChange={(e) => dispatch(setSubjNum(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i}>{i + 1}</option>
          ))}
        </select>
      </div>
      <form autoComplete="on">
        <table className="table">
          <tbody>
            <tr>
              <th>Ders Adı</th>
              <th>Kredi</th>
              <th>Not</th>
            </tr>
            {Array.from({ length: subjNum }, (_, i) => (
              <SubjectForm key={i} index={i} />
            ))}
          </tbody>
        </table>
        <div className="button__list">
          <button className="btn btn_calculate" onClick={(e) => onClickCalculate(e)}>
            Hesapla
          </button>
          <button className="btn btn_clean" onClick={(e) => onClickClean(e)}>
            Temizle
          </button>
        </div>
      </form>

      <div className="result">
        <table className="table result_table">
          <tbody>
            <tr>
              <th>Sonuç</th>
              <th>Toplam kredi:</th>
              <th>Toplam Ağırlıklı:</th>
              <th>Ortalama:</th>
            </tr>
            <tr>
              <td></td>
              <td>{krediSum}</td>
              <td>{weightSum}</td>
              <td>{GPA}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
