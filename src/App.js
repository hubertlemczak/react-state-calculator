import { useState } from 'react';
import './App.css';

import { Button } from './components/button.component';

const App = () => {
  const [panelOne, setPanelOne] = useState('0');
  const [operator, setOperator] = useState('+');
  const [panelThree, setPanelThree] = useState('0');
  const [calculatedResult, setCalculatedResult] = useState('0');
  const [storedResult, setStoredResult] = useState();

  const updatePanelOne = (e) => {
    if (!(panelOne.includes('.') && e.target.innerText === '.')) {
      if (panelOne === '0' && e.target.innerText !== '.') {
        setPanelOne(e.target.innerText);
      } else setPanelOne(panelOne + e.target.innerText);
    }
    if (e.target.innerText === 'Clear') setPanelOne('0');
  };

  const updateOperator = (e) => setOperator(e.target.innerText);

  const updatePanelThree = (e) => {
    if (!(panelThree.includes('.') && e.target.innerText === '.')) {
      if (panelThree === '0' && e.target.innerText !== '.') {
        setPanelThree(e.target.innerText);
      } else setPanelThree(panelThree + e.target.innerText);
    }
    if (e.target.innerText === 'Clear') setPanelThree('0');
  };

  const updateCalculatedResult = () => setCalculatedResult(calculateResult());

  const calculateResult = () => {
    const operators = {
      '+': Number(panelOne) + Number(panelThree),
      '-': Number(panelOne) - Number(panelThree),
      '*': Number(panelOne) * Number(panelThree),
      '÷': Number(panelOne) / Number(panelThree),
    };

    if (isNaN(operators[operator])) return 'Cannot divide 0 by 0';
    if (operators[operator] === Infinity) return 'Cannot divide by 0';

    return operators[operator];
  };

  const updateStoredResult = () => setStoredResult(calculatedResult);
  const recallPanelOne = () => setPanelOne(storedResult || '0');
  const recallPanelThree = () => setPanelThree(storedResult || '0');

  const panelButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'Clear'];

  return (
    <div className="calculator">
      <div className="panel">
        <p>{panelOne}</p>
        <div className="numbers">
          {panelButtons.map((button) => (
            <Button
              key={button + 'panelOne'}
              click={updatePanelOne}
              inner={button}
            />
          ))}
          <Button click={recallPanelOne} inner="Recall" />
        </div>
      </div>

      <div className="panel">
        <p>{operator}</p>
        <div className="numbers">
          <Button click={updateOperator} inner="+" />
          <Button click={updateOperator} inner="-" />
          <Button click={updateOperator} inner="*" />
          <Button click={updateOperator} inner="÷" />
        </div>
      </div>

      <div className="panel">
        <p>{panelThree}</p>
        <div className="numbers">
          {panelButtons.map((button) => (
            <Button
              key={button + 'panelThree'}
              click={updatePanelThree}
              inner={button}
            />
          ))}
          <Button click={recallPanelThree} inner="Recall" />
        </div>
      </div>
      <div className="panel answer">
        <p>{calculatedResult}</p>
        <div>
          <Button click={updateCalculatedResult} inner="=" />
          <Button click={updateStoredResult} inner="Store" />
        </div>
      </div>
    </div>
  );
};

export default App;
