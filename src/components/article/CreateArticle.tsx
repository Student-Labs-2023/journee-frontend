import { useState, useEffect } from 'react';
import {BlockNoteView, createReactBlockSpec, useBlockNote} from '@blocknote/react'

import styles from './CreateArticle.module.css';
import { defaultBlockSchema, defaultProps } from '@blocknote/core';
import {v4 as uuidv4} from 'uuid'

export function CreateArticle() {
    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem("token") == undefined || localStorage.getItem("user_id") == undefined) {
            alert("Пожалуйста авторизуйтесь")
            window.location.replace("/")
        }
    }, [])

    const [Markdown, setMarkdown] = useState("")
    const [Header, setHeader] = useState("Header")
    const [Description, setDescription] = useState("Description")

    const mapBlock = createReactBlockSpec({
        type: "map",
        propSchema: defaultProps,
        containsInlineContent: false,
        render: ({ block }) => (
          <div className='map'>
                map here
          </div>
        ),
      });
      
    const imgBlock = createReactBlockSpec({
        type: "image",
        propSchema: {...defaultProps, url:{default:"#"}},
        containsInlineContent: false,
        render: ({ block }) => (
          <img src={block.props.url} alt='img'/>
        ),
      });

    const editor = useBlockNote({
        theme:"light",
        onEditorContentChange: (editor: any) => {
            const saveBlocksAsMarkdown = async () => {
              const markdown: string = 
                await editor.blocksToMarkdown(editor.topLevelBlocks);
              setMarkdown(markdown);
            };
            saveBlocksAsMarkdown();
        },
        blockSchema:{...defaultBlockSchema, map:mapBlock, image:imgBlock},
    })

    function HandleSubmit() {
        console.log(Markdown)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

        var formdata = new FormData();
        formdata.append("*", new Blob([Markdown], {"type":"text/plain"}), "/");

        fetch(`http://178.170.192.87/static/articles/${uuidv4()}`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        })
        .then(response => response.json())
        .then(result => {
            console.log(result.Key)
            fetch("http://178.170.192.87/rest/v1/articles", {
                method:"POST",
                body:JSON.stringify({
                    author_id:localStorage.getItem("user_id"),
                    article_url:"http://178.170.192.87/storage/"+result.Key,
                    header:Header,
                    description:Description
                }),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
                }
            })
        })
        .catch(error => console.error(error));
    }

    function FileDrop(e:React.DragEvent) {
        e.preventDefault()

        const file = e.dataTransfer.files[0]

        // eslint-disable-next-line eqeqeq
        if (file == undefined) {return}

        const fr = new FileReader()

        fr.onload = (e) => {
            if (e.target == null) {return}
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    
            var formdata = new FormData();
            formdata.append("*", new Blob([new Uint8Array(e.target.result as any)], {type:file.type}), "/");
    
            fetch(`http://178.170.192.87/static/media/${uuidv4()}`, {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
            }).then(response => response.json())
            .then(result => {
                if (editor == null) {return}
                const currentBlock = editor.getTextCursorPosition().block;
                
                editor.insertBlocks([{
                    type:"image",
                    props:{url:"http://178.170.192.87/storage/"+result.Key}
                }], currentBlock, "after");
            })
        }
        fr.readAsArrayBuffer(file)
    }

    return <div className={styles.main} onDrop={FileDrop}>
            <input type="text" className={styles.Header} value={Header} onChange={e => setHeader(e.target.value)} />
            <input type="text" value={Description} onChange={e => setDescription(e.target.value)} />
            <BlockNoteView editor={editor} />
            <div className={styles.submit}>
                <p>Потоки для публикации</p>
                <button onClick={HandleSubmit}>Отправить</button>
            </div>
    </div>
}