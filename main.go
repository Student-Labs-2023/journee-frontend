package main

import (
	"fmt"
	"io"
	"strings"
	"syscall/js"

	// "syscall/js"

	"github.com/gomarkdown/markdown/ast"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"

	"github.com/gomarkdown/markdown"
)

func main() {
	done := make(chan struct{}, 0)
	js.Global().Set("md_to_html", js.FuncOf(render))
	js.Global().Set("init_renderer", js.FuncOf(renderer))
	<-done
}

func myRenderHook(w io.Writer, node ast.Node, entering bool) (ast.WalkStatus, bool) {
	if _, ok := node.(*ast.Paragraph); ok {
		return ast.GoToNext, true
	}
	return ast.GoToNext, false
}
func newCustomizedRender() *html.Renderer {
	opts := html.RendererOptions{
		RenderNodeHook: myRenderHook,
	}
	return html.NewRenderer(opts)
}

func render(this js.Value, args []js.Value) interface{} {
	if len(args) < 1 {
		return "error"
	}
	result := make([]interface{}, len(args))
	for i, arg := range args {
		md := arg.String()
		result[i] = string(markdown.ToHTML([]byte(md), parser.NewWithExtensions(parser.CommonExtensions), newCustomizedRender()))
	}
	return result
}

func renderer(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return "error"
	}
	node := js.Global().Get("document").Call("querySelector", args[0].String())
	node.Set("innerHTML", "<div></div>")
	node.Set("oninput", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		args[0].Get("target").Get("childNodes").Call("forEach", js.FuncOf(
			func(this js.Value, args []js.Value) interface{} {
				target := args[0]
				html := target.Get("innerHTML").String()
				md := strings.ReplaceAll(string(markdown.ToHTML([]byte(html), parser.NewWithExtensions(parser.CommonExtensions), newCustomizedRender())), "&amp;nbsp;", "&nbsp;")
				fmt.Println(html, md, html == md)
				if html != md {
					target.Call("blur")

					target.Set("innerHTML", md)
				}
				return nil
			}))
		return nil
	}))
	return nil
}
