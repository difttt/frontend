import { Form, Input, Modal, Select } from 'antd'

const Action = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Create Action"
      getContainer={false}
      maskClosable={false}
      visible={visible}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        name="ActionForm"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ actionType: '' }}
        autoComplete="off"
        style={{ padding: '20px' }}
      >
        <Form.Item
          label="Action Type"
          name="actionType"
          rules={[{ required: true, message: 'Please input your action type!' }]}
        >
          <Select placeholder="Select a action type">
            <Select.Option value="MailWithToken">邮件</Select.Option>
            <Select.Option value="Oracle">合约</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Url"
          name="url"
          rules={[{ required: true, message: 'Please input your url!' }]}
        >
          <Input placeholder="Url" />
        </Form.Item>

        <Form.Item
          label="Token"
          name="token"
          rules={[{ required: true, message: 'Please input your token!' }]}
        >
          <Input placeholder="token" />
        </Form.Item>

        <Form.Item
          label="Reciver"
          name="reciver"
          rules={[{ required: true, message: 'Please input your reciver!' }]}
        >
          <Input placeholder="reciver" />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input placeholder="title" />
        </Form.Item>

        <Form.Item
          label="Body"
          name="body"
          rules={[{ required: true, message: 'Please input your body!' }]}
        >
          <Input placeholder="body" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Action
