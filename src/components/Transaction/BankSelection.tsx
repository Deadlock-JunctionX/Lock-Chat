import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import { Form, Input, Select } from 'antd';

import { Image } from 'antd';
const { Option } = Select;
const size = 25

const items = [
    {
        label: 'Lock Money',
        key: 'DeadLock',
        icon: <Image src={"/bank-icons/DeadLock.png"} width={size} />
    },
    {
        label: 'ACB',
        key: 'ACB',
        icon: <Image src={"/bank-icons/ACB.png"} width={size} />
    },
    {
        label: 'BIDV',
        key: 'BIDV',
        icon: <Image src={"/bank-icons/BIDV.png"} width={size} />
    },
    {
        label: 'MB',
        key: 'MB',
        icon: <Image src={"/bank-icons/MB.png"} width={size} />
    },
    {
        label: 'SHB',
        key: 'SHB',
        icon: <Image src={"/bank-icons/SHB.png"} width={size} />
    },
    {
        label: 'Techcombank',
        key: 'Techcombank',
        icon: <Image src={"/bank-icons/Techcombank.png"} width={size} />
    },
    {
        label: 'TP Bank',
        key: 'TP Bank',
        icon: <Image src={"/bank-icons/TP Bank.png"} width={size} />
    },
    {
        label: 'Vietcombank',
        key: 'Vietcombank',
        icon: <Image src={"/bank-icons/Vietcombank.png"} width={size} />
    },
    {
        label: 'VietinBank',
        key: 'VietinBank',
        icon: <Image src={"/bank-icons/VietinBank.png"} width={size} />
    },
    {
        label: 'VP Bank',
        key: 'VP Bank',
        icon: <Image src={"/bank-icons/VP Bank.png"} width={size} />
    },
];


const BankSelection: React.FC = () => (

    <Select
        defaultValue={"Lock Money"}
        placeholder="ngân hàng nào?"
        bordered={false}
    >
        {items.map(item => (
          <Option key={item.key} value={item.label} align="center">
            <Space align="center">
                {item.icon} {item.key}
            </Space>
          </Option>
        ))}
    </Select>
);

export default BankSelection;
