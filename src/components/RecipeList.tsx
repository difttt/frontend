import { useState } from 'react'
import { Button, Card, Space, Table } from 'antd'
import Recipe from './Recipe'

const columns = [
  {
    title: 'TriggerName',
    dataIndex: 'triggerName',
    key: 'triggerName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'ActionName',
    dataIndex: 'actionName',
    key: 'actionName',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => {}}>Delete</a>
        <a onClick={() => {}}>TurnOn</a>
        <a onClick={() => {}}>TurnOff</a>
      </Space>
    ),
  },
]
const data = [
  {
    key: '1',
    triggerId: 'aaaa',
    triggerName: 'John Brown',
    actionId: 'bbbb',
    actionName: 'John difttt sdfsf',
  },
]

const RecipeList = () => {
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
      <Card title="Recipe List" style={{ width: '80%', margin: '10px auto' }}>
        <div style={{ marginBottom: 16, textAlign: 'left' }}>
          <Button type="primary" onClick={showModal}>
            Add recipe
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>

      <Recipe
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default RecipeList
