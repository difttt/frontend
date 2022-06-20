import { useEffect, useState } from 'react'
import { Button, Card, Space, Table } from 'antd'
import * as substrate from '../substrate'
import Recipe from './Recipe'

const RecipeList = ({ triggers, actions }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [recipes, setRecipes] = useState([])

  const getRecipes = async () => {
    const recipes = await substrate.getRecipes()
    setRecipes(recipes)
  }

  const createRecipe = async (actionId, triggerId) => {
    await substrate.createRecipe(actionId, triggerId)
    getRecipes()
  }

  const recipeTurnOn = async (id) => {
    await substrate.recipeTurnOn(id)
    getRecipes()
  }

  const recipeTurnOff = async (id) => {
    await substrate.recipeTurnOff(id)
    getRecipes()
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'TrigerID',
      dataIndex: 'trigerId',
      key: 'trigerId',
      align: 'center',
    },
    {
      title: 'ActionID',
      dataIndex: 'actionId',
      key: 'actionId',
      align: 'center',
    },
    {
      title: 'Done/Doing',
      dataIndex: 'done',
      key: 'done',
      align: 'center',
      render: (text: boolean) => (text ? 'Done' : 'Doing'),
    },
    {
      title: 'Times',
      dataIndex: 'times',
      key: 'times',
      align: 'center',
    },
    {
      title: 'enable/disable',
      dataIndex: 'enable',
      key: 'enable',
      align: 'center',
      render: (text: boolean) => (text ? 'enable' : 'disable'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => { recipeTurnOn(record.id) }}>TurnOn</a>
          <a onClick={() => { recipeTurnOff(record.id) }}>TurnOff</a>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getRecipes()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = (values: any) => {
    createRecipe(values.action, values.trigger)
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
        <Table bordered columns={columns} dataSource={recipes} />
      </Card>

      <Recipe
        visible={isModalVisible}
        triggers={triggers}
        actions={actions}
        onCreate={handleOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default RecipeList
