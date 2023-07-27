import { useState, useRef, useEffect } from 'react';
import {BlockNoteView, ReactSlashMenuItem, createReactBlockSpec, defaultReactSlashMenuItems, useBlockNote} from '@blocknote/react'

import styles from './ModalArticle.module.css';
import { Block, BlockNoteEditor, DefaultBlockSchema, PartialBlock, defaultBlockSchema, defaultProps } from '@blocknote/core';

export function ModalArticle({ setModalState }: { setModalState: () => void }) {
    /* Сохранение объекта с модальным окном */
    const modalRef = useRef<HTMLDivElement>(null);

    const [Markdown, setMarkdown] = useState("")

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

    return <div ref={modalRef}>
        <div className={styles.backdrop}></div>

        <div className={styles.modalWindow}>
            <input type="text" />
            <input type="text" />
            <BlockNoteView editor={editor} />
            <div className={styles.submit}>
                <p></p>
                <button>Отправить</button>
            </div>
        </div>
    </div>
}