import { useState } from 'react'
import { Button, Card, Space, Table, Tag } from 'antd'
import Action from './Action'

const columns = [
  {
    title: 'ActionName',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'ActionType',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Reciver',
    dataIndex: 'reciver',
    key: 'reciver',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => { console.log(record) }}>Delete</a>
      </Space>
    ),
  },
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    type: 'MailWithToken',
    token: '123456789',
    reciver: 'xxx@qq.com',
    title: 'xxx',
    body: 'xx',
  },
]

const ActionList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = (values: any) => {
    console.log('Received values of form: ', values)
    setIsModalVisible(false)
  }

  return (
    <>
      <Card title="Action List" style={{ width: '80%', margin: '10px auto' }}>
        <div style={{ marginBottom: 16, textAlign: 'left' }}>
          <Button type="primary" onClick={showModal}>
            Add Action
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>

      <Action
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default ActionList
