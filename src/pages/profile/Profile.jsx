import React, { useState } from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Jikoshoukai from "../../components/jikoshoukai/Jikoshoukai";
import { Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";

import 'antd/dist/antd.css';
import { Modal, Form, Input } from 'antd';
import { updateInfo, updateAvatar} from '../../redux/actions/userActions';


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
              message: 'ニックネームが必要です',
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

export default function Profile() {
  const user = useSelector(state => state.user)
  const posts = useSelector((state) => state.data.posts);
  const myPost = posts.filter(post => post.post.userId === user.credentials?.userId)

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values.user);
    updateInfo(values.user);
    setVisible(false);
    setTimeout(function() {
      window.location.reload()
    }, 500);
  };
  
  const handleImage = info => {
    const image = info.target.files[0];
    updateAvatar(image);
    setTimeout(function() {
      window.location.reload()
    }, 2000);
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
