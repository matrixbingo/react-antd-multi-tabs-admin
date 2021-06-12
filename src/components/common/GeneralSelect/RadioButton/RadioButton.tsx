import React, { FC } from 'react';
import { Radio } from 'antd';
import { isEmpty } from 'lodash';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import GeneralSelect from '@/customTypes/GeneralSelect';

const RadioButton: FC<GeneralSelect.RadioProps> = (props) => {
  const { defaultId, list, onChange } = props;
  const defaultItem = defaultId ? list.find((item) => item.id === defaultId) : list[0];
  window.console.log('RadioButton  ------->', defaultItem);

  const onChangeCallBack = (e: RadioChangeEvent) => {
    if (e.target?.checked) {
      const item = list.find((i) => e.target.value === i.value);
      onChange && onChange(item);
    }
  };

  return (
    <>
      <Radio.Group defaultValue={defaultItem?.value || '0'} buttonStyle="solid" onChange={onChangeCallBack}>
        {
          !isEmpty(list) && list.map((item, i) => {
            return (
              <Radio.Button value={item.value} key={i.toString()} style={{ margin: 5 }}>
                {item.name}
              </Radio.Button>
            );
          })
        }
      </Radio.Group>
    </>
  );
};

export default RadioButton;
