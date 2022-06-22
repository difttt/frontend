import { DatePicker, Form, Input, Modal, Select } from 'antd'
import PropTypes from 'prop-types'

const Trigger = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm()

  return (
    <Modal
      title="Create Trigger"
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
        name="TriggerForm"
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={{ triggerType: '' }}
        autoComplete="off"
        style={{ padding: '20px' }}
      >
        <Form.Item
          label="Type"
          name="triggerType"
          rules={[{ required: true, message: 'Please input your triggerType!' }]}
        >
          <Select placeholder="Select a trigger type">
            <Select.Option value="Timer">Timer</Select.Option>
            <Select.Option value="Schedule">Schedule</Select.Option>
            <Select.Option value="PriceGT">PriceGT</Select.Option>
            <Select.Option value="PriceLT">PriceLT</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.triggerType !== currentValues.triggerType}
        >
          {({ getFieldValue }) => {
            const triggerType = getFieldValue('triggerType')
            if (triggerType === 'Timer') {
              return (
                <Form.Item
                  label="Interval"
                  name="interval"
                  rules={[{ required: true, message: 'Please input timer!' }]}
                >
                  <Input placeholder="Interval" addonAfter="S" />
                </Form.Item>
              )
            }
            else if (triggerType === 'Schedule') {
              return (
                <Form.Item
                  label="schedule"
                  name="schedule"
                  rules={[{ required: true, message: 'Please input schedule!' }]}
                >
                  <DatePicker showTime />
                </Form.Item>
              )
            }
            else if (triggerType === 'PriceGT') {
              return (
                <Form.Item
                  label="PriceGT"
                  name="priceGT"
                  rules={[{ required: true, message: 'Please input priceGT!' }]}
                >
                  <Input placeholder="PriceGT" />
                </Form.Item>
              )
            }
            else if (triggerType === 'PriceLT') {
              return (
                <Form.Item
                  label="PriceLT"
                  name="priceLT"
                  rules={[{ required: true, message: 'Please input priceLT!' }]}
                >
                  <Input placeholder="PriceLT" />
                </Form.Item>
              )
            }
          }}
        </Form.Item>
      </Form>
    </Modal>

  )
}

Trigger.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default Trigger
