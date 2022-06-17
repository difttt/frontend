import { Button, Card, Form, Modal, Select } from 'antd'

const Recipe = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Create Recipe"
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
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Trigger"
          name="trigger"
        >
          <Select placeholder="Select a trigger">
            <Select.Option value="Timer">trigger 1</Select.Option>
            <Select.Option value="Schedule">trigger 2</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Action"
          name="action"
        >
          <Select placeholder="Select a action">
            <Select.Option value="Timer">action 1</Select.Option>
            <Select.Option value="Schedule">action 2</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Recipe
