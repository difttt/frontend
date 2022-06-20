import { useEffect, useState } from 'react'
// import { useAtom } from 'jotai'
import dayjs from 'dayjs'
import { Button, Card, Space, Table } from 'antd'
import * as substrate from '../substrate'
import Trigger from './Trigger'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '类型',
    align: 'center',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '创建时间',
    align: 'center',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '触发条件',
    align: 'center',
    dataIndex: 'condition',
    key: 'condition',
    render: (text: string, record) => {
      if (record.type === 'Timer') { return `间隔：${text} s` }
      else if (record.type === 'Schedule') {
        const time = +text.split(',').join('')
        const timeFormat = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        return `执行时间：${timeFormat}`
      }
      else if (record.type === 'PriceGT') { return `价格上限：${text}` }
      else if (record.type === 'PriceLT') { return `价格下限：${text}` }
    },
  },
  {
    title: '操作',
    align: 'center',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => {}}>Delete</a>
      </Space>
    ),
  },
]

const TriggerList = ({ triggers, setTriggers }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [triggers, setTriggers] = useState([])

  const getTriggers = async () => {
    const triggers = await substrate.getTriggers()

    if (triggers)
      setTriggers(triggers)
  }

  const createTrigger = async (data) => {
    const ret = await substrate.createTrigger(data)
    if (ret) {
      setTimeout(() => {
        getTriggers()
      }, 2000)
    }
  }

  useEffect(() => {
    getTriggers()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = (values: any) => {
    const now = new Date().getTime()
    if (values.triggerType === 'Timer') {
      createTrigger({
        Timer: [now, values.interval],
      })
    }
    else if (values.triggerType === 'Schedule') {
      const schedule = new Date(values.schedule).getTime()
      createTrigger({
        Schedule: [now, schedule],
      })
    }
    else if (values.triggerType === 'PriceGT') {
      createTrigger({
        PriceGT: [now, values.priceGT],
      })
    }
    else if (values.triggerType === 'PriceLT') {
      createTrigger({
        PriceLT: [now, values.priceLT],
      })
    }
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
        <Table
          bordered
          columns={columns}
          dataSource={triggers}
        />
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
