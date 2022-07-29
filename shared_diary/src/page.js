import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

class EditorComponent extends Component{
    constructor(props){
        super(props);
    }

    modules = {
        toolbar: {
            container: [
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
              [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
              ['image', 'video'],
              ['clean']  
            ],
        }
    }
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background', 'EF_Diary'       
      ]

    render(){
        const { value, onChange } = this.props;
        return(
            <div className="editer">
                <div className="head">
                    <Link className="back_arrow" to="/">
                        <Icon icon="ep:arrow-left-bold"/>
                    </Link>
                </div>
                <div>
                    <ReactQuill 
                        style={{height: "600px"}} 
                        theme="snow" 
                        modules={this.modules} 
                        formats={this.formats} 
                        value={value || ''} 
                        onChange={(content, delta, source, editor) => onChange(editor.getHTML())} />
                </div>
            </div>
        )
    }
}
export default EditorComponent