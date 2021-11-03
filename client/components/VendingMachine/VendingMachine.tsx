import React from 'react';

import './VendingMachine.scss';

export const VendingMachine: React.FC = () => {
  return (
    <>
      <h1 className="vending-machine-title">
        Main Vending Machine page
      </h1> 
      <div>
        <InteractiveButton text="First Button"/>
      </div>
      <div>
        <InteractiveButton text="Second Button"/>
      </div>
    </>
  )
}

interface ButtonProps {
  text: string;
}

const InteractiveButton: React.FC<ButtonProps> = ({text}) => {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {text} {count}
    </button>
  )
}