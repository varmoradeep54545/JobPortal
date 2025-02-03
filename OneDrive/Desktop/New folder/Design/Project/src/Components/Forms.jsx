import { Button, Form, Input, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import axios from "axios";

const Forms = () => {
  const [form] = Form.useForm();

  const onChange = (e) => {
    e.target.checked;
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contactnumber", values.contactNumber);
    formData.append("noticeperiod", values.noticePeriod);
    formData.append("joblocation", values.jobLocation);
    formData.append("currentorganization", values.currentOrganization);
    formData.append("currentCTC", values.currentCTC);
    formData.append("expectedCTC", values.expectedCTC);
    formData.append("experienceYearsandMonths", values.experience);

    const file = values.upload ? values.upload[0]?.originFileObj : null;
    if (file) {
      formData.append("uploadCV", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/form",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      message.success("Form submitted successfully!");
      console.log("Form submitted: ", response.data);
    } catch (error) {
      message.error("Form submission failed!");
      console.error("Error submitting form: ", error);
    }
    document.getElementById("formSubmit").reset();
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please fill all the required fields!");
    console.log("Failed:", errorInfo);
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your email!"));
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
      return Promise.reject(new Error("Invalid email address!"));
    }
    return Promise.resolve();
  };

  const validateContactNumber = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter your contact number!"));
    }
    if (!/^\d{10}$/.test(value)) {
      return Promise.reject(new Error("Contact number must be 10 digits!"));
    }
    return Promise.resolve();
  };


  return (
    <div className="bg-[#f7f9f9] px-4 sm:px-10 md:px-20 flex flex-col p-5 sm:p-10 md:mx-20 lg:mx-40 m-5 sm:m-10 md:m-20 shadow-xl">
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          Application Form
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl py-2 text-[#68cbcb]">
          Software Developer
        </h2>
        <p className="text-[#747171]  text-lg sm:text-xl md:text-2xl">
          Please complete the form below to apply for a position with us.
        </p>
      </div>
      <hr className="my-5 border-zinc-300" />
      <div className="pt-5 px-4 sm:px-10 md:px-20">
        <Form form={form} id="formSubmit" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Name"
                className="placeholder-gray-500"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ validator: validateEmail }]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Email"
                className="placeholder-gray-500"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Form.Item
              name="contactNumber"
              rules={[{ validator: validateContactNumber }]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Contact Number"
                className="placeholder-gray-500"
              />
            </Form.Item>
            <Form.Item
              name="noticePeriod"
              rules={[
                { required: true, message: "Please input your notice period!" },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Notice Period (Month)"
                className="placeholder-gray-500"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Form.Item
              name="jobLocation"
              rules={[
                { required: true, message: "Please input your job location!" },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Job Location"
                className="placeholder-gray-500"
              />
            </Form.Item>
            <Form.Item
              name="currentOrganization"
              rules={[
                {
                  required: true,
                  message: "Please input your current organization!",
                },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Current Organization"
                className="placeholder-gray-500"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Form.Item
              name="currentCTC"
              rules={[
                { required: true, message: "Please input your current CTC!" },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Current CTC (LPA)"
                className="placeholder-gray-500"
              />
            </Form.Item>
            <Form.Item
              name="expectedCTC"
              rules={[
                { required: true, message: "Please input your expected CTC!" },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Expected CTC (LPA)"
                className="placeholder-gray-500"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Form.Item
              name="experience"
              rules={[
                { required: true, message: "Please input your experience!" },
              ]}
              className="flex-1"
            >
              <Input
                size="large"
                placeholder="Experience Years and Months"
                className="placeholder-gray-500"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="upload"
              valuePropName="fileList"
              rules={[{ required: true, message: "Please upload your CV!" }]}
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              className="text-center"
            >
              <Upload>
                <Button
                  className="w-full sm:w-[440px] md:w-[880px] h-[40px] text-[18px] bg-white text-center"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("Should accept terms and conditions")
                        ),
                },
              ]}
            >
              <Checkbox onChange={onChange} className="text-[18px]">
                I have read & agreed to the terms & conditions.*
              </Checkbox>
            </Form.Item>
          </div>
          <Form.Item className="mt-5">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-15 text-[20px] bg-[#4ba39f] text-white hover:bg-[#3cb6b6]"
              size="large"
            
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Forms;
