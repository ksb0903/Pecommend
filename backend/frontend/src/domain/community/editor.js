import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { authaxios, freeaxios } from "../../custom/customAxios";
import "./editor.css";

const API_URL = "/api/v1/file";
const UPLOAD_ENDPOINT = "upload";

export default function Editor({ handleChange, SetContent, content }) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            authaxios
              .post(`${API_URL}/${UPLOAD_ENDPOINT}`, body)
              .then((res) => {
                resolve({
                  default: `https://pecommend.com/api/v1/file/getimg.do/${res.data}`,
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="form-wrapper">
      <CKEditor
        className="editor"
        config={{
          extraPlugins: [uploadPlugin],
        }}
        data={content}
        editor={ClassicEditor}
        onReady={(editor) => {}}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
        // onChange={(event, editor) => {
        //   handleChange(editor.getData())
        //   console.log(editor.getData())
        // }}
        onChange={(event, editor) => {
          const data2 = editor.getData();
          SetContent(data2);
          console.log(data2);
        }}
      />
    </div>
  );
}
