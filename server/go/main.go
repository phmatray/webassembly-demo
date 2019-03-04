package main

import (
	"fmt"
	"syscall/js"
)

func sayHi(value js.Value, args []js.Value) interface{} {
	fmt.Println("Hi!")
	return nil
}

func sayHello(value js.Value, args []js.Value) interface{} {
	callback := args[len(args)-1:][0]
	message := args[0].String()

	callback.Invoke(js.Null(), "Did you say "+message)
	return nil
}

func registerCallbacks() {
	js.Global().Set("sayHi", js.FuncOf(sayHi))
	js.Global().Set("sayHello", js.FuncOf(sayHello))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
}
