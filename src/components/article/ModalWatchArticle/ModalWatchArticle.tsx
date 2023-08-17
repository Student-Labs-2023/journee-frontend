import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './ModalWatchArticle.module.css';
import { BlockNoteView, createReactBlockSpec, useBlockNote } from '@blocknote/react';
import { BlockNoteEditor, defaultBlockSchema, defaultProps } from '@blocknote/core';

interface Props {
    current:string|false
    setCurrent:Dispatch<SetStateAction<string | false>>
}

export default function ModalWatchArticle({current, setCurrent}:Props) {
    const Dialog = useRef<any>(null)

    useEffect(() => {
        if (Dialog == undefined) {return;}
        if (!current) {
            (Dialog.current as HTMLDialogElement).close()
            return;
        }
        fetch(current, {
            method:"GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
            }
        }).then(response => response.text())
        .then(article => {
            const blocks = JSON.parse(article).map((block:any) => {
                if (block.type != "image") {return block}
                return fetch(block.props.staticurl, {
                    method:"GET",
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q"
                    }
                }).then(response => response.blob())
                .then(img => {
                    block.props.url = URL.createObjectURL(img)
                    return block
                })
                .catch(console.error)
            })
            Promise.all(blocks).then(blocks => {
                console.log(blocks)
                editor?.insertBlocks(blocks, editor?.getTextCursorPosition().block, "after")
            })
        })
        .catch(console.error);
        (Dialog.current as HTMLDialogElement).showModal()
    }, [current])
    
    const imgBlock = createReactBlockSpec({
        type: "image",
        propSchema: {...defaultProps, url:{default:"#"}, staticurl:{default:"#"}},
        containsInlineContent: false,
        render: ({ block }) => {
            return <img src={block.props.url} {...{staticurl:block.props.staticurl}} alt='img'/>
        },
      });
    
    const editor = useBlockNote({
        editable:false,
        blockSchema:{...defaultBlockSchema, image:imgBlock},
    })

    return (
        <dialog ref={Dialog} onClick={(e) => {
            const dialogDimensions = Dialog.current.getBoundingClientRect();
            if (
              e.clientX < dialogDimensions.left ||
              e.clientX > dialogDimensions.right ||
              e.clientY < dialogDimensions.top ||
              e.clientY > dialogDimensions.bottom
            ) {
              Dialog.current.close();
            }
          }}
       className={styles.main}>
            <div>
                <BlockNoteView editor={editor} />
            </div>
        </dialog>
    );
}
