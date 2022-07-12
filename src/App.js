import { useState } from 'react';
import './App.css';

import { Button } from './components/button.component';

const App = () => {
  const [panelOne, setPanelOne] = useState('0');
  const [operator, setOperator] = useState('+');
  const [panelThree, setPanelThree] = useState('0');
  const [calculatedResult, setCalculatedResult] = useState('0');
  const [storedResult, setStoredResult] = useState('0');

  const updatePanel = (value, panel) => {
    const setter = {
      one: { set: setPanelOne, panelName: panelOne },
      three: { set: setPanelThree, panelName: panelThree },
    };
    const panelName = setter[panel].panelName;
    const panelSetter = setter[panel].set;

    if (!(panelName.includes('.') && value === '.')) {
      if (panelName === '0' && value !== '.') panelSetter(value);
      else panelSetter(panelName + value);
    }
    if (value === 'Clear') panelSetter('0');
  };

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

  const panelButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'Clear'];
  const operatorButtons = ['+', '-', '*', '÷'];

  return (
    <div className="calculator">
      <div className="panel">
        <p>{panelOne}</p>
        <div className="numbers">
          {panelButtons.map((button) => (
            <Button
              key={button + 'panelOne'}
              click={(e) => updatePanel(e.target.innerText, 'one')}
              inner={button}
            />
          ))}
          <Button
            click={() => setPanelOne(storedResult.toString())}
            inner="Recall"
          />
        </div>
      </div>

      <div className="panel">
        <p>{operator}</p>
        <div className="numbers">
          {operatorButtons.map((button) => (
            <Button
              key={button + 'operatorPanel'}
              click={(e) => setOperator(e.target.innerText)}
              inner={button}
            />
          ))}
        </div>
      </div>

      <div className="panel">
        <p>{panelThree}</p>
        <div className="numbers">
          {panelButtons.map((button) => (
            <Button
              key={button + 'panelThree'}
              click={(e) => updatePanel(e.target.innerText, 'three')}
              inner={button}
            />
          ))}
          <Button
            click={() => setPanelThree(storedResult.toString())}
            inner="Recall"
          />
        </div>
      </div>
      <div className="panel answer">
        <p>{calculatedResult}</p>
        <div>
          <Button
            click={() => setCalculatedResult(calculateResult())}
            inner="="
          />
          <Button
            click={() => setStoredResult(calculatedResult)}
            inner="Store"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
