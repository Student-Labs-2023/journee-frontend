import { useState, useEffect } from 'react';
import {BlockNoteView, createReactBlockSpec, useBlockNote} from '@blocknote/react'

import styles from './CreateArticle.module.css';
import { defaultBlockSchema, defaultProps } from '@blocknote/core';
import {v4 as uuidv4} from 'uuid'
import { useNotification } from '../../hooks/useNotification';
import defaultHeaderImg from '../../img/data/article.png'

export function CreateArticle() {
    const showNotification = useNotification()
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
    const [Pic, setPic] = useState("http://localhost:3001/static/media/article.898c0e0cf1fa1e08ea11.png")
    const [PicBlob, setPicBlob] = useState(defaultHeaderImg)

    useEffect(() => {
        if (!Pic.startsWith("http://178.170.192.87/static/")) return;
        fetch(Pic, {
            method:"GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
            }
        }).then(response => response.blob())
        .then(pic => {
            setPicBlob(URL.createObjectURL(pic))
        }).catch(console.error)
    }, [Pic])

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
        propSchema: {...defaultProps, url:{default:"#"}, staticurl:{default:"#"}},
        containsInlineContent: false,
        render: ({ block }) => (
          <img src={block.props.url} {...{staticurl:block.props.staticurl}} alt='img'/>
        ),
      });

    const editor = useBlockNote({
        theme:"light",
        onEditorContentChange: (editor: any) => {
            const saveBlocksAsMarkdown = async () => {
                setMarkdown(JSON.stringify(editor.topLevelBlocks))
            };
            saveBlocksAsMarkdown();
        },
        blockSchema:{...defaultBlockSchema, map:mapBlock, image:imgBlock},
    })

    function HandleSubmit() {
        showNotification("Статья опубликована")
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
                    id:uuidv4(),
                    created_at:new Date().toISOString(),
                    author_id:localStorage.getItem("user_id"),
                    article_url:"http://178.170.192.87/static/"+result.Key,
                    header:Header,
                    description:Description,
                    icon_url:Pic
                }),
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
                }
            }).then(() => {
                window.location.replace("/")
            })
        })
        .catch(error => console.error(error));
    }

    function BucketUrl(file:File, callback:(url:string) => void) {
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
                callback("http://178.170.192.87/static/"+result.Key)
            })
        }
        fr.readAsArrayBuffer(file)
    }

    function FileDrop(e:React.DragEvent) {
        e.preventDefault()

        const file = e.dataTransfer.files[0]

        // eslint-disable-next-line eqeqeq
        if (file == undefined) {return}

        BucketUrl(file, (url) => {
            if (editor == null) {return}
            const currentBlock = editor.getTextCursorPosition().block;

            fetch(url, {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
                }
            }).then(response => response.blob())
            .then(blob => {
                editor.insertBlocks([{
                    type:"image",
                    props:{staticurl:url, url:URL.createObjectURL(blob)}
                }], currentBlock, "after");
            }).catch(console.error)
        })
    }

    function updateImage(e:any) {
        e.preventDefault()
        BucketUrl(e.target.files[0], (url) => {
            setPic(url)
        })
    }

    return <div className={styles.main}>
        <div className={styles.inputs}>
            <input type="text" className={styles.Header} value={Header} onChange={e => setHeader(e.target.value)} />
            <input type="text" className={styles.Description} value={Description} onChange={e => setDescription(e.target.value)} />
            <input type="file" className={styles.FileInput} onChange={updateImage} accept='.png, .jpg, .jpeg' />
            <img src={PicBlob} onClick={() => {(document.querySelector(`.${styles.FileInput}`) as HTMLElement).click()}} className={styles.HeaderImage} alt="Pic" />
        </div>
        <div className={styles.editor} onDrop={FileDrop}>
            <BlockNoteView editor={editor} />
        </div>
        <div className={styles.submit}>
            <p>Потоки для публикации</p>
            <button onClick={HandleSubmit}>Отправить</button>
        </div>
    </div>
}