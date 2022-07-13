import { Button } from './button.component';

export const CalculatorPanel = ({
  panel,
  panelName,
  type,
  clickOne,
  clickTwo,
}) => {
  const buttons = {
    panel: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'Clear'],
    operator: ['+', '-', '*', '÷'],
  };

  return (
    <div className="panel">
      <p>{panel}</p>
      <div className="numbers">
        {buttons[type].map((button) => (
          <Button key={button + panelName} click={clickOne} inner={button} />
        ))}
        {clickTwo && <Button click={clickTwo} inner="Recall" />}
      </div>
    </div>
  );
};
