import React, { useCallback, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import {
  message,
  Upload,
  Modal,
  Typography,
  Form,
  Button,
  Row,
  Col,
  Select,
  Checkbox,
} from "antd";
import { SRS, OBJECT_SELECTION } from "@/constant";
import type { _SRS, _OBJECT_SELECTION } from "@/constant";
import { sdk } from "@/api/axios";
import { JsonToFormDataV2 } from "@/utils/json2formdata";
import "./style.scss";
import structuredClone from "@ungap/structured-clone";

const { Dragger } = Upload;

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  setKeyRender: (value: number) => void;
}

const UploadDialog: React.FC<Props> = ({
  showModal,
  setShowModal,
  setKeyRender,
}) => {
  const { Title } = Typography;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const [form] = Form.useForm();

  const uploadFiles = (e: any) => {
    const { onSuccess, onError, file, onProgress } = e;
    sdk
      .post(
        "uploaded-files",
        JsonToFormDataV2({
          file: file,
        }),
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (event) => {
            onProgress(
              { percent: (event.loaded / (event.total || 1)) * 100 },
              file
            );
          },
        }
      )
      .then(() => {
        setFileList((state) => {
          const index = state.findIndex((x) => x.uid === file.uid);
          if (index >= 0) {
            state[index].status = "done";
          }
          return [...state];
        });
        setKeyRender(Math.random());
        onSuccess(file);
      })
      .catch((error) => {
        setFileList((state) => {
          const index = state.findIndex((x) => x.uid === file.uid);
          if (index >= 0) {
            state[index].status = "error";
            state[index].error = error;
          }
          return [...state];
        });
        onError({ message: error.message });
      });
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    accept: ".dwg,.dxf",
    fileList: fileList,
    beforeUpload: (_uploadFile, _uploadFileList) => {
      setFileList([...fileList, ..._uploadFileList]);
    },
    customRequest: uploadFiles,
    onRemove: (file) => {
      setFileList((state) => {
        const tmpFileList: UploadFile[] = structuredClone(state);
        const idx = tmpFileList.findIndex((item) => item.uid == file.uid);
        tmpFileList.splice(idx, 1);
        return tmpFileList;
      });
    },
  };

  // useEffect(() => {
  //   form.setFieldsValue({
  //     srs: SRS[2].value,
  //     object_selection: OBJECT_SELECTION.map((item) => item.value),
  //   });
  // }, [showModal]);

  const onDiscard = () => {
    setShowModal(false);
    setFileList([]);
  };

  return (
    <Modal
      centered
      forceRender
      open={showModal}
      footer={<></>}
      onCancel={onDiscard}
    >
      <Title style={{ textAlign: "left" }} level={2}>
        Upload File
      </Title>
      <Dragger {...uploadProps} className="upload">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for multiple files upload.</p>
      </Dragger>
      {/* <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item>

            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Coordinate Reference System"
              name="srs"
              rules={[{ required: true, message: "Please select SRS" }]}
            >
              <Select options={SRS} placeholder="Coordinate Reference System" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Object Selection"
              name="object_selection"
              rules={[
                { required: true, message: "Please select Object Selection" },
              ]}
            >
              <Checkbox.Group options={OBJECT_SELECTION} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="mb-0">
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingTop: "1rem",
            }}
          >
            <Button style={{ margin: "4px" }} onClick={() => onDiscard()}>
              Cancel
            </Button>
            <Button
              disabled={!file}
              style={{ margin: "4px" }}
              htmlType="submit"
              type="primary"
            >
              Convert
            </Button>
          </div>
        </Form.Item>
      </Form> */}
    </Modal>
  );
};

export default UploadDialog;
