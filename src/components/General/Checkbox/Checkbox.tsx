import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

import './Checkbox.css';

interface CheckboxProps {
  onChange?: (e: boolean) => void;
  title?: string;
  className?: string;
  disabled?: boolean;
}

const Checkbox = ({
  title,
  className = '',
  disabled = false,
  onChange,
}: CheckboxProps) => {
  const [checked, setChecked] = React.useState(false);

  const handleClick = () => {
    if (typeof onChange === 'function') {
      onChange(!checked);
    }

    if (!disabled) {
      setChecked(!checked);
    }
  };

  return (
    <label className={`checkbox-wrapper ${className}`} onClick={handleClick}>
      <span className={`checkbox-icon ${checked ? 'checked' : ''}`}>
        {checked ? (
          <CheckSquare width={26} height={26} />
        ) : (
          <Square width={26} height={26} />
        )}
      </span>
      <span className="checkbox-title">{title}</span>
    </label>
  );
};

export default Checkbox;
