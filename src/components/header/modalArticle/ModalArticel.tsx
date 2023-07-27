import { useState, useRef, useEffect } from 'react';
import {BlockNoteView, ReactSlashMenuItem, createReactBlockSpec, defaultReactSlashMenuItems, useBlockNote} from '@blocknote/react'

import styles from './ModalArticle.module.css';
import { Block, BlockNoteEditor, DefaultBlockSchema, PartialBlock, defaultBlockSchema, defaultProps } from '@blocknote/core';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid'

export function ModalArticle({ setModalState }: { setModalState: () => void }) {
    /* Сохранение объекта с модальным окном */
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localStorage.getItem("token") == undefined || localStorage.getItem("user_id") == undefined) {
            alert("Пожалуйста авторизуйтесь")
            window.location.replace("/")
        }
    }, [])

    const [Markdown, setMarkdown] = useState("")
    const [Header, setHeader] = useState("Header")
    const [Description, setDescription] = useState("Description")

    /* Отслеживание клика вне модального окна и изменение его состояния */
    useEffect(() => {
        const handleClick = (event: any): void => {
            console.log(document.querySelector("div.tippy-box"))
            console.log(document.querySelector("div.tippy-box")?.contains(event.target))
            if (modalRef.current && (!modalRef.current.contains(event.target) && !document.querySelector("div.tippy-box")?.contains(event.target))) {
                setModalState();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

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

    const slashMenuItems = [
        ...defaultReactSlashMenuItems,
        new ReactSlashMenuItem<
            DefaultBlockSchema & { map: typeof mapBlock }
        >(
            "Insert map",
            (editor) => {
                const currentBlock = editor.getTextCursorPosition().block;
                
                editor.insertBlocks([{
                    type:"map",
                    props:{}
                }], currentBlock, "after");
            },
            ["map"],
            "Other",
            <div style={{height:"10px", aspectRatio:"1", backgroundColor:"red"}}/>
        )
    ]

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
        blockSchema:{...defaultBlockSchema, map:mapBlock},
        // slashCommands:slashMenuItems, <- for next sprint
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

    return <div ref={modalRef}>
        <div className={styles.backdrop}></div>

        <div className={styles.modalWindow}>
            <input type="text" value={Header} onChange={e => setHeader(e.target.value)} />
            <input type="text" value={Description} onChange={e => setDescription(e.target.value)} />
            <BlockNoteView editor={editor} />
            <div className={styles.submit}>
                <p></p>
                <button onClick={HandleSubmit}>Отправить</button>
            </div>
        </div>
    </div>
}