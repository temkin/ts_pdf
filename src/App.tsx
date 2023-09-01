// import { useState } from 'react'

import { PDFViewer } from '@react-pdf/renderer'
// import './App.css'
import { PDFDocument } from './components/pdf_document'
import { useState } from 'react';
import { PDFContents } from './types';

async function readFileAsDataURL(file: any) {
  let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
  });
  // @ts-ignore
  return atob(result_base64.split('base64,')[1]);
}


function App() {
  const [content, setContent] = useState<PDFContents[]>([]);
  const onchange = async (evt: any) => {
    for (const file of evt.target.files) {
      if (file) {
        const res = await readFileAsDataURL(file)
        const item = {name: file.name, content: res, render: true}
        const exists = content.filter((e) => e.name == item.name)

        if (exists.length == 0){
          setContent((content) => {
            return [...content, item]
          });
        }
      }
    }
  }

  const toggleRender = (item: PDFContents) => {
    const newContent = content.map((itm) => {
      if (itm === item){
        item.render = !item.render;
        return item;
      }
      return itm;
    })
    setContent(newContent);
  }

  const filesList = content.map((e) => {
    return (
      <div className="file-list" key={e.name}>
        <div>
          <input type="checkbox" checked={e.render} onChange={() => toggleRender(e)} />
        </div>
        <div>{e.name}</div>
      </div>
    )
  })
  return (
    <>
      <div className="file-upload">
        <div>
          <strong>Select file(s) that you wish to use for prepare PDF:</strong>
        </div>
        <div>
          <input type="file" multiple onChange={(evt: any) => onchange(evt)} />
        </div>
      </div>
      {content.length > 0 &&
        <div className="preview-pdf">
          <div>
            <PDFViewer>
              <PDFDocument content={content} />
            </PDFViewer>
          </div>
          <div>
            {filesList}
          </div>
        </div>
      }
    </>
  )
}

export default App
