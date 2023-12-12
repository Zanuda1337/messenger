import React from 'react';
import ListItem from 'src/components/listItem/ListItem';
import Radio from 'src/components/radio/Radio';

interface Option {
  value: string;
  label: string;
  subtitle?: string;
}

interface RadioGroupProps {
  value: string;
  options: Option[];
  onChange?: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <div className={'list'}>
      {options.map((option) => (
        <ListItem
          slots={{ icon: <Radio active={value === option.value} /> }}
          key={option.value}
          title={option.label}
          subtitle={option.subtitle}
          slotProps={{ subtitleProps: { color: 'tertiary' } }}
          onClick={() => {
            onChange?.(option.value);
          }}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
