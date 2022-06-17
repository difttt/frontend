import { useState } from 'react'
import dayjs from 'dayjs'
import { Button, Card, Space, Table } from 'antd'
import { getChainInfo } from '../substrate'
import Trigger from './Trigger'

getChainInfo()

const columns = [
  {
    title: 'TriggerName',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'TriggerType',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'CreatedTime',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: 'Timer',
    dataIndex: 'timer',
    key: 'timer',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        {/* <a>Invite {record.name}</a> */}
        <a onClick={() => {}}>Delete</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    type: 'Timer',
    createdTime: new Date().getTime(),
    timer: '1h',
  },
  {
    key: '2',
    name: 'John Brown',
    type: 'Timer',
    createdTime: new Date().getTime(),
    timer: '1h',
  },
]

const TriggerList = () => {
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
      <Card title="Trigger List" style={{ width: '80%', margin: '10px auto' }}>
        <div style={{ marginBottom: 16, textAlign: 'left' }}>
          <Button type="primary" onClick={showModal}>
            Add Trigger
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>

      <Trigger
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default TriggerList
