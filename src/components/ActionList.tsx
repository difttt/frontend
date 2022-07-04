import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Space, Table, Tag } from 'antd'
import * as substrate from '../substrate'
import Action from './Action'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    fixed: 'left',
    width: 80,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 150,
    render: (text: string) => `${text}`,
  },
  {
    title: 'ReceiverEmail',
    dataIndex: 'receiver',
    key: 'receiver',
    align: 'center',
    minWidth: 200,
  },
  {
    title: 'Mail/Oracle URL',
    dataIndex: 'url',
    key: 'url',
    align: 'center',
  },
  {
    title: 'Mail/Oracle Asset',
    dataIndex: 'token',
    key: 'token',
    align: 'center',
  },
  {
    title: 'MailTitle',
    dataIndex: 'title',
    key: 'title',
    align: 'center',
  },
  {
    title: 'MailBody',
    dataIndex: 'body',
    key: 'body',
    align: 'center',
  },
  {
    title: 'SellAsset',
    dataIndex: 'sellTokenName',
    key: 'sellTokenName',
    align: 'center',
  },
  {
    title: 'SellAmount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'center',
  },
  {
    title: 'BuyAsset',
    dataIndex: 'buyTokenName',
    key: 'buyTokenName',
    align: 'center',
  },
  {
    title: 'BuyAddress',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: 'SlackHookUrl',
    dataIndex: 'slack_hook_url',
    key: 'slack_hook_url',
    align: 'center',
  },
  {
    title: 'SlackMessage',
    dataIndex: 'message',
    key: 'message',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    render: (_: any) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
] as any

const ActionList = ({ actions, setActions }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const getActions = async () => {
    const actions = await substrate.getActions()
    setActions(actions)
  }

  const createAction = async (data: any) => {
    setLoading(true)
    const action = await substrate.createAction(data)

    if (action) {
      setLoading(false)
      getActions()
    }
  }

  useEffect(() => {
    getActions()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = (values: any) => {
    if (values.actionType === 'MailWithToken') {
      createAction({
        MailWithToken: [
          values.url,
          values.token,
          values.receiver,
          values.title,
          values.body,
        ],
      })
    }
    else if (values.actionType === 'Oracle') {
      createAction({
        Oracle: [values.url, values.name],
      })
    }
    else if (values.actionType === 'BuyToken') {
      createAction({
        BuyToken: [
          values.address,
          values.sellTokenName,
          values.amount,
          values.buyTokenName,
          values.receiverEmail,
        ],
      })
    }
    else if (values.actionType === 'Slack') {
      createAction({
        Slack: [values.slack_hook_url, values.message],
      })
    }
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
        <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={actions}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Action
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

ActionList.propTypes = {
  actions: PropTypes.array,
  setActions: PropTypes.func,
}

export default ActionList
