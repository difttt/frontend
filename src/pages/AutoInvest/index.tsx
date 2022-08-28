import "./index.css";
import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
  Space,
  Table,
  TimePicker,
} from "antd";

import type { ColumnsType } from "antd/es/table";
import extension from "../../substrate/extension";
import * as index from "../../substrate/index";

async function getChainInfo() {
  const chainInfo = await index.getChainInfo();
  console.log(
    "substrate blockchain connected!!! chain information:",
    chainInfo
  );
}

getChainInfo();

async function getUser(userName: string) {
  const user = await index.getUser(userName);
  console.log("address:", user.address);
}

getUser("Alice");
getUser("Bob");

interface CreateForm {
  investCurrency: string;
  amount: string;
  buyCurrency: string;
  cycleType: string; // 'day' | 'week' | 'month'
  cycleDate: string;
  cycleTime: string;
  buyPrice: number;
}

function AutoInvest() {
  console.log(
    extension.allAccounts,
    extension.extensions
  );
  const extensions = extension.extensions;
  const allAccounts = extension.allAccounts;

  const [form] = Form.useForm();
  const [
    createModalVisible,
    setCreateModalVisible,
  ] = useState(false);

  const [targetCurrent, setTargetCurrent] =
    useState("");
  const handleCreatePlan = (record: DataType) => {
    console.log("create plan", record.currency);
    setTargetCurrent(record.currency);
    setCreateModalVisible(true);
  };

  interface DataType {
    key: string;
    currency: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Target Currency",
      dataIndex: "currency",
      key: "currency",
      align: "center",
      render: (text: string) => {
        return (
          <span
            style={{
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {text.toUpperCase()}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={handleCreatePlan.bind(
              null,
              record
            )}
          >
            Create Plan
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "2",
      currency: "RENBTC",
    },
    {
      key: "3",
      currency: "ETH",
    },
    {
      key: "4",
      currency: "USDT",
    },
  ];

  const [currentExtension, setExtension] =
    useState("");
  const [currentAccounts, setAccounts] = useState(
    [] as any[]
  );
  const [currentAccount, setAccount] = useState();
  const handleExtensionChange = (
    value: string
  ) => {
    setExtension(value);
    const accounts =
      allAccounts.filter(
        (account) => account.meta.source === value
      ) || [];
    setAccounts(accounts);
  };
  return (
    <div>
      <div className="header">
        <h1>Red Stone</h1>
        <div
          style={{
            position: "absolute",
            right: "20px",
          }}
        >
          <Select
            value={currentExtension}
            style={{
              width: 120,
              marginRight: "20px",
            }}
            onChange={handleExtensionChange}
          >
            {extensions.map((extension) => (
              <Select.Option
                key={extension.name}
                value={extension.name}
              >
                {extension.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            value={currentAccount}
            style={{ width: 120 }}
            onChange={(value) => {
              setAccount(value);
            }}
          >
            {currentAccounts.map((account) => (
              <Select.Option
                key={account.address}
                value={account.address}
              >
                {account.meta.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="content">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>

      <Modal
        title={`Create Plan for ${targetCurrent}`}
        maskClosable={false}
        visible={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then(async (values) => {
              form.resetFields();
              console.log(values);
              const {
                amount,
                sellCurrency,
                buyTimer,
              } = values;

              const now = Math.floor(
                new Date().getTime() / 1000
              );

              await index.createTrigger({
                Timer: [now, buyTimer],
              });

              await index.createAction({
                BuyToken: [
                  currentAccount,
                  sellCurrency,
                  amount,
                  targetCurrent,
                  "shiyivei@outlook.com",
                ],
              });

              await index.createRecipe(0, 0);

              console.log(
                "buyAddress:",
                currentAccount
              );
              console.log(
                "targetCurrent:",
                targetCurrent
              );
            })
            .catch((info) => {
              console.error(
                "Validate Failed:",
                info
              );
            });
        }}
      >
        <Form
          name="createPlanForm"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ currency: "" }}
        >
          <Form.Item
            label="Invest Amount"
            name="amount"
            rules={[
              {
                required: true,
                message:
                  "Please input your currency!",
              },
            ]}
          >
            <Input placeholder="Invest Amount" />
          </Form.Item>
          <Form.Item
            label="Sell Currency"
            name="sellCurrency"
            rules={[
              {
                required: true,
                message:
                  "Please input your currency!",
              },
            ]}
          >
            <Select placeholder="Invest Currency">
              <Select.Option value="AUSD">
                AUSD
              </Select.Option>
              <Select.Option value="ETH">
                ETH
              </Select.Option>
              <Select.Option value="USDT">
                USDT
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Buy Timer"
            name="buyTimer"
            rules={[
              {
                required: true,
                message:
                  "Please input your currency!",
              },
            ]}
          >
            <Input placeholder="Buy Price" />
          </Form.Item>
          {/* <Form.Item
            label="Cycle Type"
            name="cycleType"
            rules={[
              {
                required: true,
                message:
                  "Please input your currency!",
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value="day">
                Day
              </Radio.Button>
              <Radio.Button value="week">
                Week
              </Radio.Button>
              <Radio.Button value="month">
                Month
              </Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          {/* {({ getFieldValue }) => {
            const cycleType =
              getFieldValue("cycleType");
            if (cycleType === "week") {
              return (
                <Form.Item
                  label="Cycle Date"
                  name="cycleDate"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input your currency!",
                    },
                  ]}
                >
                  <Select placeholder="Cycle Date">
                    <Select.Option value="1">
                      1
                    </Select.Option>
                    <Select.Option value="2">
                      2
                    </Select.Option>
                    <Select.Option value="3">
                      3
                    </Select.Option>
                    <Select.Option value="4">
                      4
                    </Select.Option>
                    <Select.Option value="5">
                      5
                    </Select.Option>
                    <Select.Option value="6">
                      6
                    </Select.Option>
                    <Select.Option value="7">
                      7
                    </Select.Option>
                  </Select>
                </Form.Item>
              );
            } else if (cycleType === "month") {
              return (
                <Form.Item
                  label="Cycle Date"
                  name="cycleDate"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please input your currency!",
                    },
                  ]}
                >
                  <Input placeholder="1 - 28" />
                </Form.Item>
              );
            }
          }}
          <Form.Item
            label="Cycle Time"
            name="cycleTime"
            rules={[
              {
                required: true,
                message:
                  "Please input your currency!",
              },
            ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
}

export default AutoInvest;