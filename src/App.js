import { useState } from 'react';
import './App.css';

import { Button } from './components/button.component';
import { CalculatorPanel } from './components/calculator-panel.component';

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

  return (
    <div className="calculator">
      <CalculatorPanel
        panel={panelOne}
        panelName="panelOne"
        type="panel"
        clickOne={(e) => updatePanel(e.target.innerText, 'one')}
        clickTwo={() => setPanelOne(storedResult.toString())}
      />

      <CalculatorPanel
        panel={operator}
        panelName="operatorPanel"
        type="operator"
        clickOne={(e) => setOperator(e.target.innerText)}
      />

      <CalculatorPanel
        panel={panelThree}
        panelName="panelThree"
        type="panel"
        clickOne={(e) => updatePanel(e.target.innerText, 'three')}
        clickTwo={() => setPanelThree(storedResult.toString())}
      />

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
