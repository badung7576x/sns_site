import React, { useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Jikoshoukai from "../../components/jikoshoukai/Jikoshoukai";
import { Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";

import 'antd/dist/antd.css';
import { Upload, Modal, Form, Input, message } from 'antd';
import { updateInfo, updateAvatar} from '../../redux/actions/userActions';
import { CameraAlt } from "@material-ui/icons";


const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        onSubmit={()=>{console.log("ok")}}
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name={['user', 'nickname']}
          label="ニックネーム"
          rules={[
            {
              required: true,
              message: 'Please enter the nickname!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'jiko']} label="自己紹介">
          <Input type="textarea" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function Profile() {
  const user = useSelector(state => state.user)
  const posts = useSelector((state) => state.data.posts);
  const myPost = posts.filter(post => post.post.userId === user.credentials?.userId)

  // this for modal
  const [visible, setVisible] = useState(false);
  // this for fileList
  const [selectedFiles, setSelectedFiles] = useState();

  const onCreate = (values) => {
    console.log("Received values of form: ", values.user);
    updateInfo(values.user);
    setVisible(false);
    setTimeout("location.reload(true);", 500); // trick here cuz dunno how to do it properly
  };
  
  const handleImage = info => {
    // if (info.file.status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);

    //   const image = info.fileList[0];
    //   console.log(info.file);
    //   updateAvatar(image);

    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
    const image = info.target.files[0];
    updateAvatar(image);
    setTimeout("location.reload(true);", 2000); // trick here cuz dunno how to do it properly
  };

  return (
    <div>
      { user.authenticated && (<>
        <Topbar />
        <div className="profile">
          <div style={{flex: 3}}></div>
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src="assets/post/3.jpeg"
                  alt=""
                />
                {/* <Upload
                  name="avatar"
                  beforeUpload={beforeUpload}
                  onChange={handleImage}
                >
                  <img
                    className="profileUserImg"
                    src={user.credentials?.avatar  || 'assets/no_avatar.png'}
                    alt=""
                  />
                </Upload> */}
                
                {/* <label class="file-label">
                  <input class="file-input" type="file" name="resume" onChange={handleImage} />
                  <img
                    className="profileUserImg"
                    src={user.credentials?.avatar  || 'assets/no_avatar.png'}
                    alt=""
                  />
                </label> */}
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <img
                      className="profileUserImg"
                      src={user.credentials?.avatar  || 'assets/no_avatar.png'}
                      alt=""
                    />
                  </label>

                  <input className="file-input" id="file-input" type="file" onChange={handleImage}/>
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">{user.credentials?.nickname}</h4>
                  <Edit onClick={() => {setVisible(true);}}/>
                  <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                      setVisible(false);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="profileRightBottom">
              <Jikoshoukai content={user.credentials?.jiko} />
              <Feed posts={myPost}/>
            </div>
          </div>
          <div style={{flex: 3}}></div>
        </div>
      </>)}
    </div>
  );
}
