import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

const Action = ({ visible, onCreate, onCancel }: any) => {
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
            console.error('Validate Failed:', info)
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
            <Select.Option value="MailWithToken">MailWithToken</Select.Option>
            <Select.Option value="Oracle">Oracle</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.actionType !== currentValues.actionType}
        >
          {({ getFieldValue }) => {
            const actionType = getFieldValue('actionType')
            if (actionType === 'MailWithToken') {
              return (
                <>
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
                  label="receiver"
                  name="receiver"
                  rules={[{ required: true, message: 'Please input your receiver!' }]}
                >
                  <Input placeholder="receiver" />
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
                </>
              )
            }
            else if (actionType === 'Oracle') {
              return (
                <>
                  <Form.Item
                    label="Price Url"
                    name="url"
                    rules={[{ required: true, message: 'Please input PriceUrl!' }]}
                  >
                    <Input placeholder="url" />
                  </Form.Item>

                  <Form.Item
                  label="Token Name"
                  name="name"
                  rules={[{ required: true, message: 'Please input priceLT!' }]}
                  >
                    <Input placeholder="token name"/>
                  </Form.Item>
                </>
              )
            }
          }}
      </Form.Item>

      </Form>
    </Modal>
  )
}

Action.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Action
